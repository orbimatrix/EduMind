from typing import List, Optional, Tuple
from dataclasses import dataclass, field
import os
import re
import time
import json
import traceback
import tempfile
import shutil
from pathlib import Path

import requests
import numpy as np
import faiss
import PyPDF2

from sentence_transformers import SentenceTransformer

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from starlette.concurrency import run_in_threadpool

# -------------------------
# Config / env checks
# -------------------------
AIML_API_KEY = os.getenv("AIMLAPI")
if not AIML_API_KEY:
    AIML_API_KEY = None

# -------------------------
# RAGIndex implementation
# -------------------------
@dataclass
class RAGIndex:
    embeddings_model_name: str = "all-MiniLM-L6-v2"
    embedder: SentenceTransformer = field(init=False)
    dimension: int = field(init=False)
    index: Optional[faiss.Index] = field(default=None, init=False)
    docs: List[str] = field(default_factory=list, init=False)

    def __post_init__(self):
        print("🔹 Loading embedding model:", self.embeddings_model_name)
        try:
            self.embedder = SentenceTransformer(self.embeddings_model_name)
        except Exception as e:
            raise RuntimeError(f"Failed to load embedding model: {e}")
        self.dimension = self.embedder.get_sentence_embedding_dimension()
        self.index = faiss.IndexFlatIP(self.dimension)

    def add_documents(self, texts: List[str]):
        if not texts:
            return
        embs = self.embedder.encode(texts, convert_to_numpy=True, show_progress_bar=False)
        faiss.normalize_L2(embs)
        self.index.add(embs)
        self.docs.extend(texts)

    def similarity_search(self, query: str, k: int = 5) -> List[Tuple[str, float]]:
        if self.index is None or self.index.ntotal == 0:
            return []
        q_emb = self.embedder.encode([query], convert_to_numpy=True)
        faiss.normalize_L2(q_emb)
        k_search = min(k, int(self.index.ntotal))
        D, I = self.index.search(q_emb, k_search)
        results = []
        for idx, score in zip(I[0], D[0]):
            if idx < len(self.docs):
                results.append((self.docs[idx], float(score)))
        return results

# -------------------------
# Text extraction & chunking
# -------------------------
def extract_text_from_pdf(file_path: str) -> str:
    text = []
    with open(file_path, "rb") as f:
        reader = PyPDF2.PdfReader(f)
        for page in reader.pages:
            try:
                page_text = page.extract_text() or ""
            except Exception:
                page_text = ""
            if page_text:
                text.append(page_text)
    return "\n".join(text)

def split_text_to_chunks(text: str, chunk_size: int = 800, overlap: int = 100) -> List[str]:
    text = re.sub(r"\n{2,}", "\n\n", text)
    paragraphs = text.split("\n\n")
    chunks, current = [], ""
    for p in paragraphs:
        if len(current) + len(p) + 1 <= chunk_size:
            current = (current + "\n\n" + p).strip()
        else:
            if current:
                chunks.append(current)
            if len(p) > chunk_size:
                for i in range(0, len(p), chunk_size - overlap):
                    chunks.append(p[i:i + chunk_size].strip())
                current = ""
            else:
                current = p
    if current:
        chunks.append(current)
    return chunks

# -------------------------
# AIMLAPI call helpers
# -------------------------
def _safe_parse_response(j: dict) -> Optional[str]:
    try:
        return j["choices"][0]["message"]["content"].strip()
    except Exception:
        pass
    try:
        return j["choices"][0]["text"].strip()
    except Exception:
        pass
    try:
        if "output" in j and isinstance(j["output"], str):
            return j["output"].strip()
    except Exception:
        pass
    return None

def call_llm(prompt: str, max_tokens: int = 512, temperature: float = 0.4,
             model: str = "gpt-4o", max_retries: int = 3) -> str:
    api_key = os.getenv("AIMLAPI")
    if not api_key:
        return "[Error] AIMLAPI key missing. Set environment variable AIMLAPI."

    url = "https://api.aimlapi.com/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }

    if len(prompt) > 60_000:
        prompt = prompt[-60_000:]
        print("[Warning] Prompt too long: truncated to last 60k chars")

    body = {
        "model": model,
        "messages": [
            {"role": "system", "content": "You are a helpful tutor assistant."},
            {"role": "user", "content": prompt},
        ],
        "max_tokens": max_tokens,
        "temperature": temperature,
    }

    for attempt in range(1, max_retries + 1):
        try:
            resp = requests.post(url, headers=headers, json=body, timeout=30)
        except Exception as e:
            if attempt < max_retries:
                time.sleep(2 ** attempt)
                continue
            return f"[Network error] {e}"

        if resp.status_code != 200:
            text_snip = resp.text[:1000]
            print(f"[AIMLAPI] status={resp.status_code} attempt={attempt}")
            print("Response snippet:", text_snip)
            if resp.status_code == 401:
                return "[AIMLAPI error 401] Unauthorized — check your API key."
            if resp.status_code == 429:
                return "[AIMLAPI error 429] Rate limited — try again later."
            if resp.status_code == 413:
                return "[AIMLAPI error 413] Request too large — reduce context size."
            if attempt < max_retries:
                time.sleep(2 ** attempt)
                continue
            return f"[AIMLAPI error {resp.status_code}] {text_snip}"

        try:
            j = resp.json()
        except Exception as e:
            return f"[AIMLAPI parse error] Failed to parse JSON: {e} — text: {resp.text[:1000]}"

        parsed = _safe_parse_response(j)
        if parsed:
            return parsed

        return f"[AIMLAPI unknown response format] {json.dumps(j)[:2000]}"

    return "[AIMLAPI] failed after retries"

# -------------------------
# RAG workflows
# -------------------------
def build_index_from_file_path(file_path: str, rag: RAGIndex):
    ext = file_path.split(".")[-1].lower()
    if ext == "pdf":
        text = extract_text_from_pdf(file_path)
    elif ext == "txt":
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            text = f.read()
    else:
        raise ValueError(f"Unsupported file type: {ext}")
    chunks = split_text_to_chunks(text)
    rag.add_documents(chunks)
    return len(chunks)

def retrieve_context(rag: RAGIndex, query: str, k: int = 5) -> str:
    hits = rag.similarity_search(query, k=k)
    if not hits:
        return ""
    context = "\n\n---\n\n".join([f"{doc}" for doc, _ in hits])
    return context

def _trim_context(ctx: str, max_chars: int = 12000) -> str:
    if not ctx:
        return ""
    if len(ctx) <= max_chars:
        return ctx
    return ctx[:max_chars] + "\n\n[TRUNCATED]"

def generate_study_plan(rag: RAGIndex, chapters: str, time_available_hours: Optional[int]) -> str:
    if rag.index is None or rag.index.ntotal == 0:
        return "⚠️ No indexed book found. Please upload and ingest a PDF/TXT first."
    ctx = retrieve_context(rag, chapters or "summary", k=6)
    ctx = _trim_context(ctx, max_chars=12000)
    prompt = f"""
You are a smart AI study planner. Use the given book context to make a study plan.
CONTEXT:
{ctx}
TASK:
Create a detailed study plan for chapters/topics: {chapters}.
If time available is {time_available_hours} hours, break study into daily goals.
Format neatly with bullet points and time allocations.
"""
    return call_llm(prompt, max_tokens=700)

def generate_quiz(rag: RAGIndex, scope: str, num_questions: int, difficulty: str) -> str:
    """
    Request the LLM to return a strict JSON object with this structure:
    {
      "topic": "<scope>",
      "quizQuestions": [
        {
          "question": "...",
          "options": ["A", "B", "C", "D"],
          "correctAnswer": "<one of options>",
          "explanation": "..."
        },
        ...
      ]
    }
    This function returns the raw LLM output (string). The API endpoint will attempt to parse JSON.
    """
    if rag.index is None or rag.index.ntotal == 0:
        return "⚠️ No indexed book found. Please upload and ingest a PDF/TXT first."

    ctx = retrieve_context(rag, scope, k=6)
    ctx = _trim_context(ctx, max_chars=10000)

    # Strong instruction to produce valid JSON only.
    prompt = f"""
You are a professional quiz creator. Based on the following context, produce exactly one JSON object (no other text)
using this schema:

{{
  "topic": "<short topic/title>",
  "quizQuestions": [
    {{
      "question": "<question text>",
      "options": ["option A","option B","option C","option D"],
      "correctAnswer": "<exact text of the correct option from the options array>",
      "explanation": "<brief explanation (optional)>"
    }},
    ...
  ]
}}

Make {num_questions} multiple-choice questions.
Each question should have 4 options.
Difficulty level: {difficulty}.
CONTEXT:
{ctx}

IMPORTANT: Output MUST be valid JSON only. Do not add any commentary or explanation outside the JSON.
"""
    return call_llm(prompt, max_tokens=1200)

def answer_question(rag: RAGIndex, question: str) -> str:
    if rag.index is None or rag.index.ntotal == 0:
        return "⚠️ No indexed book found. Please upload and ingest a PDF/TXT first."
    ctx = retrieve_context(rag, question, k=5)
    ctx = _trim_context(ctx, max_chars=8000)
    prompt = f"""
You are a helpful AI tutor.
BOOK CONTEXT:
{ctx}
QUESTION:
{question}
Answer in a concise, educational way.
"""
    return call_llm(prompt, max_tokens=400)

def extract_key_topics(rag: RAGIndex, topk: int) -> str:
    if rag.index is None or rag.index.ntotal == 0:
        return "⚠️ No indexed book found. Please upload and ingest a PDF/TXT first."
    sample = "\n\n".join(rag.docs[:min(len(rag.docs), 30)])
    sample = _trim_context(sample, max_chars=12000)
    prompt = f"""
From the following book excerpts, extract the top {topk} most important topics or subtopics:
{sample}
"""
    return call_llm(prompt, max_tokens=500)

# -------------------------
# FastAPI app & models
# -------------------------
app = FastAPI(title="RAG Book Assistant (AIMLAPI)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

GLOBAL_RAG: Optional[RAGIndex] = None

class StudyPlanRequest(BaseModel):
    chapters: Optional[str] = "summary"
    hours: Optional[int] = None

class QuizRequest(BaseModel):
    scope: Optional[str] = "whole book"
    num_questions: int
    difficulty: str

class AnswerRequest(BaseModel):
    question: str

class TopicsRequest(BaseModel):
    topk: int = 10

@app.on_event("startup")
def startup_event():
    global GLOBAL_RAG
    try:
        GLOBAL_RAG = RAGIndex()
    except Exception as e:
        print("Failed to init GLOBAL_RAG:", e)

@app.post("/ingest")
async def ingest(file: UploadFile = File(...)):
    if GLOBAL_RAG is None:
        raise HTTPException(status_code=500, detail="RAG index is not initialized.")

    suffix = Path(file.filename).suffix.lower()
    if suffix not in [".pdf", ".txt"]:
        raise HTTPException(status_code=400, detail="Unsupported file type. Use PDF or TXT.")

    tmp_dir = tempfile.mkdtemp()
    tmp_path = Path(tmp_dir) / file.filename
    try:
        with tmp_path.open("wb") as f:
            content = await file.read()
            f.write(content)

        def _ingest_sync():
            return build_index_from_file_path(str(tmp_path), GLOBAL_RAG)

        n_chunks = await run_in_threadpool(_ingest_sync)
        return JSONResponse({
            "status": "ok",
            "message": f"File ingested with {n_chunks} chunks.",
            "index_size": int(GLOBAL_RAG.index.ntotal),
            "docs_count": len(GLOBAL_RAG.docs),
        })
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Error ingesting file: {e}")
    finally:
        try:
            shutil.rmtree(tmp_dir)
        except Exception:
            pass

@app.get("/status")
def status():
    if GLOBAL_RAG is None:
        return {"initialized": False}
    return {
        "initialized": True,
        "index_size": int(GLOBAL_RAG.index.ntotal) if GLOBAL_RAG.index is not None else 0,
        "docs_count": len(GLOBAL_RAG.docs)
    }

@app.post("/study-plan")
async def create_study_plan(req: StudyPlanRequest):
    if GLOBAL_RAG is None:
        raise HTTPException(status_code=500, detail="RAG index is not initialized.")
    try:
        def _sync():
            return generate_study_plan(GLOBAL_RAG, req.chapters or "summary", req.hours)
        result = await run_in_threadpool(_sync)
        return {"result": result}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/quiz")
async def create_quiz(req: QuizRequest):
    if GLOBAL_RAG is None:
        raise HTTPException(status_code=500, detail="RAG index is not initialized.")
    try:
        def _sync():
            return generate_quiz(GLOBAL_RAG, req.scope or "whole book", int(req.num_questions), req.difficulty)
        raw = await run_in_threadpool(_sync)

        # Try to parse the LLM output as JSON. If parse succeeds and is an object,
        # return it as structured JSON. Otherwise, return the raw string under "result".
        parsed = None
        if isinstance(raw, str):
            raw_strip = raw.strip()
            try:
                parsed_json = json.loads(raw_strip)
                if isinstance(parsed_json, dict):
                    return {"result": parsed_json}
            except Exception:
                # sometimes the response may include backticks or ```json markers — try to extract JSON block
                m = re.search(r'(\{[\s\S]*\})', raw_strip)
                if m:
                    try:
                        parsed_json = json.loads(m.group(1))
                        if isinstance(parsed_json, dict):
                            return {"result": parsed_json}
                    except Exception:
                        pass

        # fallback: return raw string
        return {"result": raw}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/answer")
async def ask_question(req: AnswerRequest):
    if GLOBAL_RAG is None:
        raise HTTPException(status_code=500, detail="RAG index is not initialized.")
    try:
        def _sync():
            return answer_question(GLOBAL_RAG, req.question)
        result = await run_in_threadpool(_sync)
        return {"result": result}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/topics")
async def topics(req: TopicsRequest):
    if GLOBAL_RAG is None:
        raise HTTPException(status_code=500, detail="RAG index is not initialized.")
    try:
        def _sync():
            return extract_key_topics(GLOBAL_RAG, int(req.topk))
        result = await run_in_threadpool(_sync)
        return {"result": result}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

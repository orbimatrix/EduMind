# RAG Book Assistant — FastAPI Backend

A FastAPI backend that builds a RAG (Retrieval-Augmented Generation) index from uploaded books (PDF/TXT) and exposes endpoints to:

* ingest a book into a FAISS index (`/ingest`)
* generate a study plan from indexed content (`/study-plan`)
* generate a structured quiz from indexed content (`/quiz`)
* answer a question from the book (`/answer`)
* extract top topics (`/topics`)
* check index status (`/status`)

The backend calls an LLM via the `AIMLAPI` service (or another provider you configure) and uses `sentence-transformers` for embeddings + `faiss` for similarity search.

---

## Table of contents

* [Quick start (run locally)](#quick-start-run-locally)
* [Requirements](#requirements)
* [Environment variables](#environment-variables)
* [Install & run (detailed)](#install--run-detailed)
* [Docker (optional)](#docker-optional)
* [API endpoints & examples](#api-endpoints--examples)
* [Quiz JSON schema (expected LLM output)](#quiz-json-schema-expected-llm-output)
* [Notes & troubleshooting](#notes--troubleshooting)
* [Tips & next steps](#tips--next-steps)
* [License](#license)

---

# Quick start (run locally)

1. Clone this repository (or drop the provided FastAPI file in a folder).
2. Create a Python virtual environment and install dependencies.
3. Set the `AIMLAPI` environment variable (your LLM API key).
4. Run the app:

```bash
# from project root
python -m venv .venv
source .venv/bin/activate        # macOS / Linux
# .venv\Scripts\activate         # Windows (PowerShell)
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Visit: `http://localhost:8000/docs` for interactive Swagger UI.

---

# Requirements

* Python 3.9+ (3.10/3.11 recommended)
* Recommended RAM: 4GB+ (embedding model downloads may require more)
* Dependencies (example list — see `requirements.txt` below):

  * fastapi
  * uvicorn
  * requests
  * sentence-transformers
  * faiss-cpu (or faiss-gpu if you have CUDA & want GPU)
  * PyPDF2
  * python-multipart (for file uploads)
  * pydantic
  * starlette

`requirements.txt` (example)

```
fastapi>=0.95
uvicorn[standard]>=0.20
requests>=2.28
sentence-transformers>=2.2
faiss-cpu>=1.7.4
PyPDF2>=3.0
python-multipart>=0.0.6
pydantic>=1.10
```

> If you want GPU `faiss`, install the appropriate `faiss-gpu` build for your environment.

---

# Environment variables

Create a `.env` (or export in your shell). At minimum set:

```env
# required for LLM calls
AIMLAPI=sk-xxxxx-your-api-key-or-token

# optional, default used by frontend
API_HOST=0.0.0.0
API_PORT=8000
```

Important: The backend will still start if `AIMLAPI` is missing, but endpoints that call the LLM will return an error string telling you the key is missing.

---

# Install & run (detailed)

1. Clone or copy code into a directory.

2. Create virtual env and install deps:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

3. Export env vars:

```bash
export AIMLAPI="sk-xxx"
export API_HOST="0.0.0.0"
export API_PORT="8000"
```

4. Run:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

* The first time you start, `sentence-transformers` will download the model `all-MiniLM-L6-v2` (unless you change it). That may take time and disk space.

---

# Docker (optional)

Example `Dockerfile`:

```dockerfile
FROM python:3.11-slim

# system deps for faiss & building (if needed)
RUN apt-get update && apt-get install -y build-essential git curl libsndfile1 && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . /app

RUN python -m pip install --upgrade pip
RUN pip install -r requirements.txt

ENV PYTHONUNBUFFERED=1

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Example `docker-compose.yml`:

```yaml
version: "3.8"
services:
  rag-backend:
    build: .
    environment:
      - AIMLAPI=${AIMLAPI}
    ports:
      - "8000:8000"
    volumes:
      - ./data:/app/data
```

Run:

```bash
docker compose up --build
```

---

# API endpoints & examples

Interactive docs: `GET /docs` (Swagger UI) and `GET /redoc`.

Base URL: `http://localhost:8000` (or your host/port)

---

## 1) `POST /ingest` — upload PDF or TXT

Saves uploaded file to temp, extracts text, chunks, computes embeddings and adds to FAISS index.

curl example:

```bash
curl -X POST "http://localhost:8000/ingest" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@/path/to/book.pdf"
```

Successful response:

```json
{
  "status": "ok",
  "message": "File ingested with 42 chunks.",
  "index_size": 42,
  "docs_count": 42
}
```

---

## 2) `GET /status` — index status

```bash
curl http://localhost:8000/status
```

Example response:

```json
{
  "initialized": true,
  "index_size": 42,
  "docs_count": 42
}
```

---

## 3) `POST /study-plan` — generate a study plan using RAG context

Request body (JSON):

```json
{
  "chapters": "chapter 1: forces and motion",   // or paste text excerpt
  "hours": 10
}
```

Example curl:

```bash
curl -X POST "http://localhost:8000/study-plan" \
  -H "Content-Type: application/json" \
  -d '{"chapters":"Electrostatics chapter summary","hours":8}'
```

Response:

```json
{
  "result": "Day 1 — Read pages 1-10 ...\nDay 2 — Solve problems ...\n"
}
```

> The `result` is a string produced by the LLM. Display it with preformatted/whitespace-preserving UI (e.g., `whitespace-pre-wrap`).

---

## 4) `POST /quiz` — generate structured quiz (the frontend expects JSON)

Request body (JSON):

```json
{
  "scope": "chapter 5: thermodynamics",
  "num_questions": 5,
  "difficulty": "medium"
}
```

Example curl:

```bash
curl -X POST "http://localhost:8000/quiz" \
  -H "Content-Type: application/json" \
  -d '{"scope":"work and energy","num_questions":5,"difficulty":"medium"}'
```

Response (successful structured JSON returned inside `result`):

```json
{
  "result": {
    "topic": "Work and Energy",
    "quizQuestions": [
      {
        "question": "What is the work done by a constant force?",
        "options": ["A", "B", "C", "D"],
        "correctAnswer": "A",
        "explanation": "Work equals force times displacement in direction of force."
      }
    ]
  }
}
```

If LLM returns plain text, the endpoint attempts to extract JSON. If parsing fails, it falls back to:

```json
{ "result": "LLM returned plain text here..." }
```

Your frontend should handle both cases (preferred: structured JSON).

---

## 5) `POST /answer` — answer a single question using RAG context

Request:

```json
{ "question": "Explain what kinetic energy is." }
```

Example curl:

```bash
curl -X POST "http://localhost:8000/answer" \
  -H "Content-Type: application/json" \
  -d '{"question":"What causes resistance in electrical circuits?"}'
```

Response:

```json
{ "result": "Resistance is caused by collisions of electrons with lattice atoms ..." }
```

---

## 6) `POST /topics` — extract key topics

Request:

```json
{ "topk": 10 }
```

Response:

```json
{ "result": "1. Work and energy\n2. Conservation laws\n..." }
```

---

# Quiz JSON schema (expected LLM output)

The backend asks the LLM to return a strict JSON object with this shape:

```json
{
  "topic": "short topic/title",
  "quizQuestions": [
    {
      "question": "Question text",
      "options": ["option A", "option B", "option C", "option D"],
      "correctAnswer": "the exact text of the correct option",
      "explanation": "short explanation (optional)"
    }
    // ...
  ]
}
```

* `quizQuestions` must be an array of length `num_questions`.
* Each question must have exactly 4 options.
* `correctAnswer` must match exactly one of the strings inside `options`.

The endpoint will try to parse JSON from the LLM response — if parsing fails it will try to extract the first JSON-like block, otherwise it returns raw text and your frontend should handle that fallback.

---

# Notes & troubleshooting

**Model download time**

* `sentence-transformers` will download model files the first run (e.g. `all-MiniLM-L6-v2`). Allow several seconds to a minute depending on bandwidth.

**FAISS installation**

* On Linux, `pip install faiss-cpu` usually works.
* For GPU usage, install the appropriate CUDA-enabled `faiss-gpu` package matching your CUDA runtime. If you see errors, try `pip install faiss-cpu` or consult FAISS docs.

**AIMLAPI missing**

* If `AIMLAPI` env var is not set, `call_llm` returns an error string. Set `AIMLAPI` correctly to allow calls to the LLM.

**Large PDF / memory**

* For very large PDFs, chunking parameters (`chunk_size`, `overlap`) help. Indexing many files will increase memory/disk use.

**LLM output not valid JSON**

* LLMs sometimes emit commentary or code fences. The `/quiz` endpoint attempts to extract JSON blocks; if that fails, it returns raw text. Consider adding a local "parsing fallback" script to transform classic MCQ plain text into JSON.

**Permission / CORS**

* CORS is set to allow all origins by default (`allow_origins=["*"]`). Change for production.

**Errors during startup**

* If `RAGIndex()` fails (model fails to download or load), the app starts but endpoints using the RAG index will return a 500 error. Check server logs for exceptions (model download path, network issues).

**Logging**

* Look at console logs from `uvicorn` to trace errors. Add more logging around long-running tasks if needed.

---

# Tips & next steps

* Add an optional file-upload + ingest step in your frontend: upload a book and then call `/study-plan` or `/quiz`.
* Add caching of embeddings or persist FAISS index to disk (faiss supports saving/loading index) for faster restarts.
* Add tests for the JSON-parsing fallback to ensure the frontend receives consistent data.
* Consider adding batch endpoints if you want to generate multiple quizzes/study-plans in one call.

---

# Contributing

Contributions welcome. Open an issue with reproducible details if you find bugs or want features (e.g., persisted index, alternative embedding models, offline LLMs).

---

# License

MIT — feel free to reuse & adapt. Include attribution if you incorporate large parts into another project.

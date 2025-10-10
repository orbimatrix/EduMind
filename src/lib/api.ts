// src/lib/api.ts
const BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

async function handleJSONResponse(res: Response) {
  const text = await res.text();
  try {
    const json = JSON.parse(text);
    if (!res.ok) throw new Error(json.detail || json.message || text);
    return json;
  } catch (err) {
    if (!res.ok) throw new Error(text || res.statusText);
    // if not json but ok:
    return text;
  }
}

export async function ingestFile(file: File) {
  const url = `${BASE}/ingest`;
  const form = new FormData();
  form.append("file", file, file.name);
  const res = await fetch(url, { method: "POST", body: form });
  return handleJSONResponse(res);
}

export async function createStudyPlan(chapters?: string, hours?: number) {
  const url = `${BASE}/study-plan`;
  const body = JSON.stringify({ chapters, hours });
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
  return handleJSONResponse(res);
}

export async function createQuiz(scope?: string, num_questions = 5, difficulty = "medium") {
  const url = `${BASE}/quiz`;
  const body = JSON.stringify({ scope, num_questions, difficulty });
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
  return handleJSONResponse(res);
}

export async function answerQuestion(question: string) {
  const url = `${BASE}/answer`;
  const body = JSON.stringify({ question });
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
  return handleJSONResponse(res);
}

export async function extractTopics(topk = 10) {
  const url = `${BASE}/topics`;
  const body = JSON.stringify({ topk });
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
  return handleJSONResponse(res);
}

export async function getStatus() {
  const url = `${BASE}/status`;
  const res = await fetch(url);
  return handleJSONResponse(res);
}

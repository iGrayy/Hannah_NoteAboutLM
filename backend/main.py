from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import os

try:
    # Load .env if present (non-fatal if missing)
    from dotenv import load_dotenv

    load_dotenv()
except Exception:
    # dotenv is optional during mock-only development
    pass

app = FastAPI(title="Hannah NotebookLM Demo API", version="0.1.0")

# Allow local dev from frontend (Vite default ports)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class MindmapResponse(BaseModel):
    nodes: List[dict]
    edges: List[dict]


class ReportResponse(BaseModel):
    title: str
    sections: List[dict]
    export: Optional[dict] = None


class FlashcardsResponse(BaseModel):
    deck: str
    cards: List[dict]


class QuizResponse(BaseModel):
    topic: str
    questions: List[dict]


# Vertex AI initialization (optional if library not installed)
vertex_initialized = False
gemini_model = None

try:
    import vertexai
    from vertexai.generative_models import GenerativeModel

    project_id = os.getenv("GOOGLE_CLOUD_PROJECT", "").strip()
    location = os.getenv("GOOGLE_CLOUD_LOCATION", "us-central1").strip() or "us-central1"
    if project_id:
        vertexai.init(project=project_id, location=location)
        gemini_model = GenerativeModel("gemini-1.5-flash")
        vertex_initialized = True
except Exception:
    vertex_initialized = False


def _read_text_from_upload(upload: UploadFile) -> str:
    content = upload.file.read()
    upload.file.seek(0)
    filename = (upload.filename or "").lower()
    if filename.endswith(".pdf"):
        try:
            from PyPDF2 import PdfReader

            from io import BytesIO

            reader = PdfReader(BytesIO(content))
            pages_text: List[str] = []
            for page in reader.pages:
                pages_text.append(page.extract_text() or "")
            return "\n\n".join(pages_text).strip() or ""
        except Exception:
            return ""
    try:
        return content.decode("utf-8", errors="ignore")
    except Exception:
        return ""


def _gemini_generate_text(prompt: str) -> str:
    if not vertex_initialized or gemini_model is None:
        return "Vertex AI chưa được khởi tạo."
    try:
        resp = gemini_model.generate_content([
            {"role": "user", "parts": [prompt]}
        ])
        return (getattr(resp, "text", None) or "").strip() or "(Không có nội dung)"
    except Exception as e:
        return f"Lỗi Vertex AI: {e}"


def _gemini_generate_mindmap(text: str) -> MindmapResponse:
    if not text.strip():
        return MindmapResponse(nodes=[{"id": "root", "label": "Tài liệu rỗng"}], edges=[])

    instruction = (
        "Hãy trích xuất sơ đồ tư duy JSON tối giản từ văn bản. "
        "Trả về đúng JSON với các trường: nodes (mảng các {id, label}), "
        "edges (mảng các {from, to, label}). Không thêm giải thích."
    )
    user = f"Văn bản nguồn:\n{text[:4000]}\n\nYêu cầu: {instruction}"
    output = _gemini_generate_text(user)
    # Try to parse JSON; fallback to minimal structure
    import json

    try:
        data = json.loads(output)
        nodes = data.get("nodes") or []
        edges = data.get("edges") or []
        if not nodes:
            nodes = [{"id": "root", "label": "Chủ đề"}]
        return MindmapResponse(nodes=nodes, edges=edges)
    except Exception:
        return MindmapResponse(
            nodes=[{"id": "root", "label": "Chủ đề"}],
            edges=[],
        )

def _detect_auth_mode() -> dict:
    """Detect which authentication configuration is active.

    Priority:
    - If GOOGLE_APPLICATION_CREDENTIALS points to an existing JSON file → service_account
    - Else if GOOGLE_API_KEY is set → api_key
    - Else → none
    """
    sa_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS", "").strip()
    api_key = os.getenv("GOOGLE_API_KEY", "").strip()
    project = os.getenv("GOOGLE_CLOUD_PROJECT", "").strip()
    location = os.getenv("GOOGLE_CLOUD_LOCATION", "").strip()

    mode = "none"
    details: dict = {}

    if sa_path:
        details["serviceAccountPath"] = sa_path
        if os.path.isfile(sa_path):
            mode = "service_account"
            details["serviceAccountExists"] = True
        else:
            # Path configured but file missing
            mode = "service_account_configured_but_missing_file"
            details["serviceAccountExists"] = False
    elif api_key:
        mode = "api_key"
        details["apiKeyConfigured"] = True

    if project:
        details["projectId"] = project
    if location:
        details["location"] = location

    return {"mode": mode, "details": details}


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/auth/mode")
def auth_mode():
    """Report which authentication method is currently configured.

    This helps the frontend or developers verify whether Service Account JSON
    or Vertex AI API key-based auth is being used during development.
    """
    return _detect_auth_mode()


@app.post("/api/audio")
async def audio_overview(file: UploadFile = File(...)):
    # In a real impl: send bytes to Speech-to-Text → summarize via Vertex → optional TTS
    filename = file.filename
    return {
        "file": filename,
        "transcript": "Xin chào, đây là bản ghi âm mẫu...",
        "summary": "Bản ghi âm nói về chủ đề A, các điểm chính là 1) ... 2) ...",
        "waveform": [0.1, 0.6, 0.2, 0.8, 0.3],
    }


@app.post("/api/video")
async def video_overview(file: UploadFile = File(...)):
    # In a real impl: Video Intelligence for labels/scenes/transcript → Vertex summarize
    filename = file.filename
    return {
        "file": filename,
        "labels": ["Lecture", "Whiteboard", "Presenter"],
        "scenes": [
            {"start": 0.0, "end": 12.3, "description": "Giới thiệu chủ đề"},
            {"start": 12.3, "end": 42.0, "description": "Nội dung chính phần 1"},
        ],
        "transcript": "Trong video này, chúng ta sẽ...",
        "summary": "Video trình bày tổng quan chủ đề X, gồm các ý chính ...",
    }


@app.post("/api/mindmap", response_model=MindmapResponse)
async def mindmap(file: UploadFile = File(...)):
    # Extract text and request Gemini to build mindmap JSON
    text = _read_text_from_upload(file)
    if not text:
        return MindmapResponse(nodes=[{"id": "root", "label": "Không đọc được nội dung"}], edges=[])
    return _gemini_generate_mindmap(text)


@app.post("/api/report", response_model=ReportResponse)
async def report(file: UploadFile = File(...)):
    # Extract text from upload and summarize via Gemini
    text = _read_text_from_upload(file)
    if not text:
        text = "Tạo báo cáo tóm tắt cho tài liệu này."
    prompt = (
        "Tóm tắt nội dung tài liệu gọn, rõ theo 3 phần: 1) Tóm tắt điều hành, "
        "2) Các điểm chính, 3) Khuyến nghị. Trả về văn bản ngắn gọn.\n\n" + text[:6000]
    )
    summary = _gemini_generate_text(prompt)
    return ReportResponse(
        title="Báo cáo tự động",
        sections=[
            {"heading": "Tóm tắt", "content": summary},
        ],
        export=None,
    )


@app.post("/api/flashcards", response_model=FlashcardsResponse)
async def flashcards(file: UploadFile = File(...), deck: str = Form("Chủ đề X")):
    # In a real impl: Vertex generate Q&A → save Firestore
    _ = file.filename
    return FlashcardsResponse(
        deck=deck,
        cards=[
            {"q": "Khái niệm X là gì?", "a": "X là ..."},
            {"q": "Ứng dụng của X?", "a": "..."},
        ],
    )


@app.post("/api/quiz", response_model=QuizResponse)
async def quiz(file: UploadFile = File(...), topic: str = Form("Chủ đề X")):
    # In a real impl: Vertex generate MCQs → save Firestore
    _ = file.filename
    return QuizResponse(
        topic=topic,
        questions=[
            {"q": "X là gì?", "options": ["A", "B", "C", "D"], "answerIndex": 1},
            {"q": "Ứng dụng của X là?", "options": ["E", "F", "G", "H"], "answerIndex": 0},
        ],
    )


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)



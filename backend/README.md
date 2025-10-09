# Hannah NotebookLM Demo API (FastAPI)

## Run locally

1. Create venv and install deps

```bash
python -m venv .venv
. .venv/Scripts/activate  # Windows PowerShell: . .venv/Scripts/Activate.ps1
pip install -r requirements.txt
```

2. Start API

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

3. Test health

```bash
curl http://localhost:8000/health
```

## Endpoints
- POST /api/audio (multipart file)
- POST /api/video (multipart file)
- POST /api/mindmap (multipart file) — now calls Vertex AI to build JSON mindmap
- POST /api/report (multipart file) — now summarizes content with Vertex AI
- POST /api/flashcards (multipart file, form field: deck)
- POST /api/quiz (multipart file, form field: topic)

All endpoints return mock demo JSON for now; integrate Google Cloud clients later.

## CORS
CORS is open for local dev; lock down in production.

## Google Cloud (later)
When enabling real Google Cloud calls, authenticate in one of two ways:

1) Service Account (recommended for Vertex AI, Speech, Video Intelligence, NL, Vision, Firestore, Storage)

```
# PowerShell (Windows)
setx GOOGLE_APPLICATION_CREDENTIALS "D:\Hannah_NoteAboutLM\gcp\service-account.json"
setx GOOGLE_CLOUD_PROJECT "your-project-id"
setx GOOGLE_CLOUD_LOCATION "us-central1"
```

- Ensure the JSON path exists. SDKs will use this automatically.

2) Vertex AI API Key (only if calling Gemini API directly via REST)

```
# PowerShell
setx GOOGLE_API_KEY "YOUR_API_KEY_VALUE"
```

You can verify which mode is active:

```
curl http://localhost:8000/auth/mode
```

Response includes `mode`: `service_account`, `api_key`, or `none`.

## Notes
- Install extra deps if not installed yet:
  ```bash
  pip install -r requirements.txt
  ```
- Restart the server after setting env vars or editing `.env`.


@echo off
cd server
.\.venv\bin\activate
py -m uvicorn server:app --reload --host 127.0.0.1 --port 8000

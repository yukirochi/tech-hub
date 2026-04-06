from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer
from pydantic import BaseModel  
import pandas as pd
import nlpaug.augmenter.word as naw
import requests
import shutil
import os
import language_tool_python
import hashlib
import nltk
import sqlite3
import pandas as pd
from routes import remove_bg, summarizer, paraphrase, grammar_fix, image_to_text, qr_generator, pdf_converter, plagiarism_check, essay_outline, feedback
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from slowapi import _rate_limit_exceeded_handler
import logging

nltk.download('punkt_tab')
nltk.download('averaged_perceptron_tagger_eng')
nltk.download('wordnet')
nltk.download('omw-1.4')

class HealthCheckFilter(logging.Filter):
    def filter(self, record: logging.LogRecord) -> bool:
        return record.getMessage().find("GET /health") == -1

logging.getLogger("uvicorn.access").addFilter(HealthCheckFilter())

app = FastAPI()

limiter = Limiter(key_func=get_remote_address, default_limits=["2/minute"])

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(SlowAPIMiddleware)

# CORS configuration - allow all origins for development
# MUST be added after SlowAPIMiddleware to wrap it and provide CORS headers for 429 errors
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(remove_bg.router)
app.include_router(summarizer.router)
app.include_router(paraphrase.router)
app.include_router(grammar_fix.router)
app.include_router(image_to_text.router)
app.include_router(qr_generator.router)
app.include_router(pdf_converter.router)
app.include_router(plagiarism_check.router)
app.include_router(essay_outline.router)
app.include_router(feedback.router)

@app.get("/health")
async def health_check():  
    return {"status": "ok", "message": "Backend server is running"}

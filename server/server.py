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

nltk.download('punkt_tab')
nltk.download('averaged_perceptron_tagger_eng')
nltk.download('wordnet')
nltk.download('omw-1.4')

app = FastAPI()

# CORS configuration - allow all origins for development
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

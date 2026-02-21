from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer
from pydantic import BaseModel  
import nlpaug.augmenter.word as naw
import requests
import shutil
import os
import language_tool_python
import redis
import hashlib
import nltk
from routes import remove_bg, summarizer, paraphrase, grammar_fix, image_to_text



nltk.download('punkt_tab')
nltk.download('averaged_perceptron_tagger_eng')
nltk.download('wordnet')
nltk.download('omw-1.4')

app = FastAPI()

origins = [
    "http://localhost:3000", # Common for React/Vue
    "http://127.0.0.1:5500", # Common for Live Server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development; restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(remove_bg.router)
app.include_router(summarizer.router)
app.include_router(paraphrase.router)
app.include_router(grammar_fix.router)
app.include_router(image_to_text.router)

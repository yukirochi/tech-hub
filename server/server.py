from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer
from pydantic import BaseModel  
import requests
import shutil
import os

import nltk
nltk.download('punkt_tab')

app = FastAPI()

# 1. Setup CORS
# This allows your frontend (running on a different port) to access this backend.
origins = [
    "http://localhost:3000", # Common for React/Vue
    "http://127.0.0.1:5500", # Common for Live Server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



IMAGE_DIR = "remove_bg"
os.makedirs(IMAGE_DIR, exist_ok=True)


@app.post("/upload_image/")
async def removebg(file: UploadFile = File(...)):
    file_location = f"{IMAGE_DIR}/{file.filename}"
    finished_product_loc = f"{IMAGE_DIR}/{file.filename}-no-bg.png"
    
    
    with open(file_location,"wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    
    response = requests.post(
         'https://api.remove.bg/v1.0/removebg',
         files={'image_file': open(file_location, 'rb')},
         data={'size': 'auto'},
         headers={'X-Api-Key': 'qETZEB3thxP467z16A5SQd7Q'},   
    )
    if response.status_code == requests.codes.ok: 
        with open(finished_product_loc, 'wb') as out:
            out.write(response.content)
    
    return FileResponse(finished_product_loc, media_type='image/png')

class text_sum(BaseModel):
    content:str

@app.post('/summarize')
def summarize(text: text_sum):
    parser = PlaintextParser.from_string(text.content, Tokenizer("english"))
    
    summarizer = LsaSummarizer()
    
    summary = summarizer(parser.document, sentences_count = 2)
    
    result = ""
    
    for sums in summary:
        result += str(sums)
    
    return result    
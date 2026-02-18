from fastapi import APIRouter
from pydantic import BaseModel
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer

router = APIRouter(
    tags=["general"],
)

class text_sum(BaseModel):
    content:str

@router.post('/summarize')
def summarize(text: text_sum):
    parser = PlaintextParser.from_string(text.content, Tokenizer("english"))
    
    summarizer = LsaSummarizer()
    
    summary = summarizer(parser.document, sentences_count = 2)
    
    result = ""
    
    for sums in summary:
        result += str(sums)
    
    return result    
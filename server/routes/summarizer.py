from fastapi import APIRouter
from pydantic import BaseModel
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer
from cache.cached_text import get_cached_text
router = APIRouter(
    tags=["general"],
)

class text_sum(BaseModel):
    content:str

@router.post('/summarizer')
def summarize(text: text_sum):
    
    
    check_cached = get_cached_text(text.content, text.content)
    if check_cached:
        return check_cached
    
    parser = PlaintextParser.from_string(text.content, Tokenizer("english"))
    
    summarizer = LsaSummarizer()
    
    summary = summarizer(parser.document, sentences_count = 2)
    
    result = ""
    
    for sums in summary:
        result += str(sums)
    
    return result    
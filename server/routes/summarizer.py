from fastapi import APIRouter
from pydantic import BaseModel
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer
import hashlib
from cache.cached_text import get_cached_text, set_cached_text

router = APIRouter(
    tags=["general"],
)

class text_sum(BaseModel):
    content:str

@router.post('/summarizer')
def summarize(text: text_sum):
    try:
        # Create hash key from content
        hash_key = hashlib.sha256(text.content.encode()).hexdigest()
        
        # Check cache
        check_cached = get_cached_text(hash_key)
        
        if check_cached:
            return {"summary": check_cached}
        
        parser = PlaintextParser.from_string(text.content, Tokenizer("english"))
        
        summarizer = LsaSummarizer()
        
        summary = summarizer(parser.document, sentences_count = 2)
        
        result = ""
        
        for sums in summary:
            result += str(sums)
        
        # Cache the result
        set_cached_text(hash_key, result)
        
        return {"summary": result}
    except Exception as e:
        return {"error": str(e), "summary": ""}    
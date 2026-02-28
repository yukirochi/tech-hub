from fastapi import APIRouter
from pydantic import BaseModel
import language_tool_python
import hashlib
from cache.cached_text import get_cached_text, set_cached_text

router = APIRouter(
    tags=["general"],
)

class text_sum(BaseModel):
    content:str

@router.post('/grammar_fix')
def grammar_check(text: text_sum):
    try:
        # Create hash key from content
        hash_key = hashlib.sha256(text.content.encode()).hexdigest()
        
        # Check cache
        check_cached = get_cached_text(hash_key)
        if check_cached:
            return {"corrected": check_cached}
        
        tool = language_tool_python.LanguageTool('en-US')
        
        matches = tool.check(text.content)
        
        result = tool.correct(text.content)
        
        # Cache the result
        set_cached_text(hash_key, result)
        
        return {"corrected": result}
    except Exception as e:
        return {"error": str(e), "corrected": ""}   
from fastapi import APIRouter
from pydantic import BaseModel
import language_tool_python
from cache.cached_text import get_cached_text
router = APIRouter(
    tags=["general"],
)


class text_sum(BaseModel):
    content:str

@router.post('/grammar_fix')
def grammar_check(text: text_sum):
    
    check_cached = get_cached_text(text.content, text.content)
    if check_cached:
        return check_cached
    
    tool = language_tool_python.LanguageTool('en-US')
    
    matches = tool.check(text.content)
    
    result = tool.correct(text.content)
    
    return result   
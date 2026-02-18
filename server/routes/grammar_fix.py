from fastapi import FastAPI, APIRouter
from pydantic import BaseModel
import language_tool_python

router = APIRouter(
    tags=["general"],
)


class text_sum(BaseModel):
    content:str

@router.post('/grammar_fix')
def grammar_check(text: text_sum):
    
    tool = language_tool_python.LanguageTool('en-US')
    
    matches = tool.check(text.content)
    
    result = tool.correct(text.content)
    
    return result
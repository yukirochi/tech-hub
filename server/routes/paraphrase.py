import nlpaug.augmenter.word as naw
from pydantic import BaseModel
from fastapi import APIRouter
from cache.cached_text import get_cached_text

router  = APIRouter(
    tags=["general"],
)

class text_sum(BaseModel):
    content:str
    
@router.post('/paraphrase')
def paraphrase(text: text_sum):
    
    check_cached = get_cached_text(text.content, text.content)
    
    if check_cached:
        return check_cached
    
    aug = naw.SynonymAug(aug_src='wordnet')
    
    result = aug.augment(text.content)
    
    return result
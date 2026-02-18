import nlpaug.augmenter.word as naw
import fastapi
from pydantic import BaseModel
from fastapi import APIRouter

router  = APIRouter(
    tags=["general"],
)

class text_sum(BaseModel):
    content:str
    
@router.post('/paraphrase')
def paraphrase(text: text_sum):
    
    aug = naw.SynonymAug(aug_src='wordnet')
    
    result = aug.augment(text.content)
    
    return result
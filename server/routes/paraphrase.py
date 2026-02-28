import nlpaug.augmenter.word as naw
from pydantic import BaseModel
from fastapi import APIRouter
import hashlib
from cache.cached_text import get_cached_text, set_cached_text

router  = APIRouter(
    tags=["general"],
)

class text_sum(BaseModel):
    content:str
    
@router.post('/paraphrase')
def paraphrase(text: text_sum):
    try:
        # Create hash key from content
        hash_key = hashlib.sha256(text.content.encode()).hexdigest()
        
        # Check cache
        check_cached = get_cached_text(hash_key)
        
        if check_cached:
            return {"paraphrase": check_cached}
        
        aug = naw.SynonymAug(aug_src='wordnet')
        
        result = aug.augment(text.content)
        
        # Cache the result
        set_cached_text(hash_key, result)
        
        return {"paraphrase": result}
    except Exception as e:
        return {"error": str(e), "paraphrase": ""}
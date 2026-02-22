from fastapi import APIRouter, UploadFile, File
from PIL import Image
import pytesseract
import io
import hashlib
from cache.cached_image import set_cached_image, get_cached_image

router = APIRouter(
    tags=["general"],
)
    
@router.post("/image_to_text")
async def root(file: UploadFile = File(...)):
    
    request_object_content = await file.read()
    
    hash_key = hashlib.sha256(request_object_content).hexdigest()
    
    get_cached = get_cached_image(hash_key)
    
    if get_cached:
        return {"text": get_cached}
    
    img = Image.open(io.BytesIO(request_object_content))
    
    result = pytesseract.image_to_string(img)
    
    set_cached_image(hash_key, result)
    
    return {"text": result}
   
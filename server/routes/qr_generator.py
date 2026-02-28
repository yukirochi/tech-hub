from fastapi import APIRouter, Response
from pydantic import BaseModel
import qrcode
import io
import hashlib
from cache.cached_image import get_cached_image, set_cached_image

class text_sum(BaseModel):
    content:str

router = APIRouter(
    tags=["general"],
)

@router.post("/qr_generator")
def qr_generator(text: text_sum):
    try:
        # Create hash key from content
        hash_key = hashlib.sha256(text.content.encode()).hexdigest()
        
        # Check cache
        check_cached = get_cached_image(hash_key)
        
        if check_cached:
            return Response(content=check_cached, media_type='image/png')
        
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        
        qr.add_data(text.content)
        qr.make(fit=True)
        
        img = qr.make_image(fill_color="black", back_color="white")
        img_byte_arr = io.BytesIO()
        img.save(img_byte_arr, format='PNG')
        
        img_bytes = img_byte_arr.getvalue()
        set_cached_image(hash_key, img_bytes)
        
        return Response(content=img_bytes, media_type="image/png")
    except Exception as e:
        return Response(content=f'{{"error": "{str(e)}"}}', media_type="application/json", status_code=400)
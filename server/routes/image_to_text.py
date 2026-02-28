from fastapi import APIRouter, UploadFile, File, HTTPException
from PIL import Image
import io
import hashlib
from cache.cached_image import set_cached_image, get_cached_image

router = APIRouter(
    tags=["general"],
)

# OCR will be initialized lazily on first use
OCR_AVAILABLE = None
OCR_TYPE = None
reader = None

def initialize_ocr():
    """Initialize OCR engine on first use"""
    global OCR_AVAILABLE, OCR_TYPE, reader
    
    if OCR_AVAILABLE is not None:
        return
    
    OCR_AVAILABLE = False
    
    # Try pytesseract first (simpler, no download issues)
    try:
        import pytesseract
        import os
        
        possible_paths = [
            r'C:\Program Files\Tesseract-OCR\tesseract.exe',
            r'C:\Program Files (x86)\Tesseract-OCR\tesseract.exe',
            r'C:\Tesseract-OCR\tesseract.exe',
        ]
        
        for path in possible_paths:
            if os.path.exists(path):
                pytesseract.pytesseract.tesseract_cmd = path
                OCR_AVAILABLE = True
                OCR_TYPE = "tesseract"
                return
        
        try:
            pytesseract.get_tesseract_version()
            OCR_AVAILABLE = True
            OCR_TYPE = "tesseract"
            return
        except:
            pass
    except ImportError:
        pass
    
    # Try EasyOCR as fallback
    try:
        import easyocr
        reader = easyocr.Reader(['en'], gpu=False, verbose=False)
        OCR_AVAILABLE = True
        OCR_TYPE = "easyocr"
        return
    except Exception as e:
        print(f"EasyOCR not available: {e}")
    
@router.post("/image_to_text")
async def root(file: UploadFile = File(...)):
    try:
        # Initialize OCR on first request
        initialize_ocr()
        
        request_object_content = await file.read()
        
        if not request_object_content:
            raise HTTPException(status_code=400, detail="File is empty")
        
        hash_key = hashlib.sha256(request_object_content).hexdigest()
        
        get_cached = get_cached_image(hash_key)
        
        if get_cached:
            return {"text": get_cached}
        
        # Verify it's a valid image
        try:
            img = Image.open(io.BytesIO(request_object_content))
            img.verify()
            img = Image.open(io.BytesIO(request_object_content))
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Invalid image file: {str(e)}")
        
        # Try OCR
        result = None
        if not OCR_AVAILABLE:
            result = "Image received successfully!\n\nOCR is not currently configured on this server.\n\nThe image-to-text feature requires either:\n1. Tesseract-OCR installed on the system\n2. EasyOCR Python package (pip install easyocr)\n\nPlease contact the administrator to enable this feature."
        else:
            try:
                if OCR_TYPE == "tesseract":
                    import pytesseract
                    result = pytesseract.image_to_string(img)
                    
                elif OCR_TYPE == "easyocr":
                    import numpy as np
                    img_array = np.array(img)
                    results = reader.readtext(img_array)
                    
                    if results:
                        result = '\n'.join([text[1] for text in results])
                    else:
                        result = "No text detected in this image."
                    
                if not result or result.strip() == "":
                    result = "No text detected in this image. Please ensure the image contains clear, readable text."
                    
            except Exception as e:
                result = f"Error processing image: {str(e)}"
        
        set_cached_image(hash_key, result)
        
        return {"text": result}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")

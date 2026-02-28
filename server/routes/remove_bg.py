import os
import requests
import hashlib
from fastapi import File, UploadFile, APIRouter, Response, HTTPException
from cache.cached_image import set_cached_image, get_cached_image

router = APIRouter(
    tags=["general"],
)

@router.post("/remove_bg")
async def removebg(file: UploadFile = File(...)):
    try:
        file_content = await file.read()
        
        file_hash = hashlib.sha256(file_content).hexdigest()
        
        get_cached = get_cached_image(file_hash + '2')
        
        if get_cached:
            return Response(content=get_cached, media_type='image/png')
        
        response = requests.post(
             'https://api.remove.bg/v1.0/removebg',
             files={'image_file': file_content},
             data={'size': 'auto'},
             headers={'X-Api-Key': 'qETZEB3thxP467z16A5SQd7Q'},   
        )
        if response.status_code == requests.codes.ok: 
            read_res = response.content
            set_cached_image(file_hash + '2', read_res)
            return Response(content=read_res, media_type='image/png')
        else:
            raise HTTPException(status_code=response.status_code, detail="Failed to remove background")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing image: {str(e)}")
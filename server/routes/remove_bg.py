
import os
import shutil
import requests
import hashlib
from fastapi import FastAPI, File, UploadFile, APIRouter, Response
from fastapi.responses import FileResponse
from cache.cached_image import set_cached_image, get_cached_image


router = APIRouter(
    tags=["general"],
)

@router.post("/remove_bg")
async def removebg(file: UploadFile = File(...)):

    file_content = await file.read()
    
    file_hash = hashlib.sha256(file_content).hexdigest()
    
    get_cached = get_cached_image(file_hash + '2')
    if get_cached:
        return Response(content=get_cached, media_type='image/png')
    
    IMAGE_DIR = "remove_bg"
    os.makedirs(IMAGE_DIR, exist_ok=True)
    file_location = f"{IMAGE_DIR}/{file.filename}"
    finished_product_loc = f"{IMAGE_DIR}/{file.filename}-no-bg.png"
    
    with open(file_location, "wb") as buffer:
        buffer.write(file_content)
    
    response = requests.post(
         'https://api.remove.bg/v1.0/removebg',
         files={'image_file': open(file_location, 'rb')},
         data={'size': 'auto'},
         headers={'X-Api-Key': 'qETZEB3thxP467z16A5SQd7Q'},   
    )
    if response.status_code == requests.codes.ok: 
        with open(finished_product_loc, 'wb') as out:
            out.write(response.content)
    file_res  = open(finished_product_loc, 'rb').read()
    set_cached_image(file_hash + '2', file_res)
   
    return FileResponse(finished_product_loc, media_type='image/png')
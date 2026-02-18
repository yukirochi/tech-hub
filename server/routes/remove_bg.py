
import os
import shutil
import requests
from fastapi import FastAPI, File, UploadFile,APIRouter
from fastapi.responses import FileResponse

router = APIRouter(
    tags=["general"],
)

@router.post("/remove_bg")
async def removebg(file: UploadFile = File(...)):
    
    IMAGE_DIR = "remove_bg"
    os.makedirs(IMAGE_DIR, exist_ok=True)
    file_location = f"{IMAGE_DIR}/{file.filename}"
    finished_product_loc = f"{IMAGE_DIR}/{file.filename}-no-bg.png"
    
    
    with open(file_location,"wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    
    response = requests.post(
         'https://api.remove.bg/v1.0/removebg',
         files={'image_file': open(file_location, 'rb')},
         data={'size': 'auto'},
         headers={'X-Api-Key': 'qETZEB3thxP467z16A5SQd7Q'},   
    )
    if response.status_code == requests.codes.ok: 
        with open(finished_product_loc, 'wb') as out:
            out.write(response.content)
    
    return FileResponse(finished_product_loc, media_type='image/png')
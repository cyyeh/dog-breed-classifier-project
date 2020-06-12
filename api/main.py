import re
import base64
from io import BytesIO

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from dog_breed_classifier import DogBreedPrediction

# keep model as global variable so we don't have to reload
# it in case of warm invocations
model = None

BASE64_IMAGE_PATTERN = '^data:image/.+;base64,'

app = FastAPI()

# cors setting
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:8080',
                   'https://doggie-wiki.com',
                   'https://www.doggie-wiki.com'],
    allow_credentials=False,
    allow_methods=['*'],
    allow_headers=['*'],
)


class ImageData(BaseModel):
    base64: str


@app.get('/healthcheck')
def read_healthcheck():
    return 'healthy'


@app.post('/classify-dog-breeds')
async def classify_dog_breeds(img_data: ImageData):
    global model, loaded_pretrained_model

    if model is None:
        print(f'Initial startup, model content: {model}')
        model = DogBreedPrediction()

    # check input data is really an image
    if re.match(BASE64_IMAGE_PATTERN, img_data.base64):
        img_data = re.sub(BASE64_IMAGE_PATTERN, '', img_data.base64)
        try:
            with BytesIO(base64.b64decode(img_data, validate=True)) as img_data_decode:
                return model.predict(img_data_decode)
        except Exception as e:
            raise HTTPException(
                status_code=400, detail='There is a base64 decoding error.')
    else:
        raise HTTPException(
            status_code=400, detail='No image file found, please check again.')

# Dog Breed Classification Project

## Project Functionalities

- Users can know more about dog breeds and their information through taking photos or uploading photos.
- Users can also directly use photos provided by the project to quickly play around.
- Users can get top 3 dog breed prediction results with wikipedia links.
- Users can learn English and Chinese at the same time.

## System Architecture

![](system-diagram.png)

- dog detection
  - model: MobileNet V2 pretrained model without finetuning
  - input: an image having RGB channels with Base64 encoding
  - output: boolean
- dog classification
  - model: MobileNet V2 pretrained model with finetuning
  - input: an image having RGB channels with Base64 encoding
  - output: top-3 prediction results(dog breed names and prediction probabilities)

## Project Structure

- api: backend
- docs: frontend

## Used Tools/Technologies

- frontend
  - HTML/CSS/JavaScript
  - Materialize
- backend
  - Python
    - FastAPI
  - Docker
  - GCP
    - Cloud Run
- deep learning
  - PyTorch

## Deep Learning Under the Hood in This Project

You can check [this repo](https://github.com/cyyeh/ml-engineering-ndegree/tree/master/projects/capstone-project) for further details, and this project is orginally from my Udacity Machine Learning Engineer Nanodegree capstone project. However, I have changed some model details for this dog breed classifier, you can check [here](https://github.com/cyyeh/ml-engineering-ndegree/tree/master/projects/capstone-project/deployment) for more details.

## Setup

### Frontend

> please see the docs folder

- local development
  - `npm run start`

### Backend

> please see the api folder

- local development without docker:
  - `pip install pipenv` (If you don't have `pipenv` installed)
  - `pipenv install`
  - `pipenv run uvicorn main:app --reload`

Below commands are already written in `Makefile`, please checkout and change any setting you need first.
- local development using docker:
  - `make dev`
- build a docker image:
  - `make build`
- submit a docker image to Google Container Registry:
  - `make submit`
- deploy a docker image in Google Container Registry to Google Cloud Run:
  - `make deploy`

## Todos

- [x] support English
- [ ] support PWA

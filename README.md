# Dog Breed Classification Project

![Visualization of the codebase](./diagram.svg)

![Netlify Status](https://api.netlify.com/api/v1/badges/65ca1a81-5b5e-4a3c-88f1-b183ef2b836e/deploy-status)](https://app.netlify.com/sites/laughing-keller-69d1b5/deploys)

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
- web: frontend

## Used Tools/Technologies

- frontend
  - HTML/CSS/JavaScript
  - Materialize
  - Babel
  - Webpack
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

> please see the web folder
- `npm install` (download dependencies first)
- local development
  - `npm run start`
- deployment
  - `npm run build`

You can checkout other commands in `package.json` in the web folder

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
  - [ ] Android
  - [ ] iOS
- [ ] export the trained PyTorch models to edge devices for better inference performance

# Dog Breed Classification Project

## System Architecture

![](system-diagram.png)

- dog detection
  - model: MobileNet V2 pretrained model without finetuning
  - input: an image having RGB channels with Base64 encoding
  - output: boolean
- dog classification
  - model: MobileNet V2 pretrained model withe finetuning
  - input: an image having RGB channels with Base64 encoding
  - output: top-3 prediction results(dog breed names and prediction probabilities)

## Project Structure

- api: backend
- docs: frontend

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

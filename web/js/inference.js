/**
 * reference: https://github.com/microsoft/onnxjs/tree/master/examples/browser/resnet50
 */
import { InferenceSession, Tensor } from 'onnxjs'
import { ImageLoader } from './image-loader.js'
var ndarray = require('ndarray')
var ops = require('ndarray-ops')

let dogDetectionSession
let dogClassificationSession

const CLASS_NAMES = [
  'Affenpinscher',
  'Afghan hound',
  'Airedale terrier',
  'Akita',
  'Alaskan malamute',
  'American eskimo dog',
  'American foxhound',
  'American staffordshire terrier',
  'American water spaniel',
  'Anatolian shepherd dog',
  'Australian cattle dog',
  'Australian shepherd',
  'Australian terrier',
  'Basenji',
  'Basset hound',
  'Beagle',
  'Bearded collie',
  'Beauceron',
  'Bedlington terrier',
  'Belgian malinois',
  'Belgian sheepdog',
  'Belgian tervuren',
  'Bernese mountain dog',
  'Bichon frise',
  'Black and tan coonhound',
  'Black russian terrier',
  'Bloodhound',
  'Bluetick coonhound',
  'Border collie',
  'Border terrier',
  'Borzoi',
  'Boston terrier',
  'Bouvier des flandres',
  'Boxer',
  'Boykin spaniel',
  'Briard',
  'Brittany',
  'Brussels griffon',
  'Bull terrier',
  'Bulldog',
  'Bullmastiff',
  'Cairn terrier',
  'Canaan dog',
  'Cane corso',
  'Cardigan welsh corgi',
  'Cavalier king charles spaniel',
  'Chesapeake bay retriever',
  'Chihuahua',
  'Chinese crested',
  'Chinese shar-pei',
  'Chow chow',
  'Clumber spaniel',
  'Cocker spaniel',
  'Collie',
  'Curly-coated retriever',
  'Dachshund',
  'Dalmatian',
  'Dandie dinmont terrier',
  'Doberman pinscher',
  'Dogue de bordeaux',
  'English cocker spaniel',
  'English setter',
  'English springer spaniel',
  'English toy spaniel',
  'Entlebucher mountain dog',
  'Field spaniel',
  'Finnish spitz',
  'Flat-coated retriever',
  'French bulldog',
  'German pinscher',
  'German shepherd dog',
  'German shorthaired pointer',
  'German wirehaired pointer',
  'Giant schnauzer',
  'Glen of imaal terrier',
  'Golden retriever',
  'Gordon setter',
  'Great dane',
  'Great pyrenees',
  'Greater swiss mountain dog',
  'Greyhound',
  'Havanese',
  'Ibizan hound',
  'Icelandic sheepdog',
  'Irish red and white setter',
  'Irish setter',
  'Irish terrier',
  'Irish water spaniel',
  'Irish wolfhound',
  'Italian greyhound',
  'Japanese chin',
  'Keeshond',
  'Kerry blue terrier',
  'Komondor',
  'Kuvasz',
  'Labrador retriever',
  'Lakeland terrier',
  'Leonberger',
  'Lhasa apso',
  'Lowchen',
  'Maltese',
  'Manchester terrier',
  'Mastiff',
  'Miniature schnauzer',
  'Neapolitan mastiff',
  'Newfoundland',
  'Norfolk terrier',
  'Norwegian buhund',
  'Norwegian elkhound',
  'Norwegian lundehund',
  'Norwich terrier',
  'Nova scotia duck tolling retriever',
  'Old english sheepdog',
  'Otterhound',
  'Papillon',
  'Parson russell terrier',
  'Pekingese',
  'Pembroke welsh corgi',
  'Petit basset griffon vendeen',
  'Pharaoh hound',
  'Plott',
  'Pointer',
  'Pomeranian',
  'Poodle',
  'Portuguese water dog',
  'Saint bernard',
  'Silky terrier',
  'Smooth fox terrier',
  'Tibetan mastiff',
  'Welsh springer spaniel',
  'Wirehaired pointing griffon',
  'Xoloitzcuintli',
  'Yorkshire terrier'
]

const DOG_DETECTION_MODEL_PATH = '../models/dog-detection-model.onnx'
const DOG_CLASSIFICATION_MODEL_PATH = '../models/dog-classification-model.onnx'
const IMAGE_SIZE = 224
const argMax = array =>
  [].reduce.call(array, (m, c, i, arr) => (c > arr[m] ? i : m), 0)
const softmax = array => {
  return array.map(function(value, index) {
    return (
      Math.exp(value) /
      array
        .map(function(y /*value*/) {
          return Math.exp(y)
        })
        .reduce(function(a, b) {
          return a + b
        })
    )
  })
}

export async function predict(url) {
  const imageData = await loadData(url)
  const preprocessedData = preprocessImageData(
    imageData.data,
    IMAGE_SIZE,
    IMAGE_SIZE
  )
  const dogExistenceResult = await predictDogExistance(
    preprocessedData,
    IMAGE_SIZE,
    IMAGE_SIZE
  )
  if (dogExistenceResult) {
    return {
      dog_detected: true,
      message: await predictDogBreeds(preprocessedData, IMAGE_SIZE, IMAGE_SIZE)
    }
  } else {
    return {
      dog_detected: false,
      message: 'No dog is detected, please try another image again!'
    }
  }
}

async function loadData(url, imageSize = IMAGE_SIZE) {
  const imageLoader = new ImageLoader(imageSize, imageSize)
  const imageData = await imageLoader.getImageData(url)
  return imageData
}

async function predictDogExistance(data, width, height) {
  if (!dogDetectionSession) {
    dogDetectionSession = new InferenceSession({ backendHint: 'cpu' })
    await dogDetectionSession.loadModel(DOG_DETECTION_MODEL_PATH)
  }

  const inputTensor = new Tensor(data, 'float32', [1, 3, width, height])
  const outputMap = await dogDetectionSession.run([inputTensor])
  const outputData = outputMap.values().next().value.data
  const outputIdx = argMax(outputData)

  return 151 <= outputIdx <= 268
}

async function predictDogBreeds(data, width, height) {
  if (!dogClassificationSession) {
    dogClassificationSession = new InferenceSession({ backendHint: 'cpu' })
    await dogClassificationSession.loadModel(DOG_CLASSIFICATION_MODEL_PATH)
  }

  const inputTensor = new Tensor(data, 'float32', [1, 3, width, height])
  const outputMap = await dogClassificationSession.run([inputTensor])
  const outputData = outputMap.values().next().value.data
  const softmaxOutput = softmax(outputData)
  const top3Results = imagenetClassesTopK(softmaxOutput)

  return top3Results
}

/**
 * Preprocess raw image data to match MobileNetV2 requirement.
 */
function preprocessImageData(data, width, height) {
  const dataFromImage = ndarray(new Float32Array(data), [width, height, 4])
  const dataProcessed = ndarray(new Float32Array(width * height * 3), [
    1,
    3,
    height,
    width
  ])

  // Normalize 0-255 to (-1)-1
  ops.divseq(dataFromImage, 128.0)
  ops.subseq(dataFromImage, 1.0)

  // Realign imageData from [224*224*4] to the correct dimension [1*3*224*224].
  ops.assign(
    dataProcessed.pick(0, 0, null, null),
    dataFromImage.pick(null, null, 2)
  )
  ops.assign(
    dataProcessed.pick(0, 1, null, null),
    dataFromImage.pick(null, null, 1)
  )
  ops.assign(
    dataProcessed.pick(0, 2, null, null),
    dataFromImage.pick(null, null, 0)
  )

  return dataProcessed.data
}

/**
 * Utility function to post-process Resnet50 output. Find top k ImageNet classes with highest probability.
 */
function imagenetClassesTopK(classProbabilities, k = 3) {
  const probs = Array.from(classProbabilities)
  const probsIndices = probs.map(function(prob, index) {
    return [prob, index]
  })
  const sorted = probsIndices
    .sort(function(a, b) {
      if (a[0] < b[0]) {
        return -1
      }
      if (a[0] > b[0]) {
        return 1
      }
      return 0
    })
    .reverse()
  const topK = sorted.slice(0, k).map(function(probIndex) {
    return {
      breed: CLASS_NAMES[probIndex[1]],
      prob: probIndex[0]
    }
  })
  return topK
}

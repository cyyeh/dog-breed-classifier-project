'use strict'

import { dogBreeds } from './dog-breeds.js'
import { dogBreedSamples } from './dog-breed-samples.js'
import './smoothscroll.js'

const sampleDogBreed = document.getElementById('sample-dog-breed')
const sampleBreedImg = document.getElementById('sample-breed-img')
const sampleBreedName = document.getElementById('sample-breed-name')
const sampleBreedPredict = document.getElementById('sample-breed-predict')
const imgUpload = document.getElementById('img-upload')
const imgPreview = document.getElementById('img-preview')
const progressBar = document.getElementById('progress-bar')
const predictionResultsContainer = document.getElementById(
  'prediction-results-container'
)
const noResultsFound = document.getElementById('no-results-found')
const predictionContents = document.getElementById('prediction-contents')
const firstBreedName = document.getElementById('first-breed-name')
const firstBreedProb = document.getElementById('first-breed-prob')
const firstSpeakerButton = document.getElementById('first-speaker-button')
const secondBreedName = document.getElementById('second-breed-name')
const secondBreedProb = document.getElementById('second-breed-prob')
const secondSpeakerButton = document.getElementById('second-speaker-button')
const thirdBreedName = document.getElementById('third-breed-name')
const thirdBreedProb = document.getElementById('third-breed-prob')
const thirdSpeakerButton = document.getElementById('third-speaker-button')
const copyrightYear = document.getElementById('copyright-year')

const divInstall = document.getElementById('install-container')
const butInstall = document.getElementById('but-install')
const predictionAPIEndpoint =
  'https://dog-breed-classifier-t567wrmnkq-de.a.run.app/classify-dog-breeds'
const totalSampleImageSize = 133

// utility functions
const getRandomInt = max => Math.floor(Math.random() * Math.floor(max))
const toDataUrl = (url, callback) => {
  var xhr = new XMLHttpRequest()
  xhr.onload = function() {
    var reader = new FileReader()
    reader.onloadend = function() {
      callback(reader.result)
    }
    reader.readAsDataURL(xhr.response)
  }
  xhr.open('GET', url)
  xhr.responseType = 'blob'
  xhr.send()
}
const speak = dogBreedName => {
  console.log(dogBreedName)
  speechSynthesis.speak(new SpeechSynthesisUtterance(dogBreedName))
}
const generateRandomDogBreed = () => {
  const idx = getRandomInt(totalSampleImageSize)
  sampleBreedImg.src = 'images/samples/' + idx + '.jpg'
  sampleBreedName.textContent = dogBreedSamples[idx].breed
}

let firstBreed = ''
let secondBreed = ''
let thirdBreed = ''

// initialization
document.addEventListener('DOMContentLoaded', function() {
  // initalize materialize
  const carousel = document.getElementById('project-intro-slider')
  M.AutoInit()
  M.Carousel.init(carousel, {
    fullWidth: true,
    indicators: true
  })

  // generating a random sample dog breed image
  generateRandomDogBreed()

  // copyright year
  copyrightYear.textContent = new Date().getFullYear()
})

// cal predict dog classification api
const predictDogBreeds = async imgBase64 => {
  predictionResultsContainer.classList.toggle('hidden', true)
  predictionContents.classList.toggle('hidden', false)
  noResultsFound.classList.toggle('hidden', true)

  progressBar.classList.toggle('hidden', false)
  progressBar.scrollIntoView({
    behavior: 'smooth'
  })

  const apiResponse = await fetch(predictionAPIEndpoint, {
    method: 'POST',
    body: JSON.stringify({
      base64: imgBase64
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).catch(function() {
    progressBar.classList.toggle('hidden', true)
    predictionResultsContainer.classList.toggle('hidden', false)
    predictionContents.classList.toggle('hidden', true)
    noResultsFound.classList.toggle('hidden', false)
    noResultsFound.textContent = '發生異常，請稍後再試！'
  })

  const predictionResults = await apiResponse.json()
  progressBar.classList.toggle('hidden', true)
  dealingWithPredictions(predictionResults)
  predictionResultsContainer.scrollIntoView({
    behavior: 'smooth'
  })
}

// callback for dog classification api
const dealingWithPredictions = predictionResults => {
  function updateDogPredictionContent(
    breedNameDOM,
    breedProbDOM,
    idx,
    probStr,
    animationKeyName
  ) {
    breedNameDOM.innerHTML =
      dogBreeds[predictionResults.message[idx].breed].chinese +
      '(' +
      predictionResults.message[idx].breed +
      ')' +
      ' ' +
      '<i class="material-icons" style="color: darkgreen;">link</i>'
    breedNameDOM.href = dogBreeds[predictionResults.message[idx].breed].link
    breedProbDOM.textContent = probStr
    breedProbDOM.style.width = probStr
    document.documentElement.style.setProperty(animationKeyName, probStr)
  }

  predictionResultsContainer.classList.toggle('hidden', false)
  if ('dog_detected' in predictionResults) {
    // successfully detect a dog
    if (predictionResults.dog_detected) {
      for (let i = 0; i < predictionResults.message.length; i++) {
        let probStr =
          (parseFloat(predictionResults.message[i].prob) * 100).toFixed(2) + '%'
        switch (i) {
          case 0:
            updateDogPredictionContent(
              firstBreedName,
              firstBreedProb,
              i,
              probStr,
              '--first-breed-prob'
            )
            firstBreed = predictionResults.message[i].breed
            break
          case 1:
            updateDogPredictionContent(
              secondBreedName,
              secondBreedProb,
              i,
              probStr,
              '--second-breed-prob'
            )
            secondBreed = predictionResults.message[i].breed
            break
          default:
            updateDogPredictionContent(
              thirdBreedName,
              thirdBreedProb,
              i,
              probStr,
              '--third-breed-prob'
            )
            thirdBreed = predictionResults.message[i].breed
        }
      }
    } else {
      // no dog is detected
      predictionContents.classList.toggle('hidden', true)
      noResultsFound.classList.toggle('hidden', false)
      noResultsFound.textContent = '嗯......狗狗偵測器沒有偵測到狗狗喔！'
    }
  } else {
    predictionContents.classList.toggle('hidden', true)
    noResultsFound.classList.toggle('hidden', false)
    noResultsFound.textContent = '發生異常，請稍後再試！'
  }
}

// image upload button click event
imgUpload.addEventListener(
  'change',
  event => {
    predictionResultsContainer.classList.toggle('hidden', true)
    predictionContents.classList.toggle('hidden', false)
    noResultsFound.classList.toggle('hidden', true)

    const selectedFile = event.target.files[0]
    if (selectedFile.type.startsWith('image/')) {
      let reader = new FileReader()

      reader.onload = event => {
        imgPreview.src = event.target.result
        imgPreview.width =
          window.innerWidth >= 768
            ? window.innerWidth * 0.75
            : window.innerWidth
        imgPreview.height = imgPreview.width * 0.75
      }

      reader.onloadend = () => {
        const imgBase64 = reader.result

        // start predicting dog breeds
        predictDogBreeds(imgBase64)
      }

      reader.readAsDataURL(selectedFile) // convert to base64 string
    } else {
      imgPreview.src = null
      imgPreview.height = 0
    }
  },
  false
)

// click card image to randomly generate a dog image
sampleDogBreed.addEventListener('click', event => {
  predictionResultsContainer.classList.toggle('hidden', true)
  predictionContents.classList.toggle('hidden', false)
  noResultsFound.classList.toggle('hidden', true)

  // generating a random sample dog breed image
  generateRandomDogBreed()
})

// click sample breed predict button
sampleBreedPredict.addEventListener('click', event => {
  // conver image to base64 first, then predict dog breeds
  toDataUrl(sampleBreedImg.src, function(imgBase64) {
    // start predicting dog breeds
    imgPreview.height = 0
    predictDogBreeds(imgBase64)
  })
})

// click speakers to pronounce dog breed names
firstSpeakerButton.addEventListener('click', event => speak(firstBreed))
secondSpeakerButton.addEventListener('click', event => speak(secondBreed))
thirdSpeakerButton.addEventListener('click', event => speak(thirdBreed))

/* 
service worker things
*/
window.addEventListener('beforeinstallprompt', event => {
  console.log('👍', 'beforeinstallprompt', event)
  // stash the event so it can be triggered later
  window.deferredPrompt = event
  // remove the "hidden" class from the install button container
  // divInstall.classList.toggle('hidden', false)
})

window.addEventListener('appinstalled', event => {
  console.log('👍', 'appinstalled', event)
})

butInstall.addEventListener('click', () => {
  console.log('👍', 'butInstall-clicked')
  const promptEvent = window.deferredPrompt
  if (!promptEvent) {
    // The deferred prompt isn't available.
    return
  }
  // Show the install prompt.
  promptEvent.prompt()
  // Log the result
  promptEvent.userChoice.then(result => {
    console.log('👍', 'userChoice', result)
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null
    // Hide the install button.
    divInstall.classList.toggle('hidden', true)
  })
})

/* Only register a service worker if it's supported */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('service-worker.js', { scope: '/dog-breed-classifier/' })
    .then(function(reg) {
      console.log('Registration succeeded. Scope is ' + reg.scope)
    })
}

/**
 * Warn the page must be served over HTTPS
 * The `beforeinstallprompt` event won't fire if the page is served over HTTP.
 * Installability requires a service worker with a fetch event handler, and
 * if the page isn't served over HTTPS, the service worker won't load.
 */
if (
  window.location.protocol === 'http:' &&
  window.location.host.indexOf('localhost') === -1
) {
  const requireHTTPS = document.getElementById('requireHTTPS')
  const link = requireHTTPS.querySelector('a')
  link.href = window.location.href.replace('http://', 'https://')
  requireHTTPS.classList.remove('hidden')
}

const divInstall = document.getElementById('install-container')
const butInstall = document.getElementById('but-install')
const imgUpload = document.getElementById('img-upload')
const imgPreview = document.getElementById('img-preview')
const predictButton = document.getElementById('predict-button')
const progressBar = document.getElementById('progress-bar')
const predictionResultsContainer = document.getElementById(
  'prediction-results-container'
)
const predictionAPIEndpoint =
  'https://dog-breed-classifier-t567wrmnkq-de.a.run.app/classify-dog-breeds'

let imgBase64 = ''

const predictDogBreeds = async imgBase64 => {
  progressBar.classList.toggle('hidden', false)

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
    predictionResultsContainer.classList.toggle('hidden', true)
  })

  const predictionResults = await apiResponse.json()
  progressBar.classList.toggle('hidden', true)
  dealingWithPredictions(predictionResults)
}

const dealingWithPredictions = predictionResults => {
  console.log(predictionResults)
  if ('dog_detected' in predictionResults) {
    // successfully detect a dog
    if (predictionResults.dog_detected) {
      console.log(predictionResults.message)
    } else {
      // no dog is detected
      console.log(predictionResults.message)
    }
    predictionResultsContainer.classList.toggle('hidden', false)
  } else if ('detail' in predictionResults) {
    predictionResultsContainer.classList.toggle('hidden', true)
    console.log(predictionResults.detail)
  } else {
    predictionResultsContainer.classList.toggle('hidden', true)
    console.log('unknown error!')
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.getElementById('project-intro-slider')
  M.AutoInit()
  M.Carousel.init(carousel, {
    fullWidth: true,
    indicators: true
  })
})

window.addEventListener('beforeinstallprompt', event => {
  console.log('👍', 'beforeinstallprompt', event)
  // stash the event so it can be triggered later
  window.deferredPrompt = event
  // remove the "hidden" class from the install button container
  divInstall.classList.toggle('hidden', false)
})

imgUpload.addEventListener(
  'change',
  event => {
    predictionResultsContainer.classList.toggle('hidden', true)

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
        imgBase64 = reader.result
      }

      reader.readAsDataURL(selectedFile) // convert to base64 string
      predictButton.classList.toggle('disabled', false)
    } else {
      imgPreview.src = null
      imgPreview.height = 0
      predictButton.classList.toggle('disabled', true)
    }
  },
  false
)

predictButton.addEventListener('click', () => {
  predictionResultsContainer.classList.toggle('hidden', true)
  predictDogBreeds(imgBase64)
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

window.addEventListener('appinstalled', event => {
  console.log('👍', 'appinstalled', event)
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

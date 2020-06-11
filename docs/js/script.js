'use strict'

// we also use the preloading technique which is declared in HTML head section
// to enhance loading performance
import { dogBreeds } from './dog-breeds.js'
import { dogBreedSamples } from './dog-breed-samples.js'
import { translations } from './translations.js'
import './smoothscroll.js'

const translationButton = document.getElementById('translation-button')
const websiteTitle = document.getElementById('website-title')
const cover1Title = document.getElementById('cover-1-title')
const cover1Subtitle = document.getElementById('cover-1-subtitle')
const cover2Title = document.getElementById('cover-2-title')
const cover2Subtitle = document.getElementById('cover-2-subtitle')
const cover3Title = document.getElementById('cover-3-title')
const cover3Subtitle = document.getElementById('cover-3-subtitle')
const cover4Title = document.getElementById('cover-4-title')
const cover4Subtitle = document.getElementById('cover-4-subtitle')
const coverButton = document.getElementById('cover-button')
const tryText = document.getElementById('try-text')
const imgUploadText = document.getElementById('img-upload-text')
const sampleBreedPredict = document.getElementById('sample-breed-predict')
const progressNotes = document.getElementById('progress-notes')
const predictionResultsHeadline = document.getElementById(
  'prediction-results-headline'
)
const sampleDogBreed = document.getElementById('sample-dog-breed')
const sampleBreedImg = document.getElementById('sample-breed-img')
const sampleBreedName = document.getElementById('sample-breed-name')
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
const html = document.getElementsByTagName('html')[0]

const predictionAPIEndpoint =
  'https://dog-breed-classifier-t567wrmnkq-de.a.run.app/classify-dog-breeds'
const totalSampleImageSize = 133
let sampleBreedIdx = 0

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
// https://gist.github.com/Eotones/d67be7262856a79a77abeeccef455ebf?fbclid=IwAR0o93EpbKoFy_UGG4EfSmdtT6TqyiYrFOLmz7IyVUvPbFiPhD6nJXvzObk
const synth = window.speechSynthesis
const speak = (lang, dogBreedNameEn, dogBreedNameZh) => {
  let u = new SpeechSynthesisUtterance()
  if (lang === '中') {
    let voices = synth.getVoices()

    for (let index = 0; index < voices.length; index++) {
      /*
      "Google US English"
      "Google 日本語"
      "Google 普通话（中国大陆）"
      "Google 粤語（香港）"
      "Google 國語（臺灣）"
      */

      //console.log(this.voices[index].name);
      if (voices[index].name == 'Google 國語（臺灣）') {
        //u.lang = 'zh-TW'; //這句絕對不要用
        //要使用Google中文語音的話請不要再用u.lang指定語言
        //不然可能又會被切回系統預設的中文語音
        u.voice = voices[index]
        break
      } else {
        //如果沒有則使用預設中文語音
        u.lang = 'zh-TW'
      }
    }
    u.text = dogBreedNameZh
  } else {
    u.text = dogBreedNameEn
  }
  synth.speak(u)
}

const getSampleBreedName = (lang, breedEn) => {
  return lang === '中' ? breedEn : dogBreeds[breedEn].chinese
}

const generateRandomDogBreed = () => {
  sampleBreedIdx = getRandomInt(totalSampleImageSize)
  let dogImagePath = 'images/samples/' + sampleBreedIdx
  sampleBreedImg.src = html.classList.contains('webp')
    ? dogImagePath + '.webp'
    : dogImagePath + '.jpg'
  sampleBreedName.textContent = getSampleBreedName(
    translationButton.textContent,
    dogBreedSamples[sampleBreedIdx].breed
  )
}

let firstBreed = {}
let secondBreed = {}
let thirdBreed = {}
let errorCondition = ''

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

// translation button event
translationButton.addEventListener('click', event => {
  // click to translate to English
  if (translationButton.textContent === 'En') {
    translationButton.textContent = '中'
    websiteTitle.textContent = translations.en.siteTitle
    cover1Title.textContent = translations.en.cover1Title
    cover1Subtitle.textContent = translations.en.cover1Subtitle
    cover2Title.textContent = translations.en.cover2Title
    cover2Subtitle.textContent = translations.en.cover2Subtitle
    cover3Title.textContent = translations.en.cover3Title
    cover3Subtitle.textContent = translations.en.cover3Subtitle
    cover4Title.textContent = translations.en.cover4Title
    cover4Subtitle.textContent = translations.en.cover4Subtitle
    coverButton.textContent = translations.en.coverButton
    tryText.textContent = translations.en.tryText
    imgUploadText.placeholder = translations.en.imgUploadText
    sampleBreedPredict.textContent = translations.en.sampleBreedPredict
    progressNotes.textContent = translations.en.progressNotes
    predictionResultsHeadline.textContent =
      translations.en.predictionResultsHeadline
  } else {
    translationButton.textContent = 'En'
    websiteTitle.textContent = translations.zh.siteTitle
    cover1Title.textContent = translations.zh.cover1Title
    cover1Subtitle.textContent = translations.zh.cover1Subtitle
    cover2Title.textContent = translations.zh.cover2Title
    cover2Subtitle.textContent = translations.zh.cover2Subtitle
    cover3Title.textContent = translations.zh.cover3Title
    cover3Subtitle.textContent = translations.zh.cover3Subtitle
    cover4Title.textContent = translations.zh.cover4Title
    cover4Subtitle.textContent = translations.zh.cover4Subtitle
    coverButton.textContent = translations.zh.coverButton
    tryText.textContent = translations.zh.tryText
    imgUploadText.placeholder = translations.zh.imgUploadText
    sampleBreedPredict.textContent = translations.zh.sampleBreedPredict
    progressNotes.textContent = translations.zh.progressNotes
    predictionResultsHeadline.textContent =
      translations.zh.predictionResultsHeadline
  }

  sampleBreedName.textContent = getSampleBreedName(
    translationButton.textContent,
    dogBreedSamples[sampleBreedIdx].breed
  )

  firstBreedName.textContent = getDogBreedName(
    translationButton.textContent,
    firstBreed.en,
    firstBreed.zh
  )
  secondBreedName.textContent = getDogBreedName(
    translationButton.textContent,
    secondBreed.en,
    secondBreed.zh
  )
  thirdBreedName.textContent = getDogBreedName(
    translationButton.textContent,
    thirdBreed.en,
    thirdBreed.zh
  )
  if (errorCondition !== '') {
    switch (errorCondition) {
      case '1':
        noResultsFound.textContent = showErrorTexts(
          translationButton.textContent,
          translations.en.errorText1,
          translations.zh.errorText1
        )
        break
      case '2':
        noResultsFound.textContent = showErrorTexts(
          translationButton.textContent,
          translations.en.errorText2,
          translations.zh.errorText2
        )
        break
      default:
        noResultsFound.textContent = showErrorTexts(
          translationButton.textContent,
          translations.en.errorText3,
          translations.zh.errorText3
        )
    }
  }
})

// show error texts based on current language
const showErrorTexts = (lang, errorEn, errorZh) =>
  lang === '中' ? errorEn : errorZh

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
    noResultsFound.textContent = showErrorTexts(
      translationButton.textContent,
      translations.en.errorText3,
      translations.zh.errorText3
    )
    errorCondition = '3'
  })

  const predictionResults = await apiResponse.json()
  progressBar.classList.toggle('hidden', true)
  dealingWithPredictions(predictionResults)
  predictionResultsContainer.scrollIntoView({
    behavior: 'smooth'
  })
}

// get dog breed name based on current language
const getDogBreedName = (lang, englishName, chineseName) => {
  return lang === '中'
    ? englishName + '(' + chineseName + ')'
    : chineseName + '(' + englishName + ')'
}

// callback for dog classification api
const dealingWithPredictions = predictionResults => {
  function updateDogPredictionContent(
    breedNameDOM,
    breedProbDOM,
    breedEn,
    breedZh,
    idx,
    probStr,
    animationKeyName
  ) {
    breedNameDOM.textContent = getDogBreedName(
      translationButton.textContent,
      breedEn,
      breedZh
    )
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
            firstBreed = {
              en: predictionResults.message[i].breed,
              zh: dogBreeds[predictionResults.message[i].breed].chinese
            }

            updateDogPredictionContent(
              firstBreedName,
              firstBreedProb,
              firstBreed.en,
              firstBreed.zh,
              i,
              probStr,
              '--first-breed-prob'
            )
            break
          case 1:
            secondBreed = {
              en: predictionResults.message[i].breed,
              zh: dogBreeds[predictionResults.message[i].breed].chinese
            }

            updateDogPredictionContent(
              secondBreedName,
              secondBreedProb,
              secondBreed.en,
              secondBreed.zh,
              i,
              probStr,
              '--second-breed-prob'
            )
            break
          default:
            thirdBreed = {
              en: predictionResults.message[i].breed,
              zh: dogBreeds[predictionResults.message[i].breed].chinese
            }

            updateDogPredictionContent(
              thirdBreedName,
              thirdBreedProb,
              thirdBreed.en,
              thirdBreed.zh,
              i,
              probStr,
              '--third-breed-prob'
            )
        }
      }
    } else {
      // no dog is detected
      predictionContents.classList.toggle('hidden', true)
      noResultsFound.classList.toggle('hidden', false)
      noResultsFound.textContent = showErrorTexts(
        translationButton.textContent,
        translations.en.errorText2,
        translations.zh.errorText2
      )
      errorCondition = '2'
    }
  } else {
    predictionContents.classList.toggle('hidden', true)
    noResultsFound.classList.toggle('hidden', false)
    noResultsFound.textContent = showErrorTexts(
      translationButton.textContent,
      translations.en.errorText1,
      translations.zh.errorText1
    )
    errorCondition = '1'
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

      // start predicting dog breeds
      reader.onloadend = () => predictDogBreeds(reader.result)

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
  imgPreview.height = 0
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
firstSpeakerButton.addEventListener('click', event =>
  speak(translationButton.textContent, firstBreed.en, firstBreed.zh)
)
secondSpeakerButton.addEventListener('click', event =>
  speak(translationButton.textContent, secondBreed.en, secondBreed.zh)
)
thirdSpeakerButton.addEventListener('click', event =>
  speak(translationButton.textContent, thirdBreed.en, thirdBreed.zh)
)

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
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js').then(
      function(registration) {
        // Registration was successful
        console.log(
          'ServiceWorker registration successful with scope: ',
          registration.scope
        )
      },
      function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err)
      }
    )
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

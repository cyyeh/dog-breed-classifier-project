const divInstall = document.getElementById('install-container')
const butInstall = document.getElementById('but-install')
const imgUpload = document.getElementById('img-upload')
const imgPreview = document.getElementById('img-preview')
const predictButton = document.getElementById('predict-button')
const progressBar = document.getElementById('progress-bar')
const predictionResultsContainer = document.getElementById(
  'prediction-results-container'
)
const noResultsFound = document.getElementById('no-results-found')
const predictionContents = document.getElementById('prediction-contents')
const firstBreedName = document.getElementById('first-breed-name')
const firstBreedProb = document.getElementById('first-breed-prob')
const secondBreedName = document.getElementById('second-breed-name')
const secondBreedProb = document.getElementById('second-breed-prob')
const thirdBreedName = document.getElementById('third-breed-name')
const thirdBreedProb = document.getElementById('third-breed-prob')
const predictionAPIEndpoint =
  'https://dog-breed-classifier-t567wrmnkq-de.a.run.app/classify-dog-breeds'

const dogBreeds = {
  Affenpinscher: '猴犬',
  'Afghan hound': '阿富汗獵狗',
  'Airedale terrier': '萬能㹴',
  Akita: '秋田犬',
  'Alaskan malamute': '阿拉斯加雪撬犬',
  'American eskimo dog': '美國愛斯基摩犬',
  'American foxhound': '美國獵狐犬',
  'American staffordshire terrier': '美國斯塔福郡㹴',
  'American water spaniel': '美國水獵犬',
  'Anatolian shepherd dog': '安那托利亞牧羊犬',
  'Australian cattle dog': '澳洲牧牛犬',
  'Australian shepherd': '澳洲牧羊犬',
  'Australian terrier': '澳大利亞㹴',
  Basenji: '巴辛吉犬',
  'Basset hound': '巴吉度獵犬',
  Beagle: '米格魯',
  'Bearded collie': '長鬚牧羊犬',
  Beauceron: '法蘭西野狼犬',
  'Bedlington terrier': '貝林登',
  'Belgian malinois': '瑪利諾犬',
  'Belgian sheepdog': '比利時牧羊犬',
  'Belgian tervuren': '比利時特伏丹犬',
  'Bernese mountain dog': '伯恩山犬',
  'Bichon frise': '比熊犬',
  'Black and tan coonhound': '黑褐獵浣熊犬',
  'Black russian terrier': '俄羅斯黑爹利',
  Bloodhound: '尋血獵犬',
  'Bluetick coonhound': '布魯泰克獵浣熊犬',
  'Border collie': '邊境牧羊犬',
  'Border terrier': '波士頓㹴',
  Borzoi: '俄國獵狼犬',
  'Boston terrier': '波士頓㹴',
  'Bouvier des flandres': '法蘭德斯牧羊犬',
  Boxer: '拳師犬',
  'Boykin spaniel': '帕金獵犬',
  Briard: '伯瑞犬',
  Brittany: '不列塔尼犬',
  'Brussels griffon': '布魯塞爾格林芬犬',
  'Bull terrier': '牛頭㹴',
  Bulldog: '鬥牛犬',
  Bullmastiff: '鬥牛獒',
  'Cairn terrier': '凱恩㹴',
  'Canaan dog': '迦南犬',
  'Cane corso': '卡斯羅犬',
  'Cardigan welsh corgi': '喀地干威爾斯哥基犬',
  'Cavalier king charles spaniel': '查理斯王騎士犬',
  'Chesapeake bay retriever': '乞沙比克獵犬',
  Chihuahua: '吉娃娃',
  'Chinese crested': '中國冠毛犬',
  'Chinese shar-pei': '傳統中國沙皮犬',
  'Chow chow': '鬆獅犬',
  'Clumber spaniel': '克蘭勃小獵犬',
  'Cocker spaniel': '可卡犬',
  Collie: '柯利牧羊犬',
  'Curly-coated retriever': '捲毛尋回犬',
  Dachshund: '臘腸犬',
  Dalmatian: '大麥町',
  'Dandie dinmont terrier': '丹第丁蒙挭',
  'Doberman pinscher': '杜賓犬',
  'Dogue de bordeaux': '波爾多獒犬',
  'English cocker spaniel': '英國可卡犬',
  'English setter': '雪達犬',
  'English springer spaniel': '英國激飛獵犬',
  'English toy spaniel': '英國愛玩斯巴尼爾犬',
  'Entlebucher mountain dog': '恩特雷布赫山犬',
  'Field spaniel': '田園獵犬',
  'Finnish spitz': '芬蘭絲毛犬',
  'Flat-coated retriever': '平毛尋回犬',
  'French bulldog': '法國鬥牛犬',
  'German pinscher': '德國賓沙犬',
  'German shepherd dog': '德國牧羊犬',
  'German shorthaired pointer': '德國短毛指示犬',
  'German wirehaired pointer': '德國剛毛指示犬',
  'Giant schnauzer': '大型雪納瑞犬',
  'Glen of imaal terrier': '愛爾蘭峽谷㹴',
  'Golden retriever': '黃金獵犬',
  'Gordon setter': '黃金蹲獵犬',
  'Great dane': '大丹犬',
  'Great pyrenees': '庇里牛斯山犬',
  'Greater swiss mountain dog': '大瑞士山地犬',
  Greyhound: '格雷伊獵犬',
  Havanese: '哈威那犬',
  'Ibizan hound': '依比沙獵犬',
  'Icelandic sheepdog': '喜樂蒂牧羊犬',
  'Irish red and white setter': '愛爾蘭紅白獵犬',
  'Irish setter': '愛爾蘭雪達',
  'Irish terrier': '愛爾蘭梗犬',
  'Irish water spaniel': '愛爾蘭水獵犬',
  'Irish wolfhound': '愛爾蘭獵狼犬',
  'Italian greyhound': '義大利灰狗',
  'Japanese chin': '日本狆',
  Keeshond: '荷蘭毛獅犬',
  'Kerry blue terrier': '凱利藍爹利',
  Komondor: '哥蒙多犬',
  Kuvasz: '庫巴斯犬',
  'Labrador retriever': '拉布拉多犬',
  'Lakeland terrier': '湖畔梗犬',
  Leonberger: '藍伯格犬',
  'Lhasa apso': '拉薩犬',
  Lowchen: '羅秦犬',
  Maltese: '馬爾濟斯',
  'Manchester terrier': '曼徹斯特梗犬',
  Mastiff: '獒犬',
  'Miniature schnauzer': '雪納瑞',
  'Neapolitan mastiff': '那不勒斯獒犬',
  Newfoundland: '紐芬蘭犬',
  'Norfolk terrier': '諾福克梗',
  'Norwegian buhund': '挪威布哈德犬',
  'Norwegian elkhound': '挪威獵麇犬',
  'Norwegian lundehund': '挪威盧德杭犬',
  'Norwich terrier': '挪利其梗',
  'Nova scotia duck tolling retriever': '新斯科舍誘鴨尋回犬',
  'Old english sheepdog': '英國古代牧羊犬',
  Otterhound: '奧德獵獺犬',
  Papillon: '蝴蝶犬',
  'Parson russell terrier': '帕森羅素梗',
  Pekingese: '北京狗',
  'Pembroke welsh corgi': '威爾斯柯基犬',
  'Petit basset griffon vendeen': '迷你貝吉格里芬凡丁犬',
  'Pharaoh hound': '法老獵犬',
  Plott: '普羅特獵犬',
  Pointer: '英國指標犬',
  Pomeranian: '博美犬',
  Poodle: '貴賓犬',
  'Portuguese water dog': '葡萄牙水犬',
  'Saint bernard': '聖伯納犬',
  'Silky terrier': '絲毛梗',
  'Smooth fox terrier': '短毛獵狐爹利',
  'Tibetan mastiff': '藏獒',
  'Welsh springer spaniel': '威爾斯㹴',
  'Wirehaired pointing griffon': '剛毛指示獵鷹犬',
  Xoloitzcuintli: '墨西哥無毛犬',
  'Yorkshire terrier': '約克夏㹴'
}

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
    predictionResultsContainer.classList.toggle('hidden', false)
    predictionContents.classList.toggle('hidden', true)
    noResultsFound.classList.toggle('hidden', false)
    noResultsFound.textContent = '發生異常，請稍後再試！'
  })

  const predictionResults = await apiResponse.json()
  progressBar.classList.toggle('hidden', true)
  dealingWithPredictions(predictionResults)
}

const dealingWithPredictions = predictionResults => {
  predictionResultsContainer.classList.toggle('hidden', false)
  if ('dog_detected' in predictionResults) {
    // successfully detect a dog
    if (predictionResults.dog_detected) {
      for (let i = 0; i < predictionResults.message.length; i++) {
        let probStr =
          (parseFloat(predictionResults.message[i].prob) * 100).toFixed(2) + '%'
        switch (i) {
          case 0:
            firstBreedName.textContent =
              dogBreeds[predictionResults.message[i].breed] +
              '(' +
              predictionResults.message[i].breed +
              ')'
            firstBreedProb.textContent = probStr
            firstBreedProb.style.width = probStr
            break
          case 1:
            secondBreedName.textContent =
              dogBreeds[predictionResults.message[i].breed] +
              '(' +
              predictionResults.message[i].breed +
              ')'
            secondBreedProb.textContent = probStr
            secondBreedProb.style.width = probStr
            break
          default:
            thirdBreedName.textContent =
              dogBreeds[predictionResults.message[i].breed] +
              '(' +
              predictionResults.message[i].breed +
              ')'
            thirdBreedProb.textContent = probStr
            thirdBreedProb.style.width = probStr
        }
      }
    } else {
      // no dog is detected
      predictionContents.classList.toggle('hidden', true)
      noResultsFound.classList.toggle('hidden', false)
      noResultsFound.textContent = '嗯......狗狗偵測器沒有偵測到狗狗喔！'
    }
  } else if ('detail' in predictionResults) {
    predictionContents.classList.toggle('hidden', true)
    noResultsFound.classList.toggle('hidden', false)
    noResultsFound.textContent = '發生異常，請稍後再試！'
  } else {
    predictionContents.classList.toggle('hidden', true)
    noResultsFound.classList.toggle('hidden', false)
    noResultsFound.textContent = '發生異常，請稍後再試！'
  }
}

window.onload = () => {
  M.AutoInit()
}

document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.getElementById('project-intro-slider')
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
  // divInstall.classList.toggle('hidden', false)
})

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
  predictionContents.classList.toggle('hidden', false)
  noResultsFound.classList.toggle('hidden', true)
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

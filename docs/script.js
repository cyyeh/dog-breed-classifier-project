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
const copyrightYear = document.getElementById('copyright-year')
const predictionAPIEndpoint =
  'https://dog-breed-classifier-t567wrmnkq-de.a.run.app/classify-dog-breeds'

const dogBreeds = {
  Affenpinscher: {
    chinese: '猴犬',
    link: 'https://www.wikiwand.com/en/Affenpinscher'
  },
  'Afghan hound': {
    chinese: '阿富汗獵狗',
    link: 'https://www.wikiwand.com/en/Afghan_Hound'
  },
  'Airedale terrier': {
    chinese: '萬能㹴',
    link: 'https://www.wikiwand.com/en/Airedale_Terrier'
  },
  Akita: {
    chinese: '秋田犬',
    link: 'https://www.wikiwand.com/en/Akita_(dog)'
  },
  'Alaskan malamute': {
    chinese: '阿拉斯加雪撬犬',
    link: 'https://www.wikiwand.com/en/Alaskan_Malamute'
  },
  'American eskimo dog': {
    chinese: '美國愛斯基摩犬',
    link: 'https://www.wikiwand.com/en/American_Eskimo_Dog'
  },
  'American foxhound': {
    chinese: '美國獵狐犬',
    link: 'https://www.wikiwand.com/en/American_Foxhound'
  },
  'American staffordshire terrier': {
    chinese: '美國斯塔福郡㹴',
    link: 'https://www.wikiwand.com/en/American_Staffordshire_Terrier'
  },
  'American water spaniel': {
    chinese: '美國水獵犬',
    link: 'https://www.wikiwand.com/en/American_Water_Spaniel'
  },
  'Anatolian shepherd dog': {
    chinese: '安那托利亞牧羊犬',
    link: 'https://www.wikiwand.com/en/Anatolian_Shepherd'
  },
  'Australian cattle dog': {
    chinese: '澳洲牧牛犬',
    link: 'https://www.wikiwand.com/en/Australian_Cattle_Dog'
  },
  'Australian shepherd': {
    chinese: '澳洲牧羊犬',
    link: 'https://www.wikiwand.com/en/Australian_Shepherd'
  },
  'Australian terrier': {
    chinese: '澳大利亞㹴',
    link: 'https://www.wikiwand.com/en/Australian_Terrier'
  },
  Basenji: {
    chinese: '巴辛吉犬',
    link: 'https://www.wikiwand.com/en/Basenji'
  },
  'Basset hound': {
    chinese: '巴吉度獵犬',
    link: 'https://www.wikiwand.com/en/Basset_Hound'
  },
  Beagle: {
    chinese: '米格魯',
    link: 'https://www.wikiwand.com/en/Beagle'
  },
  'Bearded collie': {
    chinese: '長鬚牧羊犬',
    link: 'https://www.wikiwand.com/en/Bearded_Collie'
  },
  Beauceron: {
    chinese: '法蘭西野狼犬',
    link: 'https://www.wikiwand.com/en/Beauceron'
  },
  'Bedlington terrier': {
    chinese: '貝林登',
    link: 'https://www.wikiwand.com/en/Bedlington_Terrier'
  },
  'Belgian malinois': {
    chinese: '瑪利諾犬',
    link: 'https://www.wikiwand.com/en/Malinois_dog'
  },
  'Belgian sheepdog': {
    chinese: '比利時牧羊犬',
    link: 'https://www.wikiwand.com/en/Belgian_Shepherd'
  },
  'Belgian tervuren': {
    chinese: '比利時特伏丹犬',
    link: 'https://www.wikiwand.com/en/Tervuren_dog'
  },
  'Bernese mountain dog': {
    chinese: '伯恩山犬',
    link: 'https://www.wikiwand.com/en/Bernese_Mountain_Dog'
  },
  'Bichon frise': {
    chinese: '比熊犬',
    link: 'https://www.wikiwand.com/en/Bichon_Frise'
  },
  'Black and tan coonhound': {
    chinese: '黑褐獵浣熊犬',
    link: 'https://www.wikiwand.com/en/Black_and_Tan_Coonhound'
  },
  'Black russian terrier': {
    chinese: '俄羅斯黑爹利',
    link: 'https://www.wikiwand.com/en/Black_Russian_Terrier'
  },
  Bloodhound: {
    chinese: '尋血獵犬',
    link: 'https://www.wikiwand.com/en/Bloodhound'
  },
  'Bluetick coonhound': {
    chinese: '布魯泰克獵浣熊犬',
    link: 'https://www.wikiwand.com/en/Bluetick_Coonhound'
  },
  'Border collie': {
    chinese: '邊境牧羊犬',
    link: 'https://www.wikiwand.com/en/Border_Collie'
  },
  'Border terrier': {
    chinese: '波士頓㹴',
    link: 'https://www.wikiwand.com/en/Border_Terrier'
  },
  Borzoi: {
    chinese: '俄國獵狼犬',
    link: 'https://www.wikiwand.com/en/Borzoi'
  },
  'Boston terrier': {
    chinese: '波士頓㹴',
    link: 'https://www.wikiwand.com/en/Boston_Terrier'
  },
  'Bouvier des flandres': {
    chinese: '法蘭德斯牧羊犬',
    link: 'https://www.wikiwand.com/en/Bouvier_des_Flandres'
  },
  Boxer: {
    chinese: '拳師犬',
    link: 'https://www.wikiwand.com/en/Boxer_(dog)'
  },
  'Boykin spaniel': {
    chinese: '帕金獵犬',
    link: 'https://www.wikiwand.com/en/Boykin_Spaniel'
  },
  Briard: {
    chinese: '伯瑞犬',
    link: 'https://www.wikiwand.com/en/Briard'
  },
  Brittany: {
    chinese: '不列塔尼犬',
    link: 'https://www.wikiwand.com/en/Brittany_(dog)'
  },
  'Brussels griffon': {
    chinese: '布魯塞爾格林芬犬',
    link: 'https://www.wikiwand.com/en/Griffon_Bruxellois'
  },
  'Bull terrier': {
    chinese: '牛頭㹴',
    link: 'https://www.wikiwand.com/en/Bull_Terrier'
  },
  Bulldog: {
    chinese: '鬥牛犬',
    link: 'https://www.wikiwand.com/en/Bulldog'
  },
  Bullmastiff: {
    chinese: '鬥牛獒',
    link: 'https://www.wikiwand.com/en/Bullmastiff'
  },
  'Cairn terrier': {
    chinese: '凱恩㹴',
    link: 'https://www.wikiwand.com/en/Cairn_Terrier'
  },
  'Canaan dog': {
    chinese: '迦南犬',
    link: 'https://www.wikiwand.com/en/Canaan_Dog'
  },
  'Cane corso': {
    chinese: '卡斯羅犬',
    link: 'https://www.wikiwand.com/en/Cane_Corso'
  },
  'Cardigan welsh corgi': {
    chinese: '喀地干威爾斯哥基犬',
    link: 'https://www.wikiwand.com/en/Cardigan_Welsh_Corgi'
  },
  'Cavalier king charles spaniel': {
    chinese: '查理斯王騎士犬',
    link: 'https://www.wikiwand.com/en/Cavalier_King_Charles_Spaniel'
  },
  'Chesapeake bay retriever': {
    chinese: '乞沙比克獵犬',
    link: 'https://www.wikiwand.com/en/Chesapeake_Bay_Retriever'
  },
  Chihuahua: {
    chinese: '吉娃娃',
    link: 'https://www.wikiwand.com/en/Chihuahua_(dog)'
  },
  'Chinese crested': {
    chinese: '中國冠毛犬',
    link: 'https://www.wikiwand.com/en/Chinese_Crested_Dog'
  },
  'Chinese shar-pei': {
    chinese: '傳統中國沙皮犬',
    link: 'https://www.wikiwand.com/en/Shar_Pei'
  },
  'Chow chow': {
    chinese: '鬆獅犬',
    link: 'https://www.wikiwand.com/en/Chow_Chow'
  },
  'Clumber spaniel': {
    chinese: '克蘭勃小獵犬',
    link: 'https://www.wikiwand.com/en/Clumber_Spaniel'
  },
  'Cocker spaniel': {
    chinese: '可卡犬',
    link: 'https://www.wikiwand.com/en/Cocker_Spaniel'
  },
  Collie: {
    chinese: '柯利牧羊犬',
    link: 'https://www.wikiwand.com/en/Collie'
  },
  'Curly-coated retriever': {
    chinese: '捲毛尋回犬',
    link: 'https://www.wikiwand.com/en/Curly-coated_Retriever'
  },
  Dachshund: {
    chinese: '臘腸犬',
    link: 'https://www.wikiwand.com/en/Dachshund'
  },
  Dalmatian: {
    chinese: '大麥町',
    link: 'https://www.wikiwand.com/en/Dalmatian_(dog)'
  },
  'Dandie dinmont terrier': {
    chinese: '丹第丁蒙挭',
    link: 'https://www.wikiwand.com/en/Dandie_Dinmont_Terrier'
  },
  'Doberman pinscher': {
    chinese: '杜賓犬',
    link: 'https://www.wikiwand.com/en/Dobermann'
  },
  'Dogue de bordeaux': {
    chinese: '波爾多獒犬',
    link: 'https://www.wikiwand.com/en/Dogue_de_Bordeaux'
  },
  'English cocker spaniel': {
    chinese: '英國可卡犬',
    link: 'https://www.wikiwand.com/en/English_Cocker_Spaniel'
  },
  'English setter': {
    chinese: '雪達犬',
    link: 'https://www.wikiwand.com/en/English_Setter'
  },
  'English springer spaniel': {
    chinese: '英國激飛獵犬',
    link: 'https://www.wikiwand.com/en/English_Springer_Spaniel'
  },
  'English toy spaniel': {
    chinese: '英國愛玩斯巴尼爾犬',
    link: 'https://www.wikiwand.com/en/King_Charles_Spaniel'
  },
  'Entlebucher mountain dog': {
    chinese: '恩特雷布赫山犬',
    link: 'https://www.wikiwand.com/en/Entlebucher_Mountain_Dog'
  },
  'Field spaniel': {
    chinese: '田園獵犬',
    link: 'https://www.wikiwand.com/en/Field_Spaniel'
  },
  'Finnish spitz': {
    chinese: '芬蘭絲毛犬',
    link: 'https://www.wikiwand.com/en/Finnish_Spitz'
  },
  'Flat-coated retriever': {
    chinese: '平毛尋回犬',
    link: 'https://www.wikiwand.com/en/Flat-coated_Retriever'
  },
  'French bulldog': {
    chinese: '法國鬥牛犬',
    link: 'https://www.wikiwand.com/en/French_Bulldog'
  },
  'German pinscher': {
    chinese: '德國賓沙犬',
    link: 'https://www.wikiwand.com/en/German_Pinscher'
  },
  'German shepherd dog': {
    chinese: '德國牧羊犬',
    link: 'https://www.wikiwand.com/en/German_Shepherd'
  },
  'German shorthaired pointer': {
    chinese: '德國短毛指示犬',
    link: 'https://www.wikiwand.com/en/German_Shorthaired_Pointer'
  },
  'German wirehaired pointer': {
    chinese: '德國剛毛指示犬',
    link: 'https://www.wikiwand.com/en/German_Wirehaired_Pointer'
  },
  'Giant schnauzer': {
    chinese: '大型雪納瑞犬',
    link: 'https://www.wikiwand.com/en/Giant_Schnauzer'
  },
  'Glen of imaal terrier': {
    chinese: '愛爾蘭峽谷㹴',
    link: 'https://www.wikiwand.com/en/Glen_of_Imaal_Terrier'
  },
  'Golden retriever': {
    chinese: '黃金獵犬',
    link: 'https://www.wikiwand.com/en/Golden_Retriever'
  },
  'Gordon setter': {
    chinese: '黃金蹲獵犬',
    link: 'https://www.wikiwand.com/en/Gordon_Setter'
  },
  'Great dane': {
    chinese: '大丹犬',
    link: 'https://www.wikiwand.com/en/Great_Dane'
  },
  'Great pyrenees': {
    chinese: '庇里牛斯山犬',
    link: 'https://www.wikiwand.com/en/Pyrenean_Mountain_Dog'
  },
  'Greater swiss mountain dog': {
    chinese: '大瑞士山地犬',
    link: 'https://www.wikiwand.com/en/Greater_Swiss_Mountain_Dog'
  },
  Greyhound: {
    chinese: '格雷伊獵犬',
    link: 'https://www.wikiwand.com/en/Greyhound'
  },
  Havanese: {
    chinese: '哈威那犬',
    link: 'https://www.wikiwand.com/en/Havanese_dog'
  },
  'Ibizan hound': {
    chinese: '依比沙獵犬',
    link: 'https://www.wikiwand.com/en/Ibizan_Hound'
  },
  'Icelandic sheepdog': {
    chinese: '喜樂蒂牧羊犬',
    link: 'https://www.wikiwand.com/en/Icelandic_Sheepdog'
  },
  'Irish red and white setter': {
    chinese: '愛爾蘭紅白獵犬',
    link: 'https://www.wikiwand.com/en/Irish_Red_and_White_Setter'
  },
  'Irish setter': {
    chinese: '愛爾蘭雪達',
    link: 'https://www.wikiwand.com/en/Irish_Setter'
  },
  'Irish terrier': {
    chinese: '愛爾蘭梗犬',
    link: 'https://www.wikiwand.com/en/Irish_Terrier'
  },
  'Irish water spaniel': {
    chinese: '愛爾蘭水獵犬',
    link: 'https://www.wikiwand.com/en/Irish_Water_Spaniel'
  },
  'Irish wolfhound': {
    chinese: '愛爾蘭獵狼犬',
    link: 'https://www.wikiwand.com/en/Irish_wolfhound'
  },
  'Italian greyhound': {
    chinese: '義大利灰狗',
    link: 'https://www.wikiwand.com/en/Italian_Greyhound'
  },
  'Japanese chin': {
    chinese: '日本狆',
    link: 'https://www.wikiwand.com/en/Japanese_Chin'
  },
  Keeshond: {
    chinese: '荷蘭毛獅犬',
    link: 'https://www.wikiwand.com/en/Keeshond'
  },
  'Kerry blue terrier': {
    chinese: '凱利藍爹利',
    link: 'https://www.wikiwand.com/en/Kerry_Blue_Terrier'
  },
  Komondor: {
    chinese: '哥蒙多犬',
    link: 'https://www.wikiwand.com/en/Komondor'
  },
  Kuvasz: {
    chinese: '庫巴斯犬',
    link: 'https://www.wikiwand.com/en/Kuvasz'
  },
  'Labrador retriever': {
    chinese: '拉布拉多犬',
    link: 'https://www.wikiwand.com/en/Labrador_Retriever'
  },
  'Lakeland terrier': {
    chinese: '湖畔梗犬',
    link: 'https://www.wikiwand.com/en/Lakeland_Terrier'
  },
  Leonberger: {
    chinese: '藍伯格犬',
    link: 'https://www.wikiwand.com/en/Leonberger'
  },
  'Lhasa apso': {
    chinese: '拉薩犬',
    link: 'https://www.wikiwand.com/en/Lhasa_Apso'
  },
  Lowchen: {
    chinese: '羅秦犬',
    link: 'https://www.wikiwand.com/en/L%C3%B6wchen'
  },
  Maltese: {
    chinese: '馬爾濟斯',
    link: 'https://www.wikiwand.com/en/Maltese_(dog)'
  },
  'Manchester terrier': {
    chinese: '曼徹斯特梗犬',
    link: 'https://www.wikiwand.com/en/Manchester_Terrier'
  },
  Mastiff: {
    chinese: '獒犬',
    link: 'https://www.wikiwand.com/en/Mastiff'
  },
  'Miniature schnauzer': {
    chinese: '雪納瑞',
    link: 'https://www.wikiwand.com/en/Miniature_Schnauzer'
  },
  'Neapolitan mastiff': {
    chinese: '那不勒斯獒犬',
    link: 'https://www.wikiwand.com/en/Neapolitan_Mastiff'
  },
  Newfoundland: {
    chinese: '紐芬蘭犬',
    link: 'https://www.wikiwand.com/en/Newfoundland_(dog)'
  },
  'Norfolk terrier': {
    chinese: '諾福克梗',
    link: 'https://www.wikiwand.com/en/Norfolk_Terrier'
  },
  'Norwegian buhund': {
    chinese: '挪威布哈德犬',
    link: 'https://www.wikiwand.com/en/Norwegian_Buhund'
  },
  'Norwegian elkhound': {
    chinese: '挪威獵麇犬',
    link: 'https://www.wikiwand.com/en/Norwegian_Elkhound'
  },
  'Norwegian lundehund': {
    chinese: '挪威盧德杭犬',
    link: 'https://www.wikiwand.com/en/Norwegian_Lundehund'
  },
  'Norwich terrier': {
    chinese: '挪利其梗',
    link: 'https://www.wikiwand.com/en/Norwich_Terrier'
  },
  'Nova scotia duck tolling retriever': {
    chinese: '新斯科舍誘鴨尋回犬',
    link: 'https://www.wikiwand.com/en/Nova_Scotia_Duck_Tolling_Retriever'
  },
  'Old english sheepdog': {
    chinese: '英國古代牧羊犬',
    link: 'https://www.wikiwand.com/en/Old_English_Sheepdog'
  },
  Otterhound: {
    chinese: '奧德獵獺犬',
    link: 'https://www.wikiwand.com/en/Otterhound'
  },
  Papillon: {
    chinese: '蝴蝶犬',
    link: 'https://www.wikiwand.com/en/Papillon_(dog)'
  },
  'Parson russell terrier': {
    chinese: '帕森羅素梗',
    link: 'https://www.wikiwand.com/en/Parson_Russell_Terrier'
  },
  Pekingese: {
    chinese: '北京狗',
    link: 'https://www.wikiwand.com/en/Pekingese'
  },
  'Pembroke welsh corgi': {
    chinese: '威爾斯柯基犬',
    link: 'https://www.wikiwand.com/en/Pembroke_Welsh_Corgi'
  },
  'Petit basset griffon vendeen': {
    chinese: '迷你貝吉格里芬凡丁犬',
    link: 'https://www.wikiwand.com/en/Petit_Basset_Griffon_Vend%C3%A9en'
  },
  'Pharaoh hound': {
    chinese: '法老獵犬',
    link: 'https://www.wikiwand.com/en/Pharaoh_Hound'
  },
  Plott: {
    chinese: '普羅特獵犬',
    link: 'https://www.wikiwand.com/en/Plotter'
  },
  Pointer: {
    chinese: '英國指標犬',
    link: 'https://www.wikiwand.com/en/Pointer_(dog_breed)'
  },
  Pomeranian: {
    chinese: '博美犬',
    link: 'https://www.wikiwand.com/en/Pomeranian_(dog)'
  },
  Poodle: {
    chinese: '貴賓犬',
    link: 'https://www.wikiwand.com/en/Poodle'
  },
  'Portuguese water dog': {
    chinese: '葡萄牙水犬',
    link: 'https://www.wikiwand.com/en/Portuguese_Water_Dog'
  },
  'Saint bernard': {
    chinese: '聖伯納犬',
    link: 'https://www.wikiwand.com/en/St._Bernard_(dog)'
  },
  'Silky terrier': {
    chinese: '絲毛梗',
    link: 'https://www.wikiwand.com/en/Australian_Silky_Terrier'
  },
  'Smooth fox terrier': {
    chinese: '短毛獵狐爹利',
    link: 'https://www.wikiwand.com/en/Smooth_Fox_Terrier'
  },
  'Tibetan mastiff': {
    chinese: '藏獒',
    link: 'https://www.wikiwand.com/en/Tibetan_Mastiff'
  },
  'Welsh springer spaniel': {
    chinese: '威爾斯㹴',
    link: 'https://www.wikiwand.com/en/Welsh_Springer_Spaniel'
  },
  'Wirehaired pointing griffon': {
    chinese: '剛毛指示獵鷹犬',
    link: 'https://www.wikiwand.com/en/Wirehaired_Pointing_Griffon'
  },
  Xoloitzcuintli: {
    chinese: '墨西哥無毛犬',
    link: 'https://www.wikiwand.com/en/Xoloitzcuintle'
  },
  'Yorkshire terrier': {
    chinese: '約克夏㹴',
    link: 'https://www.wikiwand.com/en/Yorkshire_Terrier'
  }
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
            firstBreedName.innerHTML =
              dogBreeds[predictionResults.message[i].breed].chinese +
              '(' +
              predictionResults.message[i].breed +
              ')' +
              ' ' +
              '<i class="material-icons" style="color: darkgreen;">link</i>'
            firstBreedName.href =
              dogBreeds[predictionResults.message[i].breed].link
            firstBreedProb.textContent = probStr
            firstBreedProb.style.width = probStr
            break
          case 1:
            secondBreedName.innerHTML =
              dogBreeds[predictionResults.message[i].breed].chinese +
              '(' +
              predictionResults.message[i].breed +
              ')' +
              ' ' +
              '<i class="material-icons" style="color: darkgreen;">link</i>'
            secondBreedName.href =
              dogBreeds[predictionResults.message[i].breed].link
            secondBreedProb.textContent = probStr
            secondBreedProb.style.width = probStr
            break
          default:
            thirdBreedName.innerHTML =
              dogBreeds[predictionResults.message[i].breed].chinese +
              '(' +
              predictionResults.message[i].breed +
              ')' +
              ' ' +
              '<i class="material-icons" style="color: darkgreen;">link</i>'
            thirdBreedName.href =
              dogBreeds[predictionResults.message[i].breed].link
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
  copyrightYear.textContent = new Date().getFullYear()
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

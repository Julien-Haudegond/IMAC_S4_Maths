/********** FONCTIONS **********/

const checkAnimal = deg => {
    if (deg >= 0 && deg < 45) return 'Grenouille'
    else if(deg >= 45 && deg < 90) return 'Escargot'
    else if(deg >= 90 && deg < 135) return 'Dauphin'
    else if(deg >= 135 && deg < 180) return 'Coccinelle'
    else if(deg >= 180 && deg < 225) return 'Koala'
    else if(deg >= 225 && deg < 270) return 'Licorne'
    else if(deg >= 270 && deg < 315) return 'Dragon'
    else if(deg >= 315 && deg < 360) return 'Bonhomme'
}

const computeProbs = (probs) => {
    let sumProbs = new Array(probs.length)
    let sum = 0

    for(let i = 0; i < probs.length; ++i) {
        sum += probs[i]
        sumProbs[i] = sum
    }

    print(sumProbs)
    return sumProbs
}

const getOneEventFromProbs = (probs) => {
    const computedProbs = computeProbs(probs)

    const rand = Math.random()
    print(rand)
    let eventIndex = 0

    while(eventIndex < computedProbs.length && rand > computedProbs[eventIndex]) ++eventIndex

    print(eventIndex)
    return eventIndex
}

const computeAngle = (probs) => {
    const index = getOneEventFromProbs(probs)
    const angle = index*45 + Math.floor(5 + Math.random()*40)

    print(angle)
    return angle
}


/********** SCRIPT **********/

// Définition des variables
const wheel = document.querySelector('.wheel')
const startButton = document.querySelector('.button')
const checkbox = document.querySelector('#info')
let deg = 0

let INFO = true
checkbox.checked = true

// Fonction à utiliser pour afficher des informations uniquement quand la checkbox INFO est cochée
const print = arg => {
    if(INFO) console.log(arg)
}


// Différentes probabilités de test
const probas = [1/8, 1/8, 1/8, 1/8, 1/8, 1/8, 1/8, 1/8]
const probasLicorne = [1/14, 1/14, 1/14, 1/14, 1/14, 7/14, 1/14, 1/14]
const pourcent = [4/100, 4/100, 4/100, 4/100, 5/100, 5/100, 4/100, 70/100]


startButton.addEventListener('click', () => {
    startButton.style.pointerEvents = 'none';
    deg = computeAngle(probas)
    wheel.style.transition = 'all 0.2s ease-out'
    wheel.style.transform = `rotate(${deg}deg)`
})

wheel.addEventListener('transitionend', () => {
    startButton.style.pointerEvents = 'auto';
    wheel.style.transition = 'none'
    // const actualDeg = deg % 360
    // wheel.style.transform = `rotate(${actualDeg}deg)`
    // console.log(checkAnimal(actualDeg))
})

checkbox.addEventListener('click', () => {
    INFO = !INFO
})

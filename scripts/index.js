/*
 ***************
 ** FONCTIONS **
 ***************
*/

/***** TOURNER LA ROUE *****/

// Fonction qui calcule tire un événement aléatoire et calcule l'angle de rotation de la roue correspondant
const computeAngle = (probs, wheelNumbers) => {
    const index = getOneEventFromProbs(probs)
    const angle = index*45 + Math.floor(5 + Math.random()*40)

    print(`Fonction computeAngle() :
        n° événement : case n°${index}
        valeur événement : ${wheelNumbers[index].innerHTML}
        angle normalisé calculé (45*événement + un petit "bruit" aléatoire): ${angle}°`)
    print("---------------------------")
    return angle
}


/*
 ************
 ** SCRIPT **
 ************
*/

// Récupération des éléments HTML
const wheel = document.getElementById('wheelSVG')
const startButton = document.getElementById('button')
const checkbox = document.getElementById('info')
const wheelNumbers = Array.from(document.getElementsByClassName("wheelNumbers"))
const slider = document.getElementById('wheelProbSlider')

// Définition des variables utiles
let wheelDegree = 0
let INFO = true
checkbox.checked = true

// Différentes probabilités de test
const probas = [1/8, 1/8, 1/8, 1/8, 1/8, 1/8, 1/8, 1/8]
const probas5 = [1/14, 1/14, 1/14, 1/14, 1/14, 7/14, 1/14, 1/14]
const pourcent = [4/100, 4/100, 4/100, 4/100, 5/100, 5/100, 4/100, 70/100]
let probFromSlider = getProbFromSlider(slider)


// Assigne à la roue des entiers : 0, 1 ou 2
wheelNumbers.map(item => {
    item.innerHTML = getAnIntegerFrom0To2()
})


/***** ECOUTEURS D'EVENEMENTS *****/

startButton.addEventListener('click', () => {
    startButton.style.pointerEvents = 'none';
    wheelDegree = computeAngle(probFromSlider, wheelNumbers)
    wheel.style.transition = 'all 0.5s ease-out'
    wheel.style.transform = `rotate(${wheelDegree+360}deg)`
})

wheel.addEventListener('transitionend', () => {
    startButton.style.pointerEvents = 'auto';
    wheel.style.transition = 'none'
    wheel.style.transform = `rotate(${wheelDegree}deg)`
})

checkbox.addEventListener('click', () => {
    INFO = !INFO
})

slider.addEventListener('input', () => {
    probFromSlider = getProbFromSlider(slider)
})

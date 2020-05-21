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

    dottednumber = wheelNumbers[index].innerHTML

    print(`Fonction computeAngle() :
        n° événement : case n°${index}
        valeur événement : ${dottednumber}
        angle normalisé calculé (45*événement + un petit "bruit" aléatoire): ${angle}°`)
    print("---------------------------")
    //appel fonction déplacement pour faire avancer le sous-marin
    Deplacement(dottednumber)
    return angle
}

/***** FAIRE AVANCER LE SOUS-MARIN ET LE REQUIN *****/

var turn = 0

elementShark = '<img id="shark" src="img/requin.jpg">'
elementSubmarine = '<img id="submarine" src="img/sousmarin.jpg">'

document.querySelector('#parcours td[data-id="1"]').innerHTML = elementShark
document.querySelector('#parcours td[data-id="3"]').innerHTML = elementSubmarine

function Deplacement(advance) {
    shark = document.querySelector('#shark')
    sharkId = shark.parentElement.dataset.id

    submarine = document.querySelector('#submarine')
    submarineId = submarine.parentElement.dataset.id

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }

    const go_shark = getRandomInt(3);
    const go_submarine = parseInt(advance);

    sum_shark = parseInt(sharkId)+go_shark
    sum_submarine = parseInt(submarineId)+go_submarine

    console.log(sum_shark)
    console.log(sum_submarine)

    if (turn<=5){
        if(sum_shark==sum_submarine){
            alert("Game over")
        }
        else if(sum_submarine>sum_shark){
            //pour vider la case dans laquelle les images se trouvaient
            if(go_shark != 0){
                document.querySelector('#parcours td[data-id="'+sharkId+'"]').innerHTML=''
            }

            if(go_submarine != 0){
                document.querySelector('#parcours td[data-id="'+submarineId+'"]').innerHTML=''
            }

            //pour replacer les images dans les nouvelles bonnes cases
            if(go_shark != 0){
                document.querySelector('#parcours td[data-id="'+sum_shark+'"]').innerHTML = elementShark
            }

            if(go_submarine != 0){
                document.querySelector('#parcours td[data-id="'+sum_submarine+'"]').innerHTML = elementSubmarine
            }
            turn++
        }
        else{
            alert("Le requin va trop vite !")
        }
    }
    else{
        alert("End of the game, see you soon")
    }
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


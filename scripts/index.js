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

/***** CALCULER LA FATIGUE DU REQUIN *****/

/***** Créer ligne tableau de score *****/
function createTableLine(turn, go_shark){
    tr = document.createElement('tr')
    if(go_shark == 0){
        tr.innerHTML = '<td>Tour '+turn+'</td><td>x</td><td></td>'
    }else{
        tr.innerHTML = '<td>Tour '+turn+'</td><td></td><td>x</td>'
    }  
    document.querySelector('table#score-shark tbody').appendChild(tr)
}

/***** Calculer le score final *****/
function finalScore(){

    //bloquer le button pour empêcher que le joueur joue après la fin du jeu
    document.querySelector('#button').setAttribute('disabled', 'disabled')

     //calculer données du tableau
    trFinal = document.createElement('tr')
    trFinal.innerHTML = '<td>Final</td><td id="score-zero"></td><td id="score-two"></td>'

    document.querySelector('table#score-shark tbody').appendChild(trFinal)
    
    zero = document.querySelector('#score-zero')
    two = document.querySelector('#score-two')

    percent_zero = Math.round(nb_zero*100/turn)
    percent_two = 100-percent_zero

    zero.innerHTML = percent_zero+'%'
    two.innerHTML = percent_two+'%'

    //affichage de la phrase de conclusion des résultats
    sentence = document.querySelector('p#sentence-shark')

    if(percent_two == 50){
        sentence.innerHTML = 'Le requin a une vitesse pile dans la moyenne : ni plus, ni moins.'
    }
    else if(percent_two > 50){
        sentence.innerHTML = 'Le requin est une véritable fusée Ariane !'
    }else{
        sentence.innerHTML = 'Une cure de vitamines se fait ressentir chez notre requin.'
    }
}

/***** FAIRE AVANCER LE SOUS-MARIN ET LE REQUIN *****/

turn = 0
nb_zero = 0

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

    //TODO valeur du requinou
    go_shark = getRandomInt(2)
    
    if(go_shark == 0){
        go_shark = 0
    }else if(go_shark == 1){
        go_shark = 2
    }
    //END TODO

    if(go_shark == 0){
        nb_zero++
    }

    go_submarine = parseInt(advance)

    sum_shark = parseInt(sharkId)+go_shark
    sum_submarine = parseInt(submarineId)+go_submarine

    if (turn<=5){
        turn++
        if(sum_shark==sum_submarine){
            alert("Game over")
            createTableLine(turn,go_shark)
            finalScore()
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
            createTableLine(turn,go_shark)

            if(turn == 5){
                alert("End of the game, see you soon ")
                finalScore()
            }
        }
        else{
            alert("Le requin va trop vite !")
            createTableLine(turn,go_shark)
            finalScore()
        }
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
const generatorButton = document.getElementById('generatorButton')

startButton.disabled = true
submarine.style.filter = `hue-rotate(${getIntegerFrom0To360()}deg)`

// Définition des variables utiles
let wheelDegree = 0
let INFO = true
checkbox.checked = true

// Différentes probabilités de test
const probas = [1/8, 1/8, 1/8, 1/8, 1/8, 1/8, 1/8, 1/8]
const probas5 = [1/14, 1/14, 1/14, 1/14, 1/14, 7/14, 1/14, 1/14]
const pourcent = [4/100, 4/100, 4/100, 4/100, 5/100, 5/100, 4/100, 70/100]
let probFromSlider = getProbFromSlider(slider)



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

generatorButton.addEventListener('click', () => {
    // Assigne à la roue des entiers : 0, 1 ou 2
    const wheelChoice = document.querySelector("input[name=wheel-choices]:checked").value
    const choice20 = [0.75, 0, 0.25]
    const choice10 = [0.35, 0.65, 0]
    const choice210 = [0.34, 0.33, 0.33]

    switch(wheelChoice) {
        case '20':
            wheelNumbers.map(item => {
                item.innerHTML = getOneEventFromProbs(choice20) // Fonctionne uniquement avec cette méthode car on veut un 0, un 1 ou un 2 donc pas besoin d'étape supplémentaire
            })
            break
        case '10':
            wheelNumbers.map(item => {
                item.innerHTML = getOneEventFromProbs(choice10) // Fonctionne uniquement avec cette méthode car on veut un 0, un 1 ou un 2 donc pas besoin d'étape supplémentaire
            })
            break
        case '210':
            wheelNumbers.map(item => {
                item.innerHTML = getOneEventFromProbs(choice210) // Fonctionne uniquement avec cette méthode car on veut un 0, un 1 ou un 2 donc pas besoin d'étape supplémentaire
            })
            break
        default:
            wheelNumbers.map(item => {
                item.innerHTML = getOneEventFromProbs(choice210) // Fonctionne uniquement avec cette méthode car on veut un 0, un 1 ou un 2 donc pas besoin d'étape supplémentaire
            })
    }
    startButton.disabled = false
    generatorButton.disabled = true
})

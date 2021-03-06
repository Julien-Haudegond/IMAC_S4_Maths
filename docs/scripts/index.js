/*
 ***************
 ** FONCTIONS **
 ***************
*/

// Modale
function modale(text){
    document.querySelector("#wrapper-modale").classList.add('open')
    document.querySelector("#modale-text").innerHTML = text
    
    document.querySelector("#button-modale").addEventListener('click', () => {
        location.reload()
    });
}

function modaleBienvenue(){
    document.querySelector("#shark-state").classList.add('hidden')
    document.querySelector("#wrapper-modale").classList.add('open')
    document.querySelector("#modale-text").innerHTML = 'Règles du jeu'

    document.querySelector("#close-modale").addEventListener('click', () => {
        document.querySelector("#wrapper-modale").classList.remove('open')
        document.querySelector("#rules").classList.add('hidden')
        document.querySelector("#shark-state").classList.remove('hidden')
    });

}

/***** TOURNER LA ROUE *****/

// Fonction qui calcule tire un événement aléatoire et calcule l'angle de rotation de la roue correspondant
const computeAngleAndValue = (probs, wheelNumbers) => {
    const index = discreteDistribution(probs)
    const angle = index*45 + discreteUniformDistribution(5, 40)

    dottednumber = wheelNumbers[index].innerHTML

    print(`Fonction computeAngle() :
        n° événement : case n°${index}
        valeur événement : ${dottednumber}
        angle normalisé calculé (45*événement + un petit "bruit" aléatoire): ${angle}°`)
    print("---------------------------")
    //appel fonction déplacement pour faire avancer le sous-marin
    // Deplacement(dottednumber)
    return { angle: angle, value: dottednumber }
}

// Animation du score
const createScoreDiv = (score, elt) => {
    const scoreDiv = document.createElement('div')
    scoreDiv.setAttribute('class', 'scoreDiv')
    scoreDiv.appendChild(document.createTextNode(`+${score}`))
    scoreDiv.style.position = 'absolute'
    scoreDiv.style.width = '20px'
    scoreDiv.style.height = '20px'
    scoreDiv.style.zIndex = 3
    document.body.insertBefore(scoreDiv, document.getElementById("container"))

    const bodyRect = document.body.getBoundingClientRect(), eltRect = elt.getBoundingClientRect()
    const offsetY = eltRect.top - bodyRect.top, offsetX = eltRect.right - bodyRect.left

    console.log(offsetX)
    console.log(offsetY)

    scoreDiv.style.top = `${offsetY}px`
    scoreDiv.style.left = `${offsetX}px`
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
    //afficher le nombre de tours en cours
    document.querySelector('#nb-tours-affichage').innerHTML = turn
    
    setTimeout(function(){ 
        document.querySelector('#button-tourner').disabled = false
    }, 1000);
}

/***** Permet de donner un entier aléatoire *****/
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

/***** Loi de Bernoulli *****/
function loiBernoulli(p){
    result = Math.random()

    console.log(result)

    if(result < p) {
        booleanBernoulli = true
    }else{
        booleanBernoulli = false
    }

    return booleanBernoulli
}


/***** Calculer le score final *****/
function finalScore(){

    //bloquer le button pour empêcher que le joueur joue après la fin du jeu
    //document.querySelector('.buttons').setAttribute('disabled', 'disabled')

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

    //affichage de la phrase de conclusion de la loi binomiale donc de la probabilité du requin d'avoir ce score
    nb_essai = turn
    valeur_success = (document.querySelector("input[name=shark-choices]:checked").value)/100
    nb_succes = turn-nb_zero
    label = document.querySelector("input[name=shark-choices]:checked").dataset.label

    if (label == 1){
        label = 'super rapide'
    }else if(label == 2){
        label = 'super (méga) rapide'
    }

    tour = (nb_essai > 1) ? ' tours' : ' tour'
    sentenceLoiBinomiale = document.querySelector('p#sentence-binomiale')
    sentenceLoiBinomiale.innerHTML = 'Le requin avait une probabilité de '+(LoiBinomiale(nb_essai,valeur_success,nb_succes)*100).toFixed(2)+'%, d\'avancer '+nb_succes+' fois de 2 cases, en '+nb_essai+tour+' en étant en mode '+label+' ('+valeur_success+' = valeur succès)'
}

/***** FAIRE AVANCER LE SOUS-MARIN ET LE REQUIN *****/

const sharkRiserAudio = new Audio('IMAC_S4_Maths/sounds/riser.mp3')
sharkRiserAudio.volume = 0.7
const sharkEndAudio = new Audio('IMAC_S4_Maths/sounds/shark_end.mp3')
sharkEndAudio.volume = 0.15
const winAudio = new Audio('IMAC_S4_Maths/sounds/win.mp3')
winAudio.volume = 0.2
const wheelAudio = new Audio('IMAC_S4_Maths/sounds/wheel_bubbles.mp3')
wheelAudio.volume = 0.7
const twinkleAudio = new Audio('IMAC_S4_Maths/sounds/twinkle.mp3')
twinkleAudio.volume = 0.05

turn = 0
nb_zero = 0

const elementShark = document.createElement('img')
elementShark.setAttribute('id', 'shark')
elementShark.setAttribute('src', 'img/requin.jpg')

const elementSubmarine = document.createElement('img')
elementSubmarine.setAttribute('id', 'submarine')
elementSubmarine.setAttribute('src', 'img/sousmarin.jpg')

document.querySelector('#parcours td[data-id="1"]').appendChild(elementShark)
document.querySelector('#parcours td[data-id="3"]').appendChild(elementSubmarine)

function sharkMove() {
    const sharkChoice = document.querySelector("input[name=shark-choices]:checked").value

    if(sharkChoice == 50){
        successOrNot = loiBernoulli(0.50)
    }
    else if(sharkChoice == 75){
        successOrNot = loiBernoulli(0.75)
    }  

    if(successOrNot == false){
        go_shark = 0
    }else if(successOrNot == true){
        go_shark = 2
        sharkRiserAudio.play()
    }

    return go_shark
}

function Deplacement(advance, go_shark) {

    shark = document.querySelector('#shark')
    sharkId = shark.parentElement.dataset.id

    submarine = document.querySelector('#submarine')
    submarineId = submarine.parentElement.dataset.id

    if(go_shark == 0){
        nb_zero++
    }

    go_submarine = parseInt(advance)

    sum_shark = parseInt(sharkId)+go_shark
    sum_submarine = parseInt(submarineId)+go_submarine

    if (turn<=5){
        turn++
        if(sum_shark==sum_submarine){
            modale('Game over')
            sharkRiserAudio.pause()
            sharkEndAudio.play()
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
                document.querySelector('#parcours td[data-id="'+sum_shark+'"]').appendChild(elementShark)
            }

            if(go_submarine != 0){
                document.querySelector('#parcours td[data-id="'+sum_submarine+'"]').appendChild(elementSubmarine)
            }
            createTableLine(turn,go_shark)

            if(turn == 5){
                modale('You win')
                sharkRiserAudio.pause()
                winAudio.play()
                finalScore()
            }
        }
        else{
            modale('Game over')
            sharkRiserAudio.pause()
            sharkEndAudio.play()
            createTableLine(turn,go_shark)
            finalScore()
        }
    }
}

/***** CALCULER LA PROBABILITÉ D'AVOIR CE NOMBRE DE SUCCÈS *****/

//Application de la loi binomiale
function LoiBinomiale(n,p,k){
    result = 0
    result = CoefficientBinomial(n,k) * Math.pow(p,k) * Math.pow((1 - p),(n-k))

    arrondi = result*10000;
    arrondi = Math.round(arrondi);
    arrondi = arrondi/10000;

    return arrondi
}

//Calcul du coefficient binomial
function CoefficientBinomial(n, k) {
    if ((typeof n !== 'number') || (typeof k !== 'number')) 
 return false; 
   var coeff = 1;
   for (var x = n-k+1; x <= n; x++) coeff *= x;
   for (x = 1; x <= k; x++) coeff /= x;
   return coeff;
}

/*
 ************
 ** SCRIPT **
 ************
*/

const ambiantAudio = new Audio('IMAC_S4_Maths/sounds/ambiant.mp3')
setTimeout(() => ambiantAudio.play(), 100)
modaleBienvenue();

// Récupération des éléments HTML
const wheel = document.getElementById('wheelSVG')
const startButton = document.getElementById('button-tourner')
const checkbox = document.getElementById('info')
const wheelNumbers = Array.from(document.getElementsByClassName("wheelNumbers"))
const slider = document.getElementById('wheelProbSlider')
const generatorButton = document.getElementById('close-modale')
const submarineColors = Array.from(document.getElementsByClassName("submarineColor"))

// Desactivation du bouton "tourner la roue" au début (tant que la roue n'est pas générée)
startButton.disabled = true

// Calcul aléatoire des couleurs du sous-marin
submarineColors.map(elt => elt.style.filter = `hue-rotate(${continuousUniformDistribution(0, 360)}deg)`)
elementSubmarine.style.filter = submarineColors[0].style.filter

// Définition des variables utiles
let wheelValues = 0
let INFO = true
checkbox.checked = true

// Différentes probabilités de test
const probasTest = [1/8, 1/8, 1/8, 1/8, 1/8, 1/8, 1/8, 1/8]
const pourcentTest = [4/100, 4/100, 4/100, 4/100, 5/100, 5/100, 4/100, 70/100]
let probFromSlider = getProbFromSlider(slider) // Probabilité à utiliser !!



/***** ECOUTEURS D'EVENEMENTS *****/

startButton.addEventListener('click', () => {
    startButton.style.pointerEvents = 'none';
    wheelValues = computeAngleAndValue(probFromSlider, wheelNumbers)
    wheel.style.transition = 'all 0.8s ease-out'
    wheel.style.transform = `rotate(${wheelValues.angle+360}deg)`
    wheelAudio.play()
})

wheel.addEventListener('transitionend', () => {
    // Fin de la roue tournante
    startButton.style.pointerEvents = 'auto';
    wheel.style.transition = 'none'
    wheel.style.transform = `rotate(${wheelValues.angle}deg)`

    const go_shark = sharkMove()

    // Joue un son si le sous-marin avance
    if (wheelValues.value > 0) twinkleAudio.play()

    // Animation des scores
    createScoreDiv(wheelValues.value, elementSubmarine)
    createScoreDiv(go_shark, elementShark)

    // Déplacements des entités
    startButton.disabled = true
    setTimeout(() => { 
        Deplacement(wheelValues.value, go_shark)
        Array.from(document.getElementsByClassName('scoreDiv')).map(item => item.parentNode.removeChild(item))
        startButton.disabled = false
    }, 800)
})

checkbox.addEventListener('click', () => {
    INFO = !INFO
})

slider.addEventListener('input', () => {
    probFromSlider = getProbFromSlider(slider)
})

submarineColors.map(elt => elt.addEventListener('click', () => {
    submarineColors.map(item => item.style.border = "none")
    elt.style.border = "solid 2px"
    elementSubmarine.style.filter = elt.style.filter
}))

generatorButton.addEventListener('click', () => {
    // Assigne à la roue des entiers : 0, 1 ou 2
    const wheelChoice = document.querySelector("input[name=wheel-choices]:checked").value
    const choice20 = [0.75, 0, 0.25]
    const choice10 = [0.35, 0.65, 0]
    const choice210 = [0.34, 0.33, 0.33]

    switch(wheelChoice) {
        case '20':
            wheelNumbers.map(item => {
                item.innerHTML = discreteDistribution(choice20) // Fonctionne uniquement avec cette méthode car on veut un 0, un 1 ou un 2 donc pas besoin d'étape supplémentaire
            })
            break
        case '10':
            wheelNumbers.map(item => {
                item.innerHTML = discreteDistribution(choice10) // Fonctionne uniquement avec cette méthode car on veut un 0, un 1 ou un 2 donc pas besoin d'étape supplémentaire
            })
            break
        case '210':
            wheelNumbers.map(item => {
                item.innerHTML = discreteDistribution(choice210) // Fonctionne uniquement avec cette méthode car on veut un 0, un 1 ou un 2 donc pas besoin d'étape supplémentaire
            })
            break
        default:
            wheelNumbers.map(item => {
                item.innerHTML = discreteDistribution(choice210) // Fonctionne uniquement avec cette méthode car on veut un 0, un 1 ou un 2 donc pas besoin d'étape supplémentaire
            })
    }
    startButton.disabled = false
    generatorButton.disabled = true
});
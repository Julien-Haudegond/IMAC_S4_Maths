const getProbFromSlider = (slider) => {
    const value = slider.value

    let probEven = ((100-value)/100)/4
    let probOdd = (value/100)/4
    const probFromSlider = [probEven, probOdd, probEven, probOdd, probEven, probOdd, probEven, probOdd]

    return probFromSlider
} 

// Fonction qui permet de générer un tableau répartissant les cases en fonction des probabilités données
const computeProbs = (probs) => {
    let sumProbs = new Array(probs.length)
    let sum = 0

    for(let i = 0; i < probs.length; ++i) {
        sum += probs[i]
        sumProbs[i] = sum
    }

    print(`Fonction computeProbs() :
        argument : ${probs.map(item => item.toFixed(3))}
        retour : ${sumProbs.map(item => item.toFixed(3))}`)
    return sumProbs
}

// Fonction qui permet de tirer au sort un événement
const getOneEventFromProbs = (probs) => {
    // Génération du tableau computeProbs
    const computedProbs = computeProbs(probs)

    // Sélection d'un nombre aléatoire compris entre 0 et 1 de manière uniforme
    const rand = Math.random()
    let eventIndex = 0

    // Parcours du tableau computeProbs pour trouver l'événement correspondant
    while(eventIndex < computedProbs.length && rand > computedProbs[eventIndex]) ++eventIndex

    print(`Fonction getOneEventFromProbs() :
        nombre aléatoire entre 0 et 1 choisi selon une loi uniforme : ${rand.toFixed(3)}
        n° de l'événement correspondant à ce tirage : case n°${eventIndex}`)
    return eventIndex
}
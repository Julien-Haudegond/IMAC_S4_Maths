// Loi uniforme continue
const continuousUniformDistribution = (a,b) => {
    return a + (b-a)*Math.random()
}

// Loi uniforme discrète
const discreteUniformDistribution = (a,b) => {
    return Math.floor(continuousUniformDistribution(a,b))
}

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

// Loi discrète qui dépend du tableau de probabilités passé en argument
const discreteDistribution = (probs) => {
    // Génération du tableau computeProbs
    const computedProbs = computeProbs(probs)

    // Sélection d'un nombre aléatoire compris entre 0 et 1 de manière uniforme (loi uniforme continue)
    const rand = continuousUniformDistribution(0,1)
    let eventIndex = 0

    // Parcours du tableau computeProbs pour trouver l'événement correspondant
    while(eventIndex < computedProbs.length && rand > computedProbs[eventIndex]) ++eventIndex

    print(`Fonction discreteDistribution() :
        nombre aléatoire entre 0 et 1 choisi selon une loi uniforme continue : ${rand.toFixed(3)}
        n° de l'événement correspondant à ce tirage par loi discrète : ${eventIndex}`)
    return eventIndex
}
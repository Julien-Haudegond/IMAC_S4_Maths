// Fonction à utiliser pour afficher des informations uniquement quand la checkbox INFO est cochée
const print = arg => {
    if(INFO) console.log(arg)
}

// Retourne 0, 1 ou 2 selon une loi uniforme
const getAnIntegerFrom0To2 = () => {
    const rd = Math.random()

    if (rd <= 0.33) return 0
    if (rd > 0.33 && rd <= 0.66) return 1
    else return 2
}
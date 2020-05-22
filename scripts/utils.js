// Fonction à utiliser pour afficher des informations uniquement quand la checkbox INFO est cochée
const print = arg => {
    if(INFO) console.log(arg)
}

const getIntegerFrom0To360 = () => {
    const rd = Math.random()
    return Math.min(rd*360)
}
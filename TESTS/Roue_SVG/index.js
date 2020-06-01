const getANumber = () => {
    const rd = Math.random()

    if (rd <= 0.33) return 0
    if (rd > 0.33 && rd <= 0.66) return 1
    else return 2
}

const numbers = document.getElementsByClassName("numbersOnWheel")

Array.from(numbers).map(item => {
    item.innerHTML = getANumber()
})

const myDiv = document.getElementById("Wheel")

//console.log(myDiv)
myDiv.style.transform = "rotate(45deg)"
//console.log(myDiv)


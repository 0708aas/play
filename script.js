const block = document.querySelector('.block')
const startBtn = document.querySelector('#startBtn')
const nextBtn = document.querySelector('#nextBtn')

const container = document.querySelector('.container')
const livesStr = document.querySelector('#lives')


let gameIsPaused = true

let curentLevel = 0

let lives = 3


startBtn.addEventListener('click', () => {
    gameIsPaused = false
    Array.from(block.children).forEach(it => {
        it.classList.remove('blue')
        it.classList.remove('red')
    })
})
level1 = [
    [0, 0, 0, 2, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 3, 0]
]


level2 = [
    [2, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0]
]

level3 = [
    [2, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 0, 1, 0],
    [0, 1, 0, 0, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0]
]
level4 = [
    [2, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0,],
    [0, 1, 0, 0, 0, 0, 0, 0, 0,],
    [0, 1, 1, 1, 1, 1, 1, 1, 0,],
    [0, 0, 0, 0, 0, 0, 0, 1, 0,],
    [0, 0, 0, 1, 1, 1, 1, 1, 0,],
    [0, 0, 0, 1, 0, 0, 0, 0, 0,],
    [0, 0, 0, 1, 0, 0, 0, 0, 0,],
    [0, 0, 0, 3, 0, 0, 0, 0, 0,]
]


const levels = {
    0: level1,
    1: level2,
    2: level3,
    3: level4
}


const gameOver = () => {
    if (!gameIsPaused) {
        --lives
        if (lives <= 0) {
            alert('вы проиграли')
            curentLevel = 0
            lives = 3
        }
        gameIsPaused = true
        fill()
    }
}


const setRed = (square) => {
    square.classList.add('red')
    square.addEventListener('mouseover', gameOver)

}

const setBlue = (square) => {
    square.classList.add('blue')

    square.addEventListener('mouseover', (e) => {
        e.stopPropagation()
        square.classList.add('blue')
    })
}
const startOne = (square) => {
    square.classList.add('start')
    square.addEventListener('mouseover', (e) => {
        e.stopPropagation()
        container.addEventListener('mouseover', gameOver, {once: true})
        document.querySelector('.finish').addEventListener('mouseover', (e) => {
            e.stopPropagation()
            curentLevel++
            block.textContent = `уровень ${curentLevel} пройден`
            block.classList.add('bac')
            nextBtn.hidden = false
            gameIsPaused = true
        })
    })
}

const finishOne = (square) => {
    square.classList.add('finish')
    square.textContent = 'f'
}

const fill = () => {
    block.innerHTML = ''
    livesStr.textContent = `lives ${lives}`
    levels[curentLevel].forEach(row => {
        row.forEach(it => {
            const square = document.createElement('div')
            const size = `${100 / levels[curentLevel].length}%`
            square.style.width = size
            square.style.height = size
            square.classList.add('border')
            if (it === 0) {
                setRed(square)
            } else if (it === 1) {
                setBlue(square)
            } else if (it === 2) {
                startOne(square)
            } else if (it === 3) {
                finishOne(square)
            }
            block.append(square)
        })
    })
}

fill()

nextBtn.addEventListener('click', () => {
    fill()
    nextBtn.hidden = true
})


const dif = document.querySelector('#dif')


dif.addEventListener('change', () => {
    Array.from(block.children).forEach(it => {
        if (dif.value === '1') {
            it.classList.add('border')
            block.style.cursor = 'default'
        } else if (dif.value === '2') {
            it.classList.remove('border')
            block.style.cursor = 'default'
        } else if (dif.value === '3') {
            it.classList.add('border')
            block.style.cursor = 'none'
        } else if (dif.value === '4') {
            it.classList.remove('border')
            block.style.cursor = 'none'

        }
    })
})

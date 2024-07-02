const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const restartButton = document.getElementById('restartButton')
const modeSelect = document.getElementById('modeSelect')
let circleTurn
let currentMode = modeSelect.value

startGame()

restartButton.addEventListener('click', startGame)
modeSelect.addEventListener('change', () => {
  currentMode = modeSelect.value
  startGame()
})

function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.innerText = ''
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  if (currentMode === 'ai' && !circleTurn) {
    setTimeout(makeAIMove, 500)
  }
}

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    if (currentMode === 'ai' && !circleTurn) {
      setTimeout(makeAIMove, 500)
    }
  }
}

function endGame(draw) {
  if (draw) {
    alert("Draw!")
  } else {
    alert(`${circleTurn ? "O's" : "X's"} Wins!`)
  }
  startGame()
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
  cell.innerText = currentClass === X_CLASS ? 'X' : 'O'
}

function swapTurns() {
  circleTurn = !circleTurn
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

function makeAIMove() {
  const emptyCells = [...cellElements].filter(cell => !cell.classList.contains(X_CLASS) && !cell.classList.contains(CIRCLE_CLASS))
  if (emptyCells.length === 0) return

  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
  const aiClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(randomCell, aiClass)
  if (checkWin(aiClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    if (currentMode === 'ai' && !circleTurn) {
      setTimeout(makeAIMove, 500)
    }
  }
}
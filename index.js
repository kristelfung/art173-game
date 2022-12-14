let idleSprite = null
let coinSprite = null
let enemySprite = null
let coinSound = null
let dieSound = null

let game = null
let startButton = null
let playAgainButton = null

function preload() {
  playerSprite = loadImage('player-sprite.png')
  coinSprite = loadImage('coin.png')
  enemySprite = loadImage('enemy-sprite.png')
  coinSound = loadSound('coin.wav')
  dieSound = loadSound('oof.wav')
}

function setup() {
  createCanvas(600, 600)
  frameRate(20)
  background(255)
  fill(0, 0, 0)
  textSize(32)
  text('blob: a game', 150, 200)
  startButton = createStartButton()
  playAgainButton = createPlayAgainButton()
  playAgainButton.hide()
  noLoop()
}

// Draw function is continuously called
function draw() {
  if (game != null && !game.isOver()) {
    background(255)
    // Timer and score
    fill(0, 0, 0)
    textSize(32);
    text('score: ' + game.getScore(), 10, 30)
    if (game.getTimer() <= 5) {
      fill(255, 0, 0)
    } else {
      fill(0, 0, 0)
    }
    textSize(32)
    text('time left: ' + game.getTimer(), 400, 30)
    game.updateStates()
  } else if (game != null && game.isOver()) {
    background(150)
    fill(0, 0, 0)
    textSize(32);
    text('game over!', 10, 30);
    text('score: ' + game.getScore(), 10, 70)
    playAgainButton.show()
    noLoop()
  }
}

function createStartButton() {
  const button = createButton('start')
  button.mousePressed(startGame)
  return button
}

function createPlayAgainButton() {
  const button = createButton('play again')
  button.mousePressed(startGame)
  return button
}

function startGame() {
  game = new Game(playerSprite, coinSprite, enemySprite, coinSound, dieSound)
  game.init()
  startButton.hide()
  playAgainButton.hide()
  loop()
}
let idleSprite
let coinSprite
let enemySprite

let game

function preload() {
  playerSprite = loadImage('player-sprite.png')
  coinSprite = loadImage('coin.png')
  enemySprite = loadImage('enemy-sprite.png')
}

function setup() {
  createCanvas(600, 600)
  frameRate(20)

  game = new Game(playerSprite, coinSprite, enemySprite)
  game.init()
}

// Draw function is continuously called
function draw() {
  if (!game.isOver()) {
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
  } else {
    background(150)
    fill(0, 0, 0)
    textSize(32);
    text('game over!', 10, 30);
    text('score: ' + game.getScore(), 10, 70)
  }
}
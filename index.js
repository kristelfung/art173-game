let idleSprite
let coinSprite
let gameOver = false
let score = 0

function preload() {
  idleSprite = loadImage('idle-sprite.png')
  coinSprite = loadImage('coin.png')
}

function setup() {
  createCanvas(600, 600)
  frameRate(20)
  
  // Load in sprite images
  let numImgs = 4
  let imgSize = 100
  let idleFrames = []
  for (let i = 0; i < numImgs; i++) {
    idleFrames[i] = idleSprite.get(i * imgSize, 0, imgSize, imgSize)
  }

  playerX = 100
  playerY = 100
  player = new PlayerSprite(idleFrames, playerX, playerY, imgSize)

  let coinSize = 50
  coinX = 400
  coinY = 400
  coin = new CoinSprite(coinSprite, coinX, coinY, coinSize)
}

// Draw function is continuously called
function draw() {
  if (!gameOver) {
    background(255)
    textSize(32);
    text('score: ' + score, 20, 40)
    player.render()
    player.animate()
    coin.render()
    handleMove()
    checkDeath()
  } else {
    background(150)
    textSize(32);
    text('you died...', 10, 30);
  }
}

function handleMove() {
  if (keyIsDown(LEFT_ARROW) && player.pos.x > 0) {
    player.move(-15, 0)
  }
  if (keyIsDown(RIGHT_ARROW) && player.pos.x < 500) {
    player.move(15, 0)
  }
  if (keyIsDown(UP_ARROW) && player.pos.y > 0) {
    player.move(0, -15)
  }
  if (keyIsDown(DOWN_ARROW) && player.pos.y < 500) {
    player.move(0, 15)
  }
}

function checkDeath() {
  if (player.pos.y < 0) {
    gameOver = true
  }
}
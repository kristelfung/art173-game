let idleSprite
let coinSprite
let enemySprite
let enemies = [null, null, null]
let gameOver = false
let score = 0
let timer = 30

function preload() {
  idleSprite = loadImage('idle-sprite.png')
  coinSprite = loadImage('coin.png')
  enemySprite = loadImage('enemy-sprite.png')
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

  // Create first enemy here
  generateEnemies(enemies)
}

// Draw function is continuously called
function draw() {
  if (!gameOver) {
    background(255)

    // Timer and score
    fill(0, 0, 0)
    textSize(32);
    text('score: ' + score, 10, 30)
    
    if (timer <= 5) {
      fill(255, 0, 0)
    } else {
      fill(0, 0, 0)
    }
    textSize(32)
    text('time left: ' + timer, 400, 30)

    // Player
    player.render()
    player.animate()

    // Coin
    coin.render()
    if (coin.checkCollision(player)) {
      score += 1
    }

    // Enemies
    for (let i = 0; i < 3; i++) {
      enemies[i].render()
      enemies[i].animate()
      enemies[i].move()
      if (enemies[i].checkCollision(player)) {
        gameOver = true
      }
    }

    // Game functions
    countdown()
    handleMove()
    checkEnemies()
    checkDeath()
  } else {
    background(150)
    fill(0, 0, 0)
    textSize(32);
    text('game over!', 10, 30);
    text('score: ' + score, 10, 70)
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

function countdown() {
  if (frameCount % 20 == 0 && timer > 0) {
    timer -= 1
  }
}

function generateEnemies(enemies) {
  for (let i = 0; i < 3; i++) {
    enemies[i] = generateOneEnemy()
  }
}

function generateOneEnemy() {
  let numEnemyImgs = 4
  let enemySize = 100
  enemyFrames = []

  // Create enemy in specified side
  for (let i = 0; i < numEnemyImgs; i++) {
    enemyFrames[i] = enemySprite.get(i * enemySize, 0, enemySize, enemySize)
  }
  return new EnemySprite(enemyFrames, enemySize)
}

function checkEnemies() {
  for (let i = 0; i < 3; i++) {
    if (enemies[i].outOfBounds()){
      enemies[i].spawn()
    }
  }
}

function checkDeath() {
  if (timer == 0) {
    gameOver = true
  }
}
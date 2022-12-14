const STARTING_SCORE = 0
const STARTING_TIMER = 20

const TOTAL_ENEMIES = 5

class Game {
  constructor(playerSprite, coinSprite, enemySprite, coinSound, dieSound) {
    this.playerSprite = playerSprite
    this.coinSprite = coinSprite
    this.enemySprite = enemySprite
    this.coinSound = coinSound
    this.dieSound = dieSound

    this.enemies = [null * TOTAL_ENEMIES]
    this.player = null
    this.coin = null
    this.gameOver = null
    this.score = null
    this.timer = null
  }

  init() {
    this._initPlayer()
    this._initCoin()
    this._initEnemies()

    this.gameOver = false
    this.score = STARTING_SCORE
    this.timer = STARTING_TIMER
  }

  _initPlayer() {
    // Load Player sprite
    let numPlayerImgs = 4
    let playerSize = 100
    let playerFrames = []
    for (let i = 0; i < numPlayerImgs; i++) {
      playerFrames[i] = this.playerSprite.get(i * playerSize, 0, playerSize, playerSize)
    }
    let playerX = 100
    let playerY = 100
    this.player = new PlayerSprite(playerFrames, playerX, playerY, playerSize)
  }

  _initCoin() {
    let coinSize = 50
    let coinX = 400
    let coinY = 400
    this.coin = new CoinSprite(this.coinSprite, coinX, coinY, coinSize)
  }

  _initEnemies() {
    for (let i = 0; i < TOTAL_ENEMIES; i++) {
      this.enemies[i] = this._generateOneEnemy()
    }
  }
  
  _generateOneEnemy() {
    let numEnemyImgs = 4
    let enemySize = 100
    let enemyFrames = []

    // Create enemy in specified side
    for (let i = 0; i < numEnemyImgs; i++) {
      enemyFrames[i] = this.enemySprite.get(i * enemySize, 0, enemySize, enemySize)
    }
    return new EnemySprite(enemyFrames, enemySize)
  }
  
  updateStates() {
    // Player
    this.player.render()
    this.player.animate()

    // Coin
    this.coin.render()
    if (this.coin.checkCollision(this.player)) {
      this.coinSound.play()
      this.score += 1
    }

    // Enemies
    for (let i = 0; i < TOTAL_ENEMIES; i++) {
      this.enemies[i].render()
      this.enemies[i].animate()
      this.enemies[i].move()
      if (this.enemies[i].checkCollision(this.player)) {
        this.dieSound.play()
        this.gameOver = true
      }
    }

    // Game states
    this.countdown()
    this.handleMove()
    this.checkEnemies()
    this.checkDeath()
  }

  countdown() {
    if (frameCount % 20 == 0 && this.timer > 0) {
      this.timer -= 1
    }
  }

  handleMove() {
    if (keyIsDown(LEFT_ARROW) && this.player.pos.x > 0) {
      this.player.move(-15, 0)
    }
    if (keyIsDown(RIGHT_ARROW) && this.player.pos.x < 500) {
      this.player.move(15, 0)
    }
    if (keyIsDown(UP_ARROW) && this.player.pos.y > 0) {
      this.player.move(0, -15)
    }
    if (keyIsDown(DOWN_ARROW) && this.player.pos.y < 520) {
      this.player.move(0, 15)
    }
  }

  checkEnemies() {
    for (let i = 0; i < TOTAL_ENEMIES; i++) {
      if (this.enemies[i].outOfBounds()){
        this.enemies[i].spawn()
      }
    }
  }
  
  checkDeath() {
    if (this.timer == 0) {
      this.gameOver = true
    }
  }

  isOver() {
    return this.gameOver
  }

  getScore() {
    return this.score
  }

  getTimer() {
    return this.timer
  }
}
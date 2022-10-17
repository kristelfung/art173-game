class EnemySprite {
  constructor(idleFrames, size) {
    this.idleFrames = idleFrames
    this.frameInd = 0
    this.size = size
    this.pos = createVector(0, 0)
    this.vel = createVector(0, 0)
    this.spawnPoint = null
    this.spawn()
  }

  render() {
    image(this.idleFrames[this.frameInd], this.pos.x, this.pos.y, this.size, this.size)
  }
  
  animate() {
    this.frameInd = (this.frameInd + 1) % this.idleFrames.length
  }

  move() {
    if (this.spawnPoint === 'top') { // Go to bottom
      this.vel = createVector(0, 10)
    } else if (this.spawnPoint === 'bottom') { // Go to top
      this.vel = createVector(0, -10)
    } else if (this.spawnPoint === 'left') { // Go to right
      this.vel = createVector(10, 0)
    } else { // this.spawnPoint === 'right,  Go to left
      this.vel = createVector(-10, 0)
    }
    this.pos.add(this.vel)
  }

  outOfBounds() {
    if (this.pos.x < -100) {
      return true
    }
    if (this.pos.x > 700) {
      return true
    }
    if (this.pos.y < -100) {
      return true
    }
    if (this.pos.y > 700) {
      return true
    }
    return false
  }

  spawn() {
    let enemyX
    let enemyY
    let side = ['top', 'bottom', 'left', 'right']
    const randInd = Math.floor(Math.random() * side.length)
    this.spawnPoint = side[randInd]
    if (side[randInd] === 'top') {
      enemyX = Math.random() * 600
      enemyY = -100
    } else if (side[randInd] === 'bottom') {
      enemyX = Math.random() * 600
      enemyY = 600
    } else if (side[randInd] === 'left') {
      enemyX = -100
      enemyY = Math.random() * 600
    } else { // 'right
      enemyX = 600
      enemyY = Math.random() * 600
    }
    this.pos = createVector(enemyX, enemyY)
  }
}
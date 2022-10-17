class EnemySprite {
  constructor(idleFrames, x, y, size, spawnPoint) {
    this.idleFrames = idleFrames
    this.frameInd = 0
    this.size = size
    this.pos = createVector(x, y)
    this.vel = createVector(0, 0)
    this.spawnPoint = spawnPoint
    console.log(this.spawnPoint)
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
}
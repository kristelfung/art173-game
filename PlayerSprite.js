class PlayerSprite {
    constructor(idleFrames, x, y, size) {
      this.idleFrames = idleFrames
      this.frameInd = 0
      this.size = size
      this.pos = createVector(x, y)
      this.vel = createVector(0, 0)
      this.acc = createVector(0, 0)
      this.friction = 0.8
    }
    
    render() {
      image(this.idleFrames[this.frameInd], this.pos.x, this.pos.y, this.size, this.size)
    }
    
    animate() {
      this.frameInd = (this.frameInd + 1) % this.idleFrames.length
    }
  }
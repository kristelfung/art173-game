class PlayerSprite {
    constructor(idleFrames, x, y, size) {
      this.idleFrames = idleFrames
      this.frameInd = 0
      this.size = size
      this.pos = createVector(x, y)
      this.vel = createVector(0, 0)
      this.acc = createVector(0, 0)
      // this.friction = 0.5
    }
    
    render() {
      image(this.idleFrames[this.frameInd], this.pos.x, this.pos.y, this.size, this.size)
    }
    
    animate() {
      if (keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW) || keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW)) {
        this.frameInd = (this.frameInd + 1) % this.idleFrames.length
      } else {
        this.frameInd = 0
      }
    }

    move(x, y) {
      this.acc.add(x, y)
      this.vel.add(this.acc)
      this.pos.add(this.vel)
      this.acc.mult(0)
      this.vel.mult(0)
    }
  }
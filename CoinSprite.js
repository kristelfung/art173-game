class CoinSprite {
  constructor(img, x, y, size) {
    this.img = img
    this.pos = createVector(x, y)
    this.size = size
  }

  render() {
    image(this.img, this.pos.x, this.pos.y, this.size, this.size)
  }

  checkCollision(player) {
    const d = this.pos.dist(player.pos)
    if (d < this.size + player.size / 2) {
      this._respawnCoin(player)
      return true
    }
    return false
  }

  _respawnCoin(player) {
    let quadrant = this._findQuadrant(player)
    if (quadrant === 1) {
      const range = [2, 3, 4]
      const randInd = Math.floor(Math.random() * range.length)
      this._generateCoinInQuadrant(range[randInd])
    } else if (quadrant === 2) {
      const range = [1, 3, 4]
      const randInd = Math.floor(Math.random() * range.length)
      this._generateCoinInQuadrant(range[randInd])
    } else if (quadrant === 3) {
      const range = [1, 2, 4]
      const randInd = Math.floor(Math.random() * range.length)
      this._generateCoinInQuadrant(range[randInd])
    } else {
      const range = [1, 2, 3]
      const randInd = Math.floor(Math.random() * range.length)
      this._generateCoinInQuadrant(range[randInd])
    }
  }

  _findQuadrant(player) {
    if (player.pos.x > 300 && player.pos.y < 300) {
      return 1
    } else if (player.pos.x < 300 && player.pos.y < 300) {
      return 2
    } else if (player.pos.x < 300 && player.pos.y >= 300) {
      return 3
    } else {
      return 4
    }
  }

  _generateCoinInQuadrant(quadrant) {
    if (quadrant === 1) {
      this.pos.x = Math.random() * 300 + 300
      this.pos.y = Math.random() * 300
    } else if (quadrant === 2) {
      this.pos.x = Math.random() * 300
      this.pos.y = Math.random() * 300
    } else if (quadrant === 3) {
      this.pos.x = Math.random() * 300
      this.pos.y = Math.random() * 300 + 300
    } else {
      this.pos.x = Math.random() * 300 + 300
      this.pos.y = Math.random() * 300 + 300
    }
  }
}
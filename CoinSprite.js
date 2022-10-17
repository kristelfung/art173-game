class CoinSprite {
  constructor(img, x, y, size) {
    this.img = img
    this.pos = createVector(x, y)
    this.size = size
  }

  render() {
    image(this.img, this.pos.x, this.pos.y, this.size, this.size)
  }
}
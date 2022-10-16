let idleSprite

function preload() {
  idleSprite = loadImage('hotdog-sprite.png')
}

function setup() {
  createCanvas(1280, 720)
  frameRate(15)
  
  // Load in sprite images
  let idleFrames = []
  let numImgs = 5
  let imgSize = 100
  for (let i = 0; i < numImgs; i++) {
    idleFrames[i] = idleSprite.get(i * imgSize, 0, imgSize, imgSize)
  }
  player = new PlayerSprite(idleFrames, width/2 - 100, height/2 - 100, imgSize)
}

// Draw function is continuously called
function draw() {
  background(255)
  player.render()
  player.animate()
}
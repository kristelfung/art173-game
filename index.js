let idleSprite
// let leftSprite
// let rightSprite

function preload() {
  idleSprite = loadImage('idle-sprite.png')
  // leftSprite = loadImage('left-sprite.png')
  // rightSprite = loadImage('right-sprite.png')
}

function setup() {
  createCanvas(1280, 720)
  frameRate(20)
  
  // Load in sprite images
  let numImgs = 4
  let imgSize = 100
  
  // Load idle sprite 
  let idleFrames = []
  for (let i = 0; i < numImgs; i++) {
    idleFrames[i] = idleSprite.get(i * imgSize, 0, imgSize, imgSize)
  }

  // // Load left sprite
  // let leftFrames = []
  // for (let i = 0; i < numImgs; i++) {
  //   leftFrames[i] = leftSprite.get(i * imgSize, 0, imgSize, imgSize)
  // }

  // // Load right sprite 
  // let rightFrames = []
  // for (let i = 0; i < numImgs; i++) {
  //   rightFrames[i] = rightSprite.get(i * imgSize, 0, imgSize, imgSize)
  // }

  xStart = 600
  yStart = 400
  player = new PlayerSprite(idleFrames, xStart, yStart, imgSize)
}

// Draw function is continuously called
function draw() {
  background(255)
  player.render()
  player.animate()
  handleMove()
}

function handleMove() {
  if (keyIsDown(LEFT_ARROW) && player.pos.x > 0) {
    player.move(-15, 0)
  }
  console.log(player.pos.y)
  if (keyIsDown(RIGHT_ARROW) && player.pos.x < 1280 - 100) {
    player.move(15, 0)
  }
  if (keyIsDown(UP_ARROW) && player.pos.y > 0) {
    player.move(0, -15)
  }
  if (keyIsDown(DOWN_ARROW) && player.pos.y < 600) {
    player.move(0, 15)
  }
}
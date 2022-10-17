let idleSprite
let gameOver = false

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

  xStart = 600
  yStart = 400
  player = new PlayerSprite(idleFrames, xStart, yStart, imgSize)
}

// Draw function is continuously called
function draw() {
  if (!gameOver) {
    background(255)
    player.render()
    player.animate()
    handleMove()
    checkDeath()
  } else {
    background(150)
    textSize(32);
    text('you died...', 10, 30);
  }
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

function checkDeath() {
  if (player.pos.y < 0) {
    gameOver = true
  }
}
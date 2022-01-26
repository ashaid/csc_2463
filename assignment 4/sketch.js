//Creating animations from sprite sheets
let bugAnimation;
let bugAnimation2;
let bugAnimation3;
let bugAnimation4;
let squashAnimation;

let bugSpriteSheet;
let bugSquashSpriteSheet;

let score = 0;
let startTime = 30;
let timerIsDone;
let gameState;

let velocity = 3;

let sprites = ["assets/bug-sprite-sheet.png", "assets/bug-dead-sprite.png"];

function preload() {
  // pre load sprite sheets with width, height, and length of animation
  bugSpriteSheet = loadSpriteSheet(sprites[0], 16, 16, 9);
  bugSquashSpriteSheet = loadSpriteSheet(sprites[1], 16, 16, 1);

  bugAnimation = loadAnimation(bugSpriteSheet);
  bugAnimation2 = loadSpriteSheet(sprites[0], 16, 16, 8);
  bugAnimation3 = loadSpriteSheet(sprites[0], 16, 16, 7);
  bugAnimation4 = loadSpriteSheet(sprites[0], 16, 16, 6);
  squashAnimation = loadAnimation(bugSquashSpriteSheet);
}

function setup() {
  createCanvas(800, 800);
  gameState = 1;
  bugs = new Group();
  // create the sprites with the x and y position with width
  // setupBugs(100, 100, 80);
  makeBugs();
}

function draw() {
  // clear();
  background("grey");
  if (gameState == 1) {
    text("Score: " + score, 10, 15);
    text("Time Left: " + (startTime - timer()), 10, 60);
    for (let i = 0; i < bugs.length; i++) {
      let c = bugs[i];
      if (c.position.x >= width - c.width / 2) {
        c.velocity.x = -velocity;
        c.rotation = -90;
      } else if (c.position.x <= 0 + c.width / 2) {
        c.velocity.x = velocity;
        c.rotation = 90;
      } else if (c.position.y >= height - c.height / 2) {
        c.velocity.y = -velocity;
        c.rotation = 0;
      } else if (c.position.y <= 0 + c.height / 2) {
        c.velocity.y = velocity;
        c.rotation = 180;
      }
      if (timerIsDone == true) {
        removeSprite();
        gameState == 0;
      }
    }
    drawSprites();
  }
}

function makeBugs() {
  for (let i = 0; i < 50; i++) {
    let newBug = createSprite(random(800), random(800), 16);
    if (i % 5 == 0) {
      newBug.addAnimation("walk", bugAnimation4);
      newBug.setSpeed(random(velocity), 0);
      newBug.rotation = 90;
    } else if (i % 2 == 0) {
      newBug.addAnimation("walk", bugAnimation);
      newBug.setSpeed(random(velocity), 90);
      newBug.rotation = 180;
    } else if (i % 3 == 0) {
      newBug.addAnimation("walk", bugAnimation2);
      newBug.rotation = -90;
      newBug.setSpeed(random(velocity), 180);
    } else {
      newBug.addAnimation("walk", bugAnimation3);
      newBug.setSpeed(random(velocity), 270);
      newBug.rotation = 0;
    }
    newBug.addAnimation("squash", squashAnimation);
    newBug.isSquish = false;
    newBug.scale = 3;
    newBug.addToGroup(bugs);

    newBug.onMouseReleased = () => {
      newBug.changeAnimation("squash");
      newBug.velocity.x = 0;
      newBug.velocity.y = 0;

      if (newBug.isSquish == false) {
        score++;
        newBug.isSquish = true;
        velocity = velocity + 0.5;
      }
    };
  }
}

function timer() {
  time = int((millis() - startTime) / 1000);
  if (time > startTime) {
    timerIsDone = true;
  }
  return time;
}

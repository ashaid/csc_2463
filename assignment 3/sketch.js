//Creating animations from sprite sheets
var sprite_sheet_image;
var sprite_sheet;
var walk_animation;
let stand_animation;
let character_sprite;

let sprites = ["assets/guy.png", "assets/robot.png", "assets/ninja.png"];
let loadedWalkArr = [];
let loadedStandArr = [];

function preload() {
  // pre load sprite sheets with width, height, and length of animation
  preSprite(sprites, 80, 80, 9);
}

function setup() {
  createCanvas(800, 800);
  chars = new Group();
  // create the sprites with the x and y position with width
  setupSprite(100, 100, 80);
}

function draw() {
  clear();
  // for each character in the group control it with arrow keys
  for (let i = 0; i < chars.length; i++) {
    let c = chars[i];
    if (keyDown("LEFT_ARROW")) {
      c.changeAnimation("walk");
      // flip
      c.mirrorX(-1);
      // move left
      c.velocity.x = -3;
    } else if (keyDown("RIGHT_ARROW")) {
      c.changeAnimation("walk");
      // flip
      c.mirrorX(1);
      // move left
      c.velocity.x = 3;
    } else {
      c.changeAnimation("stand");
      c.velocity.x = 0;
    }
  }

  drawSprites();
}

function preSprite(sprites, x, y, ani) {
  // for each sprite image load the walking and standing animations into an array
  for (let i = 0; i < sprites.length; i++) {
    loadedStandArr.push(loadAnimation(loadSpriteSheet(sprites[i], x, y, 1)));
    loadedWalkArr.push(loadAnimation(loadSpriteSheet(sprites[i], x, y, ani)));
  }
}

function setupSprite(x, y, w) {
  // for each sprite image add sprite to group
  for (let i = 0; i < sprites.length; i++) {
    // let newChar = createSprite(x, y + 100 * i, w); // uncomment if you want sprites spaced evenly
    let newChar = createSprite(random(200, 500), random(200, 500), w);
    newChar.addAnimation("walk", loadedWalkArr[i]);
    newChar.addAnimation("stand", loadedStandArr[i]);
    newChar.addToGroup(chars);
  }
}

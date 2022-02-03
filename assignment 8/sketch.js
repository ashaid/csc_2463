let bugAnimation;
let bugAnimation2;
let bugAnimation3;
let bugAnimation4;
let squashAnimation;

let bugSpriteSheet;
let bugSquashSpriteSheet;

let canvas;
let bugClicked = true;

let score = 0;
let startTime = 30;
let time;
let timerIsDone;
let gameState;
let startGame;
let restartGame;

let velocity = 3;
let endCount = 0;

let sprites = ["assets/bug-sprite-sheet.png", "assets/bug-dead-sprite.png"];
let sounds = {
  pop: "assets/pop.mp3",
  crush: "assets/crush.mp3",
  over: "assets/over.mp3",
};
let multiplayer;

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
  clear();
  canvas = createCanvas(windowWidth, windowHeight);
  timerIsDone = false;
  setupSound();

  startGame = createButton("start");
  startGame.position(width / 2, height / 2);

  restartGame = createButton("restart");
  restartGame.position(width / 2, height / 2);
  restartGame.mousePressed(() => {
    restartGame.remove();
    gameState = "start";

    setup();
  });
  restartGame.hide();
  gameState = "start";
  velocity = 3;
  bugs = new Group();
  makeBugs();
}

function draw() {
  background("lightBlue");
  if (gameState === "play") {
    timer();
    startGame.hide();
    text("Score: " + score, 10, 15);
    text(30 - timer(), 10, 60);
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
      // set bpm and proability based on velocity
      Tone.Transport.bpm.value = velocity * 50;
      sequence.probability = 1 - velocity / 100;
    }
    // once time runs out
    if (timerIsDone == true) {
      gameState = "end";
    }
    drawSprites(bugs);
  } else if (gameState === "start") {
    endCount = 0;
    startGame.mousePressed(() => {
      Tone.start();
      Tone.Transport.start();
      Tone.Transport.bpm.value = 120;
      sequence.probability = 1;
      sequence.start();
      gameState = "play";

      startTime = millis();
    });
  } else if (gameState === "end") {
    restartGame.show();
    bugs.removeSprites();
    sequence.stop();
    textSize(40);
    text("Score: " + score, 300, 300);
    text("BPM: " + Tone.Transport.bpm.value.toFixed(1), 300, 400);
    text("Sequence Probability: " + sequence.probability.toFixed(1), 300, 500);
    endSound();
  }
}

function makeBugs() {
  for (let i = 0; i < 50; i++) {
    let newBug = createSprite(random(windowWidth), random(windowHeight), 16);
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
    newBug.mouseActive = true;
    newBug.setDefaultCollider();

    newBug.addToGroup(bugs);

    newBug.onMouseReleased = () => {
      newBug.changeAnimation("squash");
      bugClicked = true;
      newBug.velocity.x = 0;
      newBug.velocity.y = 0;

      if (newBug.isSquish == false) {
        newBug.isSquish = true;
        multiplayer.player("crush").stop();
        score++;
        multiplayer.player("crush").start();

        velocity = velocity + 0.3;
      }
    };
  }
}

function timer() {
  time = int((millis() - startTime) / 1000);
  if (time > 30) {
    timerIsDone = true;
  }
  return time;
}

function setupSound() {
  var scor = [
    ["E4", "G4"],
    "A4",
    [["E4", "G4"], "A4"],
    [("E4", "B4")],
    "F4",
    ["D5", "C5"],
    "B4",
  ];
  // create synth
  synth = new Tone.PolySynth().toDestination();

  sequence = new Tone.Sequence(
    (time, note) => {
      synth.triggerAttackRelease(note, "8n", time);
    },
    scor,
    1
  );

  Tone.Transport.start();

  multiplayer = new Tone.Players(sounds);
  env = new Tone.FeedbackDelay();
  multiplayer.chain(env, Tone.Master);
  env.wet.value = 0;
}

function endSound() {
  if (endCount == 0) {
    // add more feedback the more bugs clicked
    env.wet.value = (score * 2) / 100;
    multiplayer.player("over").start();
    endCount++;
  }
}

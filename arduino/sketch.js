// youtube link:

// arduino vars
let serial;
let bright;
let latestData = "waiting for data";
let joyX;
let joyY;
let joySW;
let button1;
let button1Down = 0;
let button2;
let button2Down = 0;
let button3;
let button3Down = 0;

// gradient vars
const redX = 512;
const redY = 1023;
const greenX = 1023;
const greenY = 0;
const blueX = 0;
const blueY = 0;

// music vars
let synth;
let keyDisplay = [];
let notes = {};
const octOne = {
  but1: "C3",
  but2: "D3",
  but3: "E3",
};
const octTwo = {
  but1: "C4",
  but2: "D4",
  but3: "E4",
};
const octThree = {
  but1: "C5",
  but2: "D5",
  but3: "E5",
};

let filter;

function preload() {}

function setup() {
  createCanvas(windowWidth, windowHeight);

  serial = new p5.SerialPort();
  serial.list();
  serial.open("COM3");
  serial.on("connected", serverConnected);
  serial.on("list", gotList);
  serial.on("data", gotData);
  serial.on("error", gotError);
  serial.on("open", gotOpen);
  serial.on("close", gotClose);

  // create synth
  synth = new Tone.PolySynth();
  Tone.Transport.start();
  filter = new Tone.AutoPanner().start();

  synth.chain(filter, Tone.Destination);
  textSize(width / 6);
  textAlign(CENTER, CENTER);

  clear();
}

function draw() {
  background("lightBlue");
  setGradient();
  getOctave();
  getFilter();
  fill("black");
  if (!button1Down && button1 == 0) {
    button1Down = 1;
  }
  if (button1Down && button1) {
    button1Down = 0;
    playNote("but1");
  }
  if (!button2Down && button2 == 0) {
    button2Down = 1;
  }
  if (button2Down && button2) {
    button2Down = 0;
    playNote("but2");
  }
  if (!button3Down && button3 == 0) {
    button3Down = 1;
  }
  if (button3Down && button3) {
    button3Down = 0;
    playNote("but3");
  }
  text(keyDisplay, windowWidth / 2, windowHeight / 2);
}

function getFilter() {
  // console.log(joyY);
  // console.log(Math.round((joyX / 1023) * 100) / 100);
  // Tone.Master.oscillator.frequency.value = joyX || 0;
  filter.frequency.value = Math.round((joyX / 1023) * 100) / 100 || 0;
}

function playNote(key) {
  for (const [keyInNotes, note] of Object.entries(notes)) {
    if (key == keyInNotes) {
      synth.triggerAttackRelease(note, "8n");
      keyDisplay.push(note);
      setTimeout(function () {
        keyDisplay = keyDisplay.filter((item) => item !== note);
      }, 500);
    }
  }
}

function getOctave() {
  if (joyY < 337) {
    notes = octOne;
  } else if (joyY > 337 && joyY < 674) {
    notes = octTwo;
  } else if (joyY > 674) {
    notes = octThree;
  }
}

function setGradient() {
  let distanceRed = Math.sqrt(
    Math.pow(Math.abs(redX - joyX), 2) + Math.pow(Math.abs(redY - joyY), 2)
  );
  let distanceGreen = Math.sqrt(
    Math.pow(Math.abs(greenX - joyX), 2) + Math.pow(Math.abs(greenY - joyY), 2)
  );
  let distanceBlue = Math.sqrt(
    Math.pow(Math.abs(blueX - joyX), 2) + Math.pow(Math.abs(blueY - joyY), 2)
  );

  let brightRed = 255 - constrain(map(distanceRed, 0, 1023, 0, 255), 0, 255);
  let brightGreen =
    255 - constrain(map(distanceGreen, 0, 1023, 0, 255), 0, 255);
  let brightBlue = 255 - constrain(map(distanceBlue, 0, 1023, 0, 255), 0, 255);

  c1 = color(brightRed, brightGreen, brightBlue);

  // noFill();
  fill(c1);
  rect(windowWidth / 4, windowHeight / 4, windowWidth / 2, windowHeight / 2);
}

function light() {
  bright = 225;
  serial.write(bright);
  console.log(bright);
}

function dark() {
  bright = 0;
  serial.write(bright);
  console.log(bright);
}

function serverConnected() {
  print("Connected to Server");
}

function gotList(thelist) {
  print("List of Serial Ports:");

  for (let i = 0; i < thelist.length; i++) {
    print(i + " " + thelist[i]);
  }
}

function gotOpen() {
  print("Serial Port is Open");
}

function gotClose() {
  print("Serial Port is Closed");
  latestData = "Serial Port is Closed";
}

function gotError(theerror) {
  print(theerror);
}

function gotData() {
  let currentString = serial.readLine();
  trim(currentString);
  if (!currentString) return;
  latestData = currentString;

  let splitString = split(latestData, ",");
  joyX = int(splitString[0]);
  joyY = int(splitString[1]);
  button1 = int(splitString[2]);
  button2 = int(splitString[3]);
  button3 = int(splitString[4]);

  console.log(latestData);
}

let button;
let slider;
let synth;
let keyDisplay = [];

const notes = {
  q: "C4",
  2: "C#4",
  w: "D4",
  3: "D#4",
  e: "E4",
  r: "F4",
  5: "F#4",
  t: "G4",
  6: "G#4",
  y: "A4",
  7: "A#4",
  u: "B4",
  i: "C5",
};

function setup() {
  createCanvas(500, 500);
  background("blue");

  var score = [
    "C4",
    "G4",
    ["F4", "E4", "D4"],
    "C5",
    "G4",
    ["F4", "E4", "F4"],
    "D4",
  ];

  // create synth
  synth = new Tone.PolySynth().toDestination();

  sequence = new Tone.Sequence(
    (time, note) => {
      synth.triggerAttackRelease(note, "8n", time);
    },
    score,
    1
  );

  startPart = createButton("start sequence")
    .position(50, 80)
    .mousePressed(() => {
      Tone.start();
      sequence.start();
    });

  stopPart = createButton("stop sequence")
    .position(50, 100)
    .mousePressed(() => sequence.stop());

  Tone.Transport.start();

  probability = createSlider(0, 1, 1, 0).position(50, 120);
  slider = createSlider(40, 200, 120, 0);
  slider.position(50, 60);
}

function draw() {
  clear();
  background("lightblue");

  textSize(64);
  text(keyDisplay, 20, 250);

  textSize(8);
  text("keyboard is mapped as " + JSON.stringify(notes, null, 4), 20, 300);

  textSize(16);

  Tone.Transport.bpm.value = slider.value();
  text("BPM " + Tone.Transport.bpm.value.toFixed(0), 45, 50);

  text("Sequence probability " + sequence.probability.toFixed(1), 45, 140);
  sequence.probability = probability.value();
}

function keyPressed() {
  for (const [keyInNotes, note] of Object.entries(notes)) {
    if (key == keyInNotes) {
      synth.triggerAttack(note);
      keyDisplay.push(note.replace("4", ""));
    }
  }
}

function keyReleased(key) {
  for (const [keyInNotes, note] of Object.entries(notes)) {
    if (key.key == keyInNotes) {
      keyDisplay = keyDisplay.filter((item) => item !== note.replace("4", ""));
      synth.triggerRelease(note);
    }
  }
}

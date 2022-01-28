/* PDM Course: Sound Unit

  schedule
  scheduleRepeat
*/

var synth;
var start;
var stop;
var pause;
var slider;
var startPart;
var chord;
var probability;

function setup() {
  createCanvas(600, 600);
  synth = make_poly().instrument;

  // the more items in the array the shorter their
  // duration
  var score = [
    [
      ["C4", "g4"],
      ["E4", "g4", "b4"],
    ],
    ["G4", "A4", "b4", ["e4", "e4", "e4", "e4"]],
  ];
  // array of notes, subdivision
  sequence = new Tone.Sequence(
    (time, note) => {
      synth.triggerAttackRelease(note, "8n", time);
    },
    score,
    2
  );

  //play with probability for really interesting melodies

  startPart = createButton("start sequence")
    .position(150, 60)
    .mousePressed(() => sequence.start());

  stopPart = createButton("stop sequence")
    .position(150, 80)
    .mousePressed(() => sequence.stop());

  probability = createSlider(0, 1, 1, 0).position(150, 100);

  Tone.Transport.start();

  slider = createSlider(40, 200, 120, 0);
  slider.position(20, 40);
}
function draw() {
  if (sequence.state == "stopped") {
    background(255, 0, 0);
  } else {
    background(0, 255, 0);
  }

  text(
    "Transport time in seconds " + Tone.Transport.seconds.toFixed(1),
    20,
    20
  );

  // bars:beats:sixteens
  text("Transport position: " + Tone.Transport.position, 200, 20);

  // comment this line to get the ramp to work
  Tone.Transport.bpm.value = slider.value();
  text("BPM " + Tone.Transport.bpm.value.toFixed(0), 20, 40);

  text("Sequence probability " + sequence.probability.toFixed(1), 200, 40);
  sequence.probability = probability.value();

  text("Transport state: " + Tone.Transport.state, 400, 20);
}

function make_poly() {
  // create synth
  var instrument = new Tone.FMSynth();
  var synthJSON = {
    harmonicity: 5,
    modulationIndex: 10,
    oscillator: {
      type: "sine",
    },
    envelope: {
      attack: 0.001,
      decay: 2,
      sustain: 0.1,
      release: 2,
    },
    modulation: {
      type: "square",
    },
    modulationEnvelope: {
      attack: 0.002,
      decay: 0.2,
      sustain: 0,
      release: 0.2,
    },
  };

  instrument.set(synthJSON);

  var effect1, effect2, effect3;

  // make connections
  instrument.connect(Tone.Master);

  // define deep dispose function
  function deep_dispose() {
    if (instrument != undefined && instrument != null) {
      instrument.dispose();
      instrument = null;
    }
  }

  return {
    instrument: instrument,
    deep_dispose: deep_dispose,
  };
}

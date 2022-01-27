let button;
let slider;
let count = 1;
let effect;
let sounds = {
  alert: "assets/alert.mp3",
  applause: "assets/applause.mp3",
  bassdrum: "assets/bassdrum.mp3",
  microwave: "assets/microwave.mp3",
  spring: "assets/spring.mp3",
  synth: "assets/synth.mp3",
};

function setup() {
  createCanvas(500, 500);
  background("grey");

  chorus = new Tone.Chorus();
  pitchShift = new Tone.PitchShift();
  // Test sound -> if you hear it everything is working
  const multiplayer = new Tone.Players(sounds);
  multiplayer.volume.value = -20;
  multiplayer.chain(chorus, pitchShift, Tone.Master);
  // multiplayer.chain(bitC, Tone.Master);

  for (const [key, value] of Object.entries(sounds)) {
    button = createButton(key);
    button.position(20, 20 * count);
    button.mousePressed(() => {
      multiplayer.player(key).start();
    });
    count++;
  }
  textSize(15);
  text("click an audio sample to play sounds", 110, 30);
  // chrous slider and text
  text("CHORUS - \nleft and right \ndelay", 35, 400);
  chorusSlider = createSlider(0, 100, 0);
  chorusSlider.position(20, 300);
  chorusSlider.style("transform", "rotate(-90deg)");

  // phaser slider and text
  text(
    "PITCH SHIFT - \nspeed up or \nslow down delay \nusing a sawtooth wave",
    160,
    400
  );
  pitchShiftSlider = createSlider(0, 100, 0);
  pitchShiftSlider.position(110, 300);
  pitchShiftSlider.style("transform", "rotate(-90deg)");
}

function draw() {
  chorus.wet.value = chorusSlider.value() / 100;
  pitchShift.wet.value = pitchShiftSlider.value() / 100;
}

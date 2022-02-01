const title = "Windmill + Grass Shake Sound Object";
const instructions = "click and hold to hear the sound effect";
let osc1;
let osc2;
let multi;
let lfo;
let filter;
let gainNode;
let env;
let env2;
let noise;
let env3;
let img;

function preload() {
  img = loadImage("assets/windmill.png");
}

function setup() {
  createCanvas(800, 800);
  background(200);

  // first Noise
  // initialize the amplitude envelope and send to master
  env2 = new Tone.AmplitudeEnvelope().toDestination();

  // initialize the LFO
  lfo = new Tone.LFO(5, 200, 1000).start();

  // initialize the filter as a lowpass with a cutoff of 100
  // then connect to the envelope
  filter = new Tone.Filter(100, "lowpass").connect(env2);

  // connect the lfo to the filter frequency
  lfo.connect(filter.frequency);

  noise = new Tone.Noise("white").connect(filter);
  noise.start();

  // grass shake in wind
  // initialize a new amplitude envelope and send it to master
  env3 = new Tone.AmplitudeEnvelope({
    attack: 0.5,
    decay: 0.4,
    sustain: 1.0,
    release: 0.8,
  }).toDestination();

  // initialize a noise source and connect it to the second envelope
  noise = new Tone.Noise("pink").connect(env3);

  noise.start();

  // AM Synthesis
  osc1 = new Tone.Oscillator(400, "square").start();
  osc2 = new Tone.Oscillator(50, "sawtooth6").start();
  multi = new Tone.Multiply();
  osc1.connect(multi, 0, 0);
  osc2.connect(multi, 0, 0);

  gainNode = Tone.context.createGain();
  env = new Tone.Envelope({
    attack: 0.1,
    decay: 0.2,
    sustain: 0.1,
    release: 0.1,
  });

  env.connect(gainNode.gain);
  multi.connect(gainNode);
  Tone.start();
}

function draw() {
  fill(0, 50, 0);
  textAlign(10, 10);
  text(title, 10, 10);
  text(instructions, 10, 30);
}

function sonicEvent() {
  env2.triggerAttack();

  // set osc2 frequency to 25 right away
  osc2.frequency.value = 25;

  // change the frequency
  osc2.frequency.linearRampTo(75, 1);

  // trigger AM Synthesis 0.25 seconds AFTER mouse is pressed
  env.triggerAttackRelease(1.6, "+0.25");
}

function sonicSilence() {
  env2.triggerRelease();
  env3.triggerAttackRelease(0.4);
}

function mousePressed() {
  img.resize(300, 450);
  image(img, 150, 25);
  sonicEvent();
}

function mouseReleased() {
  sonicSilence();
  background(200);
}

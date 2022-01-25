function setup() {
  createCanvas(200, 150);
}

function draw() {
  background("white");
  noStroke();
  // red circle
  fill(255, 0, 0, 90);
  ellipse(100, 50, 80);
  // blue circle
  fill(0, 0, 255, 90);
  ellipse(75, 95, 80);
  // green circle
  fill(0, 255, 0, 90);
  ellipse(125, 95, 80);
}

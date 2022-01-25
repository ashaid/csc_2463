function setup() {
  createCanvas(200, 100);
}

function draw() {
  background("black");
  noStroke();

  // blank ellipse for pacman
  fill(255, 248, 74);
  ellipse(50, 50, 80);

  // triangle cut out for mouth
  fill("black");
  triangle(10, 80, 10, 10, 50, 50);

  // ghost body
  fill(234, 65, 44);
  rect(
    100,
    10,
    80,
    80,
    // corner values
    60,
    80,
    0,
    0
  );

  //ghost outer eyes
  fill("white");
  ellipse(120, 50, 25);
  ellipse(160, 50, 25);

  //ghost inner eyes
  fill(1, 68, 246);
  ellipse(120, 50, 15);
  ellipse(160, 50, 15);
}

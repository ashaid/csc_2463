function setup() {
  createCanvas(200, 200);
}

function draw() {
  background(0, 0, 129);
  noStroke();

  // white circle
  fill("white");
  ellipse(100, 100, 105);

  // green circle
  fill(0, 128, 0);
  ellipse(100, 100, 100);

  // outer star
  fill("white");
  star(100, 100, 21, 55, 5, 5.98);
  // inner star
  fill(255, 0, 0);
  star(100, 100, 17.3, 45, 5, 5.98);
}

// code from https://p5js.org/examples/form-star.html
function star(x, y, radius1, radius2, npoints, rotation) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a + rotation) * radius2;
    let sy = y + sin(a + rotation) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle + rotation) * radius1;
    sy = y + sin(a + halfAngle + rotation) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

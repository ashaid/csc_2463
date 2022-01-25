let colors = [
  "red",
  "orange",
  "yellow",
  "lime",
  "cyan",
  "blue",
  "magenta",
  "saddleBrown",
  "white",
  "black",
];

function setup() {
  createCanvas(850, 600);
  background("#DCDCDC");
  frameRate(144);
  strokeWeight(15);
  brushColor = "black";
}

function draw() {
  if (mouseIsPressed) {
    if (mouseX <= 30) {
      if (mouseY <= 27) {
        brushColor = colors[0];
      } else if (mouseY < 57) {
        brushColor = colors[1];
      } else if (mouseY < 84) {
        brushColor = colors[2];
      } else if (mouseY < 111) {
        brushColor = colors[3];
      } else if (mouseY < 138) {
        brushColor = colors[4];
      } else if (mouseY < 165) {
        brushColor = colors[5];
      } else if (mouseY < 192) {
        brushColor = colors[6];
      } else if (mouseY < 219) {
        brushColor = colors[7];
      } else if (mouseY < 246) {
        brushColor = colors[8];
      } else if (mouseY < 273) {
        brushColor = colors[9];
      }
    }
    stroke(brushColor);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
  colorSquares();
}

function colorSquares() {
  noStroke();

  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    i == 0 ? rect(5, 3, 25) : rect(5, 3 + 27 * i, 25);
  }
}

function setup() {
    createCanvas(800, 600);
    background(255);
  }
  
  function draw() {
    if (mouseIsPressed) {
      fill(random(255), random(255), random(255), 150);
      noStroke();
      ellipse(mouseX, mouseY, 20, 20);
    }
  }
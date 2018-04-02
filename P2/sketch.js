//let option = 3
var mic;

function setup() {
	createCanvas( windowWidth, windowHeight);
	noStroke();

	mic = new p5.AudioIn()
	mic.start();
}

function draw() {
	//let numPerRow = 50;
	//let discoSize = 10;
	//let pad = width / numPerRow;

  background(0);
  //let density = map(mouseX, 0, width, 20, 50);

micLevel = mic.getLevel();
ellipse(width/2, constrain(height-micLevel*height*5, 0, height), 10, 10);
}

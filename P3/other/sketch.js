var mic;
var amp;

var scale = 1.0;

var beatHoldFrames = 30;
var beatThreshold = 0.11;
var beatCutoff = 0;
var beatDecayRate = 0.98;
var framesSinceLastBeat = 0;

let option = 5
function setup() {
  noStroke();

  mic = new p5.AudioIn();
  mic.start();

  amp = new p5.Amplitude();
  amp.setInput(mic);
  amp.smooth(0.9);

  fft = new p5.FFT();
  fft.setInput(mic);
  fft.smooth(0.9);

}

function windowSize() {
  sizeCanvas(windowWidth, windowHeight);
  center = { x: windowWidth / 2, y: windowHeight / 2 };
}

function draw() {
  center = { x: windowWidth / 2, y: windowHeight / 2 };

  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);

	var spectrum = fft.analyze();

	let numPerRow = 50;
	let discoSize = 10;
	let pad = width / numPerRow;

  background(255);
  //let density = map(mouseX, 0, width, 20, 50);

// Option One! - rectangles changing color
if (option == 1) {
  for ( let y = discoSize; y < height; y += pad) {
    for ( let x = discoSize; x < width; x += pad) {
      fill( 255, 0 );
      fill(0, 255 );
      rect( x, y, scale, discoSize );
      scale = map(amp.getLevel(), 0, 1.0, 10, width);
    }
  }

  }


// Option Two!
// By adding else, I am able to use the bottom function to call in sandboxes of code that aren't necessarily option 1
else if (option == 2) {
  for(var y = discoSize; y < height; y = y + pad ) {
  for(var x = discoSize; x < width; x = x + pad ){
      fill(220, 140, random(255) );
      ellipse(x/scale, y, discoSize, discoSize);
      discoSize = Math.abs(random(10, 5)) | 0;
      scale = map(amp.getLevel(), 0, 1.0, 10, width);

  //push();
  //for(var y = discoSize; y < height; y = y + pad ) {
  //for(var x = discoSize; x < width; x = x + pad ){
  //    fill(220, 140, random(255) );
  //    ellipse(x, y/ scale, discoSize, discoSize);
  //    discoSize = Math.abs(random(10, 5)) | 0;
  //    scale = map(amp.getLevel(), 0, 1.0, 10, width);
  //pop();
  }

  }

}



// Option Three!- lots of rectangles changing colors
else if (option == 3) {
  for(var y = discoSize; y < height; y = y + pad ) {
  for(var x = discoSize; x < width; x = x + pad ){
      fill(120, 280, random(255) );
      rect(x, y, discoSize, scale);
      discoSize = Math.abs(random(5, 10)) | 0;
      scale = map(amp.getLevel(), 0, 1.0, 10, width);
  }

  }

}

else if (option == 4) {
  for(var y = circle; y < height; y = y + pad ) {
  for(var x = circle; x < width; x = x + pad ){
      fill(120, 280, random(255) );
      rect(x, y, discoSize, scale);
      discoSize = Math.abs(random(5, 10)) | 0;
      scale = map(amp.getLevel(), 0, 1.0, 10, width);
  }

  }

}

else if (option == 5) {
  for(var y = discoSize; y < height; y = y + pad ) {
  for(var x = discoSize; x < width; x = x + pad ){
      fill(120, 280, random(255) );
      rect(x, y, discoSize, scale);
      discoSize = Math.abs(random(5, 10)) | 0;
      scale = map(amp.getLevel(), 0, 1.0, 10, width);
  }

  }

}

}

function detectBeat(level) {
  if (level > beatCutoff && level > beatThreshold) {
    rotation += random(0, 25);
    beatCutoff = level * 1.2;
    framesSinceLastBeat = 0;
  }
  else {
    if (framesSinceLastBeat <= beatHoldFrames) {
      framesSinceLastBeat++;
    }
    else {
      beatCutoff *= beatDecayRate;
      beatCutoff = Math.max(beatCutoff, beatThreshold);
    }
  }
}


function mousePressed() {
  option++;
  if (option > 3) {
		option = 1;
	}
}

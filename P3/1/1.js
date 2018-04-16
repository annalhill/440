var mic;
var amp;

var soundScale = 1.0;

var beatHoldFrames = 30;
var beatThreshold = 0.11;
var beatCutoff = 0;
var beatDecayRate = 0.98;
var framesSinceLastBeat = 0;

var noiseFloorLevel = 0;
let avgNF = 0;
let avgNFCnt = 0;
let findingNF = false;

let r = 10;
let g = 10;
let b = 10;

let colorChange = 10

let option = 5
function setup() {
  noStroke();

  let angle = 0;

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


let testMove = 0;

function draw() {

  // With the key 'A' pressed, the function is calculatign the average of the noise floor level and spitting htese numbers out into the console for reference
  if(keyIsPressed && key == 'a'){
    if(!findingNF){
      avgNF = 0;
      avgNFCnt = 0;
      findingNF = true;
    }
    avgNF += amp.getLevel();
    avgNFCnt++;
    console.log(avgNF);
  } else {
    if(avgNF > 0 && findingNF){
      avgNF = avgNF / avgNFCnt;
      avgNF*= 1.1;
      noiseFloorLevel = avgNF;
      console.log("nf", noiseFloorLevel);
    }
    findingNF = false;
  }

  center = { x: windowWidth / 2, y: windowHeight / 2 };

  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);

  var spectrum = fft.analyze();

  let numPerRow = 50;
  let discoSize = 10;
  let pad = width / numPerRow;



  background(0);

  noCursor();
  //let density = map(mouseX, 0, width, 20, 50);

  soundScale = map(amp.getLevel(), noiseFloorLevel, 1.0, 10, width);

  // Option One! - rectangles changing color
  if (option == 1) {
    push();
    scale(0.5, 1.3);
    translate(width*0.1, height*0.3);
    rotate(PI*0.2);
    for ( let y = discoSize; y < height; y += pad) {
      for ( let x = discoSize; x < width; x += pad) {
        fill(9, 36, 33);
        fill( 9, 36, 33 );
        rect( x, discoSize, soundScale, y );
        // soundScale = map(amp.getLevel(), 0, 1.0, 10, width);
      }
    }
    pop();

  }


  // Option Two!
  // By adding else, I am able to use the bottom function to call in sandboxes of code that aren't necessarily option 1
  if (option == 2) {
    push();
    scale(0.5, 0.3);
    translate(width*0.1, height*0.3);
    rotate(PI*0.2);
    for(var y = discoSize; y < height; y = y + pad ) {
      for(var x = discoSize; x < width; x = x + pad ){
        fill(220, 140, random(255) );
        ellipse(x/soundScale, y, discoSize, discoSize);
        discoSize = Math.abs(random(10, 5)) | 0;


      }
    }
    pop();
  }



  // Option Three!- lots of rectangles changing colors
  if (option == 3) {
    push();
    scale(0.5, 0.3);
    translate(width*0.1 + testMove++, height*0.3);
    rotate(PI*0.2);
    for(var y = discoSize; y < height; y = y + pad ) {
      for(var x = discoSize; x < width; x = x + pad ){
        fill(120, 280, random(255) );
        rect(x, y, discoSize, soundScale);
        discoSize = Math.abs(random(5, 10)) | 0;
        // soundScale = map(amp.getLevel(), noiseFloorLevel, 1.0, 10, width);
      }

    }
    pop();

  }

  if (option == 4) {
    push();
    for(var y = discoSize; y < height; y = y + pad ) {
      for(var x = discoSize; x < width; x = x + pad ){
        fill(r, g, random(b));
        // translate(width*0.5, height*0.5);
        rotate(radians(angle) );
        ellipse(discoSize, soundScale, 100 , 200);

        angle = angle + 40;

        discoSize = Math.abs(random(5, 10)) | 0;
        // soundScale = map(amp.getLevel(), noiseFloorLevel, 1.0, 10, width);
      }
    }
    for(var y = discoSize; y > height; y = y + pad ) {
      for(var x = discoSize; x > width; x = x + pad ){
        fill(120, 280, random(255) );
        rect(x, y, discoSize, soundScale);
        discoSize = Math.abs(random(5, 10)) | 0;
        // soundScale = map(amp.getLevel(), noiseFloorLevel, 1.0, 10, width);


      }

    }
    pop();

  }

  if (option == 5) {
    push();
    for(var y = discoSize; y < height; y = y + pad ) {
      for(var x = discoSize; x < width; x = x + pad ){
        fill(120, 280, random(255) );
        rect(x, y, discoSize, soundScale);
        discoSize = Math.abs(random(5, 10)) | 0;
        // soundScale = map(amp.getLevel(), noiseFloorLevel, 1.0, 10, width);


      }

    }
    pop();

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


// function keyPressed() {
//   if (keyCode == 65) {
//     noiseFloorLevel = amp.getLevel();
//     console.log(noiseFloorLevel);
//
//   }
// }

function mousePressed() {
  option++;
  if (option > 3) {
    option = 1;
  }
}



// function keyPressed(){
//   option++;
//   if (keyIsPressed && key == 'C') {
//     option = 1;
// }
//   else if (keyIsPressed && key == 'V') {
//     option = 2;
// }
//   else if (keyIsPressed && key == 'B') {
//     option = 3;
// }
//   else if (keyIsPressed && key == 'N') {
//     option = 4;
// }
//   else if (keyIsPressed && key == 'M') {
//     option = 5;
// }

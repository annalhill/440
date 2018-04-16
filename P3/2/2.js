var circles = 24,
        delta = 0,
        frames = 10;

var mic;
var amp;

var soundScale = 1.0;

var noiseFloorLevel = 0;
let avgNF = 0;
let avgNFCnt = 0;
let findingNF = false;


function setup() {
  createCanvas(windowWidth, windowHeight);

	mic = new p5.AudioIn();
	mic.start();

	amp = new p5.Amplitude();
	amp.setInput(mic);
	amp.smooth(0.9);

	fft = new p5.FFT();
	fft.setInput(mic);
	fft.smooth(0.9);

}

function draw() {

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

  background(0);
	noCursor();
  stroke(0,200,200);
    noFill();

		var spectrum = fft.analyze();

		soundScale = map(amp.getLevel(), noiseFloorLevel, 1.0, 10, width);

  for (var i=0; i<circles; i++) {
    var size = i*35;
    var weight = map(sin(delta+TWO_PI/circles*soundScale), -1, 1, 1, 16);
    strokeWeight(weight);
    ellipse(width/2, height/2, size, size);
  }
  delta += TWO_PI/frames;
}

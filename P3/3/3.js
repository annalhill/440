var ratio = 1.78125;

var mic;
var amp;

var soundScale = 1.0;

var noiseFloorLevel = 0;
let avgNF = 0;
let avgNFCnt = 0;
let findingNF = false;

var beatHoldFrames = 30;
var beatThreshold = 0.11;
var beatCutoff = 0;
var beatDecayRate = 0.98;
var framesSinceLastBeat = 0;

let r = 10;
let g = 10;
let b = 10;

let colorChange = 10

function setup() {
    createCanvas(windowWidth, windowHeight);
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

    background(20);

		var spectrum = fft.analyze();

		let numPerRow = 50;
		let discoSize = 10;
		let pad = width / numPerRow;

		soundScale = map(amp.getLevel(), noiseFloorLevel, 1.0, 10, width);

    var size = 64;
    var offset = discoSize * ratio;

    for (var x = 0; x <= width + size; x += size * 2) {
        for (var y = 0; y <= height + offset; y += offset) {
            var x0 = 0;
            if (y % (offset * 2) == 0) {
                fill(74,189,172);
                x0 = size;
            } else {
                fill(252,74,26);
                xo = 0;
            }

            makeRiver(x + x0, y, size);
        }
    }
}

function makeRiver(a, b, size) {
    var diff =
        sin(radians(dist(a, b, width / soundScale, height / soundScale) - frameCount)) * size / ratio;
    beginShape();
    for (var i = 0; i < 6; i++) {
        var angle = PI * i / 3;
        vertex(
            a + sin(angle) * (size / ratio - diff),
            b + cos(angle) * (size / ratio - diff)
        );
    }
    endShape(CLOSE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

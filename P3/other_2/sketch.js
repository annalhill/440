var mic;
var amp;

var scale = 1.0;


var cnv, mic, fft, peakDetect;
var ellipseWidth = 10;

function setup() {
  createCanvas (windowWidth, windowHeight);
  background(0);
  noStroke();
  fill(255);

  mic = new p5.AudioIn();
  mic.start();

  // p5.PeakDetect requires a p5.FFT
  fft = new p5.FFT();
  peakDetect = new p5.PeakDetect();
  fft.setInput(mic);

}

function draw() {
  background(0);

  // peakDetect accepts an fft post-analysis
  fft.analyze();
  peakDetect.update(fft);

  if ( peakDetect.isDetected ) {
    ellipseWidth = 50;
  } else {
    ellipseWidth *= 0.95;
  }

  ellipse(width/2, height/2, ellipseWidth, ellipseWidth);
}

var mic;
var amp;

var scale = 1.0;

var ellipseWidth = 30;

function setup() {
  createCanvas (windowWidth, windowHeight);
  noStroke();
  fill(255);

  mic = new p5.AudioIn();
  mic.start();

  amp = new p5.Amplitude();
  amp.setInput(mic);
  amp.smooth(0.9);
  getLevel([smoothing]);

}

function draw() {
  background(0);
  ellipse(width/2, height/2, amp.getLevel, ellipseWidth);
}

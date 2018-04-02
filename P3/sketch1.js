var mic;
var amp;

var scale = 1.0;

let option = 1
function  setup() {
	createCanvas(windowWidth, windowHeight);

	mic = new p5.AudioIn();
	mic.start();

	amp = new p5.Amplitude();
	amp.setInput(mic);

	fft = new p5.FFT();
	fft.setInput(mic);

}

function draw(){
	noStroke();
	background(0);

	var spectrum = fft.analyze();


	fill(0, 10);
	rect(0, 0, width, height);

	scale = map(amp.getLevel(), 0, 1.0, 10, width);


}

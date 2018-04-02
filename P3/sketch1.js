var mic;
var amp;

var expand = [];
let a = 0;

var scale = 1.0;

let option = 1
function  setup() {
	createCanvas(windowWidth, windowHeight);

	mic = new p5.AudioIn();
	mic.start();

	amp = new p5.Amplitude();
	amp.setInput(mic);

	fft = new p5.FFT();

}

function draw(){
	noStroke();
	background(0);

	var spectrum = fft.analyze();

	let numPerRow = 50;
	let pad = width / numPerRow;

	//fill(0, 10);
	//rect(0, 0, width, height);

	scale = map(amp.getLevel(), 0, 1.0, 10, width);

	fill(200);
	ellipse(width/2, height/2 / spectrum.length, a);
	//(width/2, height/2, scale, scale);
 //
	// if (option == 1) {
 // for ( let y = scale; y < height; y += pad) {
	//  for ( let x = scale; x < width; x += pad) {
	// 	 fill( 165, 205, random(255) );
	// 	 fill(230, 140, random(255) );
	// 	 rect( x, y, scale  );
	//  }
 // }
 //
 // }
 //
	// else if (option == 2) {
 // for ( let y = scale; y < height; y += pad) {
	//  for ( let x = scale; x < width; x += pad) {
	// 	 fill( 250, 205, random(255) );
	// 	 fill(108, 120, random(255) );
	// 	 rect( x, y, scale,  );
	//  }
 // }
 //
 // }
 //
	// else if (option == 3) {
 // for ( let y = scale; y < height; y += pad) {
	//  for ( let x = scale; x < width; x += pad) {
	// 	 fill( 110, 230, random(255) );
	// 	 fill(245, 211, random(255) );
	// 	 rect( x, y, scale,  );
	//  }
 // }
 //
 // }

}

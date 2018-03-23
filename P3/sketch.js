let option = 3
function setup() {
	createCanvas( windowWidth, windowHeight);
	noStroke();
}

function draw() {
	let numPerRow = 50;
	let discoSize = 10;
	let pad = width / numPerRow;

  background(255);
  //let density = map(mouseX, 0, width, 20, 50);

// Option One! - rectangles changing color
if (option == 1) {
  for ( let y = discoSize; y < height; y += pad) {
    for ( let x = discoSize; x < width; x += pad) {
      fill( 165, 205, random(255) );
      triangle( y, y, x, discoSize, discoSize, discoSize );
      fill(230, 140, random(255) );
      rect( x, y, discoSize, discoSize );
    }
  }

  }


// Option Two!- stripes changing color?
// By adding else, I am able to use the bottom function to call in sandboxes of code that aren't necissarily option 1
else if (option == 2) {
  for(var y = discoSize; y < height; y = y + pad ) {
  for(var x = discoSize; x < width; x = x + pad ){
      fill(220, 140, random(255) );
      ellipse(x, y, discoSize, discoSize);
      discoSize = Math.abs(random(10, 5)) | 0;
  }

  }

}



// Option Three!- lots of rectangles changing colors
else if (option == 3) {
  for(var y = discoSize; y < height; y = y + pad ) {
  for(var x = discoSize; x < width; x = x + pad ){
      fill(120, 280, random(255) );
      rect(x, y, discoSize, discoSize);
      discoSize = Math.abs(random(5, 10)) | 0;
  }

  }

}
}



function mousePressed() {
  option++;
  if (option > 3) {
		option = 1;
	}
}

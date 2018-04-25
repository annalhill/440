var mic;
var amp;

var ratio = 1.78125;

var soundScale = 1.0;

var circles = 24,
  delta = 0,
  frames = 10;

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
let angle = 0;

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
  center = {
    x: windowWidth / 2,
    y: windowHeight / 2
  };
}


let testMove = 0;

function draw() {

  noCursor();

  // With the key 'A' pressed, the function is calculatign the average of the noise floor level and spitting htese numbers out into the console for reference
  if (keyIsPressed && key == 'a') {
    if (!findingNF) {
      avgNF = 0;
      avgNFCnt = 0;
      findingNF = true;
    }
    avgNF += amp.getLevel();
    avgNFCnt++;
    console.log(avgNF);
  } else {
    if (avgNF > 0 && findingNF) {
      avgNF = avgNF / avgNFCnt;
      avgNF *= 1.1;
      noiseFloorLevel = avgNF;
      console.log("nf", noiseFloorLevel);
    }
    findingNF = false;
  }

  center = {
    x: windowWidth / 2,
    y: windowHeight / 2
  };

  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);

  var spectrum = fft.analyze();

  let numPerRow = 50;
  let discoSize = 10;
  let pad = width / numPerRow;

  var size = 64;
  var offset = discoSize * ratio;

  background(0);

  noCursor();
  //let density = map(mouseX, 0, width, 20, 50);

  soundScale = map(amp.getLevel(), noiseFloorLevel, 1.0, 10, width);

  // Option 1: 2.js - Rings, C
  if (option == 1) {
    push();
    for (var i = 0; i < circles; i++) {
      var size = i * 35;
      var weight = map(sin(delta + TWO_PI / circles * soundScale), -1, 1, 1, 16);
      fill (120, 280, random(255));
      noFill();
      stroke(0,200,200);
      strokeWeight(weight);
      ellipse(width / 2, height / 2, size, soundScale);
    }
    delta += TWO_PI / frames;
    pop();
  }




  // Option 2: 3.js- River of Hexagons, V
  if (option == 2) {
    push();
    for (var x = 0; x <= width + size; x += size * 2) {
      for (var y = 0; y <= height + offset; y += offset) {
        var x0 = 0;
        if (y % (offset * 2) == 0) {
          fill(74, 189, 172);
          x0 = size;
        } else {
          fill(252, 74, 26);
          xo = 0;
        }
        makeRiver(x + x0, y, size);
      }
    }
    pop();
  }



  // Option 3: Polygon of small jiggly squares, B
  if (option == 3) {
    push();
    scale(0.5, 0.3);
    translate(width * 0.1 + testMove++, height * 0.5);
    rotate(PI * 0.2);
    for (var y = discoSize; y < height; y = y + pad) {
      for (var x = discoSize; x < width; x = x + pad) {
        fill(120, random(280), 255);
        rect(x, y, discoSize, soundScale);
        discoSize = Math.abs(random(5, 10)) | 0;
        // soundScale = map(amp.getLevel(), noiseFloorLevel, 1.0, 10, width);
      }

    }
    pop();

  }

// Option 4: Spinning ovals ,N
  if (option == 4) {
    push();
    for (var y = discoSize; y < height; y = y + pad) {
      for (var x = discoSize; x < width; x = x + pad) {
        fill(180, 20, random(255));
        translate(width*0.5, height*0.5);
        rotate(radians(angle));
        ellipse(soundScale , 200, 100, soundScale);

        angle = angle + 40;

        discoSize = Math.abs(random(5, 10)) | 0;
        // soundScale = map(amp.getLevel(), noiseFloorLevel, 1.0, 10, width);
      }
    }
    for (var y = discoSize; y > height; y = y + pad) {
      for (var x = discoSize; x > width; x = x + pad) {
        fill(120, 280, random(255));
        rect(x, y, soundScale, soundScale);
        discoSize = Math.abs(random(2, 3)) | 0;
        // soundScale = map(amp.getLevel(), noiseFloorLevel, 1.0, 10, width);


      }

    }
    pop();

  }
// Option 5: Jiggly Squares, M
  if (option == 5) {
    //push();
    for (var y = discoSize; y < height; y = y + pad) {
      for (var x = discoSize; x < width; x = x + pad) {
        fill(120, 280, random(255));
        rect(x, y, discoSize, soundScale);
        discoSize = Math.abs(random(5, 10)) | 0;
        // soundScale = map(amp.getLevel(), noiseFloorLevel, 1.0, 10, width);


      }

    }
    //pop();

  }

// Option 6: Black Start and End Screen, P
  if (option == 6) {
    push();
    fill(0);
    pop();

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

  function detectBeat(level) {
    if (level > beatCutoff && level > beatThreshold) {
      rotation += random(0, 25);
      beatCutoff = level * 1.2;
      framesSinceLastBeat = 0;
    } else {
      if (framesSinceLastBeat <= beatHoldFrames) {
        framesSinceLastBeat++;
      } else {
        beatCutoff *= beatDecayRate;
        beatCutoff = Math.max(beatCutoff, beatThreshold);
      }
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

  // function mousePressed() {
  //   option++;
  //   if (option > 3) {
  //     option = 1;
  //   }
  // }



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

  function keyPressed() {
    if (key === 'C') {
      option = 1;
    } else if (key === 'V') {
      option = 2;
    } else if (key === 'B') {
      option = 3;
    } else if (key === 'N') {
      option = 4;
    } else if (key === 'M') {
      option = 5;
    } else if (key === 'P') {
      option = 6;
  //  } else {
  //    option = (option+1)%6;
  //    console.log(option);

    }
  }

## MART 440
## Project 2
## Script
## By Anna Hill

```
// SKETCH USES FREQUENCY LEVELS AT THE HIGHEST POINT OF VOLUME TO CREATE A FLOW OF WORDS THAT EITHER DO OR DON'T
// MAKE SENSE IN ORDER.
// THE POEM THAT IS USED IN THS SKETCH IS BY POETRIA
// SOCIETY LEFT US ALL ALONE
//SO WE BUILT OURSELVES A WORD THRONE


import ddf.minim.*;
import ddf.minim.analysis.*;

Minim minim;
AudioInput in;
FFT fft;
String note;
int n;
color c;
float hertz;
float midi;
int noteNumber;

int sampleRate = 44100;

float [] max = new float [sampleRate/2];
float maximum;
float frequency;

int highest = 0;

void setup() {
  size(1400, 1200, P2D);

  minim = new Minim(this);
  minim.debugOn();
  in = minim.getLineIn (minim.MONO, 4096, sampleRate);
  fft = new FFT (in.left.size(), sampleRate);
}

void draw() {
  background(0);
  findNote();
  textSize(100);

  line(0,200,width,200);
  int count = 0;
  int lowTot = 0;
  int medTot = 0;
  int hiiTot = 0;
  for (int i = 0; i < in.left.size()/3.0; i+=5){
    lowTot+= (abs(in.left.get(i)) * 10 );
    count++;
  }
  println(lowTot, count);

  //text (frequency-6+"hz", 50, 80);
  pushStyle();
  fill(c);
  text (" "+note, 300, 300);
  popStyle();

  stroke(255);
  line(0, 0, width, 0);
  line(0, 100, width, 100);
  //line(0, 200, width, 200);
  //line(0, 300, width, 300);
  line(0, 400, width, 400);
  line(0, 500, width, 500);
  line(0, 600, width, 600);
  line(0, 700, width, 700);
  line(0, 800, width, 800);
  line(0, 900, width, 900);

  saveFrame("Output4/soundpoetry-####.png");
}

void findNote() {

  fft.forward(in.left);
  for (int f=0;f<sampleRate/2;f++) {
    max[f]=fft.getFreq(float(f));  
  }
  maximum=max(max);

  for (int i=0; i<max.length; i++) {
    if (max[i] == maximum) {
      frequency= i;
    }
  }

  midi= 69+12*(log((frequency-6)/440));
  n= int (midi);

if (n%12==9)
  {
    textAlign(CENTER);
    note = ("SOCIETY");
    c = color (255, 0, 0);
  }

  if (n%12==10)
  {
    textAlign(BOTTOM, RIGHT);
    note = ("LEFT");
    c = color (255, 0, 80);
  }

  if (n%12==11)
  {
    textAlign(TOP, RIGHT);
    note = ("US");
    c = color (255, 0, 150);
  }

  if (n%12==0)
  {
    textAlign(CENTER, RIGHT);
    note = ("ALL");
    c = color (200, 0, 255);
  }

  if (n%12==1)
  {
    textAlign(BOTTOM, RIGHT);
    note = ("ALONE");
    c = color (100, 0, 255);
  }

  if (n%12==2)
  {
    textAlign(TOP, RIGHT);
    note = ("SO");
    c = color (0, 0, 255);
  }

  if (n%12==3)
  {
    textAlign(CENTER, RIGHT);
    note = ("WE");
    c = color (0, 50, 255);
  }

  if (n%12==4)
  {
    textAlign(BOTTOM, RIGHT);
    note = ("BUILT");
    c = color (0, 150, 255);
  }

  if (n%12==5)
  {
    textAlign(TOP, RIGHT);
    note = ("OURSELVES");
    c = color (0, 255, 255);
  }

  if (n%12==6)
  {
    textAlign(CENTER, RIGHT);
    note = ("A");
    c = color (0, 255, 0);
  }

  if (n%12==7)
  {
    textAlign(BOTTOM, RIGHT);
    note = ("WORD");
    c = color (255, 255, 0);
  }

  if (n%12==8)
  {
    textAlign(TOP, RIGHT);
    note = ("THRONE");
    c = color (255, 150, 0);
  }
}

void stop()
{
  in.close();
  minim.stop();

  super.stop();
}
```

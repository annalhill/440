
# MART 440 Journal
# Anna Louise Hill

### Class Notes and Readings

#### 1/22
1. What Is Interactive Performance?
   - Agents- artist, artwork, audience
      - flow of communication:
        - reactive system vs. interactive system
        - 2 agents that are able to interact and engage with other agents.
      - Performance:
        - Music, Theatre, Dance, Circus, Sports (Social Media)
      - Interaction
      - Human and Computer, Artist is the Performer, Audience is the Performer, Tech and Tech, Interpersonal Interactions and Media (Accidental/ Intentional)

#### 1/23
1. Live Media: Interactive Technology and Theatre Notes
    - Interactivity -> Live
      - "Sounds and images stored that will produce a response in a live performer's actions"
    - Linear media? </i> -> devices (cd, vcr, etc.) -> Reactive systems
    - 1. Random Access: The use of various inputs and outputs and being able to have control and manipulation over the content.
    - 2. Trigger and Output: Coordinated control of multiple media elements.
      -> Inputs and outputs (aka mapping) -> many to many, many to one, one to one
    - 3. Media Manipulation: Manipulation and the relation of variables to "paint" a picture or experience. The participants ability to create change.
    - Performance with constraints
    - Strengths of both live performance and media -> the intangible relations of how live vs. personal tech experiences formulate different feelings or emotions towards a performance or moment
    - A more meaningful interactive performance between the performer and the audience.
    - Incorporating media without compromising the spontaneity of live Performance
    - Agents- Performers, Technology
    - Outside Agents- Audience


#### 1/27
1. Interactivity and Liveness in Electro- acoustic Concert Music by Mike Frengel
- The concept and interaction of electrical facilitators and their ability to interact and control or react to live performance.
- Agents: Live performance, electronics, and spectators
- Attributes of live performance:
  1. Virtuosity: Outstanding performance that is beyond the norm. Mastery of motor and musical language. The control and combination
    - of such mastery skills provide an enticing and perceptually overwhelming experience.
  2. Fallibility: Mythos. The ability to fail and literally fall is a characteristic to liv performance that makes it human and has the
    audience sitting on the edge of their seat waiting to watch this obstacle being overcome.
  3. Spontaneous Variability: The evolution and individual characteristics each artist/ performer brings forth.
    - The influence of visual cues: Working with music in particular, the ability to create a story and mimic the storyline or the music to create a
      succinct performance. All of the above factors placed into a performance, allow for the appeal of live performance. The process produces
      a product whether that be a good or bas reaction. Overall, live performance alone is visually, mentally and physically stimulating and when you add a factor in such as electronics, adds to the works complexity and also adds another stimulating factor in, "how'd- they- do- it?".
  4. Presence: </i> "physical co-presence of performers and audience; temporal simultaneity and reception; experience in the moment" (Frengel, 2)
    "how'd- they- do- it?": A shift of attention towards function and allowing a spectator to see and understand the "human- machine interaction".
  5. Electroacoustic:
    - Typically don't involve a live performer on stage
    - What can be gained when sound sources and mechanics cannot be seen?
    - When performers are involved, a lot of coordination has to take place as there is highly limited flexibility.
    - Electroacoustic music tries to free the performer from these constraints.
  6. The Instrumental Model:
    - The use of an instrument to create a more organic process, product interaction. This provides a certain level of consistency
    - as well to help develop, express, and react.


### 1/28
Understanding Interactive Systems by Jon Drummond
Interactive defines a reactive system that includes an audience or participation in some manner.

Introduction
1. Combining mediums and being able to work among similar artists to create new and exciting pieces.
2. The ability to provide experiences for an assortment of audiences, musical and non- musical.
3. Interactive music systems used in a variety of systems.

Definitions
1. Traditional roles in interactive composition?
2. Shared processes and products- human and machine interactions.
3. Musical Output as a result of shared interactions.

Classifications and Models
1. Intention and use.

System Anatomy
1. Sensing, processing, and response


### 1/29
In class notes
Genres are important because they give us a form of communication in a topic we can't quite evaluate on a normal scale.
A reactive and interactive system that uses the agents of Performance, Audience and technology to create an experience or painting.
Trying to effect state changes in another agent (at least two agent).

Dr. Musick's definitions:

1. Interactive: A system, with at least two agents, who have an equal oppurtunity of effecting state changes in every other agent.
2. Reactive: A one- way sharing of information, with the goal of changing something else.
3. Dynamical:
4. System: Some sort of organized group of things, that do something.
5. Liveness: The perception of whether something is actually occuring in real- time? (i.e. the email problem)

A tool vs. Instrument -- What is technology?
What is a visual instrument?

Types of Systems:
Interactive System Models:
1. The instrumental model: Reactive system, something that a performer understands its possible outputs.
2. The conductor model: Moderator of output information, typically includes fixed- media, controls timing, not at the micro- level of the instrument.
3. The reflexive model: Starting to introduce true agency, responds to something at the input, may make it's own choices, however, still expected results.
4. The virtual performer model: working towards full agency.

System Design Terms
1. Affordance:
2. Constraints:
3. Agency:


# Personal Notes and Research

## 1/23
Interactive Performance Examples:

(Example)["./images/empsr.jpg"]

An example of interactive performance is the Experience Music Project in Seattle, WA.
In this large crafted piece of art, the experience is designed and left up to the participant. Whether the participant chooses to
react to the music playing in the main hall or experiment with the sound design room where one or more people can play with
instruments and record their own tracks is their personal choice. No matter what the decision, their participation will produce their
outcome and make every participants experience within the interactive performance exhibit different.

Agents: Participants and Instruments

# Projects

#### Project 2
#### Sound Poetry:
- Launch: Wednesday, February 21st
- Sketch due: Wednesday, February 28th
- Project due: Wednesday, March 14th
- Documentation due: Monday, March 19th

 1. In this project, I will be building upon my sketch of taking in amplitude ratings from a microphone (stereo) and outputting it in the form of words. Depending on what level of amplitude comes into the system, the sketch will "upload" a word and as you begin using different voices and sounds, the sketch will create a flow of words. Sometimes your poetry will make sense, and other times the words will come out in very random and unreadable manners.The main concept of this is that you'll be creating your own structure and as you figure out,
as the performer, what sounds make certain words and levels, you can structure your own poetry or sentences.
2. In a live performance or interactive performance capacity, this project could be used to tell a story, program the words to certain sounds. If an instrumental only performer were
to play this sketch along with their music, the input of sound would create the lyrics that go to the song.
3. Agents/ Technology: Processing Sketch, Microphone (could be from the computer or external- depends on resources), and performers (myself or classmates).

This is a copy of the code that I am building off of

```
import ddf.minim.*;
AudioPlayer player;
Minim minim;

void setup(){
  size(1400, 1200, P2D);

  minim = new Minim(this);
  player = minim.loadFile("./p1_practice_1.wav", 2048);
  player.play();
  player.loop();
}

void draw(){
  background(0);
  stroke(255);
  line(0,200,width,200);
  int count = 0;
  int lowTot = 0;
  int medTot = 0;
  int hiiTot = 0;
  for (int i = 0; i < player.left.size()/3.0; i+=5){
    lowTot+= (abs(player.left.get(i)) * 10 );
    count++;
  }
  fill( map( lowTot, 0, count * 50, 0, 255 ), 0, 0);
  noStroke();
  text("A",0,0,40,40);
  stroke(255);
  strokeWeight(2);

  for (int i = 0; i < player.left.size()/3.0; i+=5){
    medTot+= (abs(player.left.get(i)) * 5 );
    count++;
  }
  fill( map( medTot, 0, count * 50, 0, 255 ), 0, 0);
  noStroke();
  text("B", 0,0,60,60);
  stroke(245);
  strokeWeight(2);

  <for (int i = 0; i < player.left.size()/3.0; i+=5){
    hiiTot+= (abs(player.left.get(i)) * 30 );
    count++;
  }
  fill( map( hiiTot, 0, count * 50, 0, 255 ), 0, 0);
  noStroke();
  text("C", 0,0,50,50);
  stroke(120);
  strokeWeight(2);

  for (int i = 0; i < player.left.size()-1; i+=5)
  {
    line(i, 50 + player.left.get(i)*50, i+1, 50 + player.left.get(i+1)*50);
    line(i, 150 + player.right.get(i)*50, i+1, 150 + player.right.get(i+1)*50);
    point( 2*i, 100 + player.left.get(i)*50 );


void stop(){
  player.close();
  minim.stop();
  super.stop();
  ```

  (P2 example)[]<img src="./images/p2_example.png" ]

Examples of projects similar to this:
https://www.youtube.com/watch?v=0C94-rGLIDo
Other Ideas:
- Have the ability to record and save data from the sessions
- Include a few instruments for performers/ audience to play around with



A chronicle of notes, ideas, projects, and more, of and relating to Interactive Performance.

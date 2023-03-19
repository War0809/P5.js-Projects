//Setting up variables
var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var Constraint = Matter.Constraint;
var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;

var engine;
var propeller;
var boxes = [];
var birds = [];
var colors = [];
var ground;
var slingshotBird, slingshotConstraint;
var angle=0;
var angleSpeed=0;
var canvas;

var Time;
var timeLimit = 60; //Time limit for the game

////////////////////////////////////////////////////////////
function setup() {
  canvas = createCanvas(1000, 600);

  engine = Engine.create();  // create an engine

  setupGround();

  setupPropeller();

  setupTower();

  setupSlingshot();

  setupMouseInteraction();
    
  setupBlocker();
}
////////////////////////////////////////////////////////////
function draw() {
  background(135,206,235);

  Engine.update(engine);

  drawGround();

  drawPropeller();
  
  drawTower();

  drawBirds();

  drawSlingshot();

  drawBlocker();

  drawTimer();
}
//Using the left and right arrow from the keyboard to control the propeller speed
function keyPressed(){
  if (keyCode == LEFT_ARROW){
    //your code here
    angleSpeed += 0.01;
  }
  else if (keyCode == RIGHT_ARROW){
    //your code here
    angleSpeed -= 0.01;
  }
}
//Keyboard key functions
function keyTyped(){
//By pressing the "b" button on the keyboard a new "Bird" is created to use with the propeller
  if (key==='b'){
    setupBird();
  }

//Slingshot is released by pressing the "r" button on the keyboard
  if (key==='r'){
    removeFromWorld(slingshotBird);
    removeFromWorld(slingshotConstraint);
    setupSlingshot();
  }
}

//When mouse key is released constraint is removed so that the "Bird" can fly
function mouseReleased(){
  setTimeout(() => {
    slingshotConstraint.bodyB = null;
    slingshotConstraint.pointA = { x: 0, y: 0 };
  }, 100);
}
//Check for off screen bodies
function isOffScreen(body){
  var pos = body.position;
  return (pos.y - 56  > height || pos.x + 56 <0 || pos.x - 56 >width);
}
//Removes off screen bodies
function removeFromWorld(body) {
  World.remove(engine.world, body);
}
////////////////////////////////////////////////////////////
function drawVertices(vertices) {
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}
////////////////////////////////////////////////////////////
function drawConstraint(constraint) {
  push();
  var offsetA = constraint.pointA;
  var posA = {x:0, y:0};
  if (constraint.bodyA) {
    posA = constraint.bodyA.position;
  }
  var offsetB = constraint.pointB;
  var posB = {x:0, y:0};
  if (constraint.bodyB) {
    posB = constraint.bodyB.position;
  }
  strokeWeight(5);
  stroke(255);
  line(
    posA.x + offsetA.x,
    posA.y + offsetA.y,
    posB.x + offsetB.x,
    posB.y + offsetB.y
  );
  pop();
}
//Displaying the countdown timer
function drawTimer (){
    
  Time = millis();
  totalTime = int(Time/1000);
  timeRemain = timeLimit - totalTime;
    
  fill(255);
  textSize(30);
  text("Time Remaining: " + timeRemain, 700, 60);
//Checks if boxes are cleared before time has run out and display "You Win" message
  if(boxes.length == 0 && timeRemain > 0){
      text("You Win", width/2,height/2);
      end;
      
  }
//Checks if there are any boxes left and time has run out and display "You Lose" message
  if (boxes.length > 0 && timeRemain == 0 ){
      text("You Lose", width/2,height/2);
      end;
  }
}


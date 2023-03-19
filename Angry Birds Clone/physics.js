//Creating the Ground
function setupGround(){
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}

//Displaying the ground
function drawGround(){
  push();
  fill(96,59,42);
  drawVertices(ground.vertices);
  pop();
}
//Creating the Propeller
function setupPropeller(){
  propeller = Bodies.rectangle(150, 480, 200, 15, {isStatic:true, angle:angle});
  World.add(engine.world, [propeller]);

}
//Dispalying the Propeller
function drawPropeller(){
  push();
  fill(0);
  angle += angleSpeed
  Body.setAngle(propeller, angle);
  Body.setAngularVelocity(propeller, angleSpeed);
  drawVertices(propeller.vertices);
  pop();
}
//Creating the "Birds"
function setupBird(){
  var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0,
      restitution: 0.95
    });
  Matter.Body.setMass(bird, bird.mass*10);
  
  World.add(engine.world, [bird]);
  birds.push(bird);
}
//Displaying the "Birds"
function drawBirds(){
  push();
  for(var i=0; i<birds.length; i++)
  {
    
    if(isOffScreen(birds[i]) )
    {
      removeFromWorld(birds[i]);
      birds.splice(i, 1)
      i-=1;
    }

    else
    {
      fill(255, 0, 0);
      drawVertices(birds[i].vertices)
    }

  }
  pop();
}
//Creating the Boxes
function setupTower(){
  //you code here
  for(var i=0; i<6; i++)
  {
    for(var j=0; j<3; j++)
    { 
      colors.push(color(0, random(150,255), 0));
      boxes.push(Bodies.rectangle(750+j*80, 0, 80, 80));
    }
  }
  World.add(engine.world, boxes);
}
//Displaying the Boxes
function drawTower(){
  push();
  for(var i=0; i<boxes.length; i++)
  { 
    fill(colors[i]);
    drawVertices(boxes[i].vertices);
      
    if (isOffScreen(boxes[i])) {
        removeFromWorld(boxes[i]);
        boxes.splice(i,1);
        colors.splice(i,1);
        i--;
    }
  }
  pop();
}
//Creating the slingshot
function setupSlingshot(){
//your code here
slingshotBird = Bodies.circle(150, 200, 20, {friction: 0, restitution: 0.95});
Matter.Body.setMass(slingshotBird , slingshotBird.mass*10);

var options = {bodyB:slingshotBird, pointA:{x:150, y:200}, stiffness:0.01, length:20,
 damping:0.0001}
slingshotConstraint = Constraint.create(options);
World.add(engine.world, [slingshotBird, slingshotConstraint]);
}
//Displaying the slingshot "Bird"
function drawSlingshot(){
  push();
  // your code here
  fill(255, 0, 0);
  drawVertices(slingshotBird.vertices);
  drawConstraint(slingshotConstraint);
  pop();
}
//Mouse interaction for the slingshot
function setupMouseInteraction(){
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}

//Creating the blocker. Every time a game starts it is of a random size.
function setupBlocker()
{
  blocker = Bodies.rectangle(650, random(180,400), 30, random(100,200), {isStatic: true});
  World.add(engine.world, [blocker]);
}
//Dispalying the blocker
function drawBlocker()
{
  push();
  fill(255,99,71);
  drawVertices(blocker.vertices); 
  pop();
}


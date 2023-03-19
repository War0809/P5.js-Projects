//Setting up variables
var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];
var score = 0;

//////////////////////////////////////////////////
function setup() {
  createCanvas(1200,800);
  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();

//Size and location of earth and the atmosphere
  atmosphereLoc = new createVector(width/2, height*2.9);
  atmosphereSize = new createVector(width*3, width*3);
  earthLoc = new createVector(width/2, height*3.1);
  earthSize = new createVector(width*3, width*3);
  
}

//////////////////////////////////////////////////
function draw() {
//Displaying the sky
  background(0);
  sky();
//Displaying the score
  fill(255);
  textSize(32);
  text("Score: " + score, 1000, 30);

  spaceship.run();
  asteroids.run();

  drawEarth();

  checkCollisions(spaceship, asteroids);
}

//Displaying earth and the atmosphere
function drawEarth(){
  noStroke();
  //draw atmosphere
  fill(0,0,255, 50);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x,  atmosphereSize.y);
  //draw earth    
  fill(100,255);
  ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}

//Checking all collisions
function checkCollisions(spaceship, asteroids){

//Checking spaceship collision with asteroids. If a collision occurs the function gameOver is run
    for(var i=0; i<asteroids.locations.length; i++){
      if(isInside(spaceship.location, spaceship.size, asteroids.locations[i], asteroids.diams[i])){
        gameOver()
      }
    }

//Checking asteroid collision with earth. If a collision occurs the function gameOver is run
    for(var i=0; i<asteroids.locations.length; i++){
      if(isInside(earthLoc, earthSize.x, asteroids.locations[i], asteroids.diams[i])){
        gameOver()
      }
    }

//Checking spaceship collision with earth. If a collision occurs the function gameOver is run
    if(isInside(earthLoc, earthSize.x, spaceship.location, spaceship.size)){
        gameOver()
      }

//Checking if spaceship is in atmosphere
    if(isInside(atmosphereLoc, atmosphereSize.x, spaceship.location, spaceship.size)){
        spaceship.setNearEarth()
      }

//Chceking bullet collisions with asteroids and removing the ones that are hit
    for(var i=0; i<asteroids.locations.length; i++){
      for(var j=0; j<spaceship.bulletSys.bullets.length; j++){
        if(asteroids.locations[i] != null && isInside(spaceship.bulletSys.bullets[j], spaceship.bulletSys.diam, asteroids.locations[i], asteroids.diams[i])){
            asteroids.destroy(i);
            spaceship.bulletSys.bullets.splice(j, 1);
            score += 1;
        }
      }
    }
}

//Checking collisions between objects A & B
function isInside(locA, sizeA, locB, sizeB){
    if(abs(locA.x - locB.x) < sizeA/2 + sizeB/2){
      if(abs(locA.y - locB.y) < sizeA/2 + sizeB/2){
        return true;
      }
    }
    return false;
}

//When spacebar on the keyboard is pressed bullets are fired 
function keyPressed(){
  if (keyIsPressed && keyCode === 32){
    spaceship.fire();
  }
}

//Ending the game and displaying "Game Over"
function gameOver(){
  fill(255);
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", width/2, height/2)
  noLoop();
}

//Displaying a star lit sky
function sky(){
  push();
  while (starLocs.length<300){
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i=0; i<starLocs.length; i++){
    rect(starLocs[i].x, starLocs[i].y,2,2);
  }

  if (random(1)<0.3) starLocs.splice(int(random(starLocs.length)),1);
  pop();
}

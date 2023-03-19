class Spaceship {

  constructor(){
    this.velocity = new createVector(0, 0);
    this.location = new createVector(width/2, height/2);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 5;
    this.bulletSys = new BulletSystem();
    this.size = 50;
      
    this.leftThruster = new createVector(12, 0);
    this.rightThruster = new createVector(-12, 0);
    this.topThruster = new createVector(0, 35);
    this.bottomThruster = new createVector(0, -35);
    
    this.ps = new ParticleSystem();
//Image being used was downloaded from "https://www.pngmart.com/image/26964"
    this.img = loadImage('spacecraft.png');
  }

  run(){
    this.bulletSys.run();
    this.draw();
    this.move();
    this.edges();
    this.interaction();    
  }

  draw(){
    image(this.img,this.location.x - 40, this.location.y - 40, 80, 80);
//    fill(255,191,0);
//    triangle(this.location.x - this.size/2, this.location.y + this.size/2,
//        this.location.x + this.size/2, this.location.y + this.size/2,
//        this.location.x, this.location.y - this.size/2);
  }

//Moving all asteroids
  move(){
    this.velocity.limit(this.maxVelocity);
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration = new createVector(0, 0);
      
    this.ps.run();   
  }

  applyForce(f){
    this.acceleration.add(f);
  }
    
//Spaceship keyboard interaction
  interaction(){
      
      let force = p5.Vector.fromAngle(this.location);
      
      if (keyIsDown(LEFT_ARROW)){
        this.applyForce(createVector(-0.1, 0));
        //Displaying thrust particles
        this.ps.addParticle(this.location,this.leftThruster, force);
      }
      if (keyIsDown(RIGHT_ARROW)){
        this.applyForce(createVector(0.1, 0));
        //Displaying thrust particles
        this.ps.addParticle(this.location,this.rightThruster,force);
      }
      if (keyIsDown(UP_ARROW)){
        this.applyForce(createVector(0, -0.1));
        //Displaying thrust particles
        this.ps.addParticle(this.location,this.topThruster,force);
      }
      if (keyIsDown(DOWN_ARROW)){
        this.applyForce(createVector(0, 0.1));
        //Displaying thrust particles
        this.ps.addParticle(this.location,this.bottomThruster,force);
      }
      
  }

  fire(){
    this.bulletSys.fire(this.location.x, this.location.y);
  }

  edges(){
    if (this.location.x<0) this.location.x=width;
    else if (this.location.x>width) this.location.x = 0;
    else if (this.location.y<0) this.location.y = height;
    else if (this.location.y>height) this.location.y = 0;
  }

  setNearEarth(){
    this.applyForce(new createVector(0, 0.05));
    this.applyForce(-this.velocity/30);
  }
}

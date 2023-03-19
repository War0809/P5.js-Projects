class BulletSystem {

  constructor(){
    this.bullets = [];
    this.velocity = new createVector(0, -5);
    this.diam = 10;
  }

  run(){
      this.move();
      this.draw();
      this.edges();
  }

  fire(x, y){
    this.bullets.push(createVector(x,y));
  }

//Displaying the bullets
  draw(){
    fill(255);
    for (var i=0; i<this.bullets.length; i++){
      ellipse(this.bullets[i].x, this.bullets[i].y, this.diam, this.diam);
    }
  }

//Updating the location of the bullets
  move(){
    for (var i=0; i<this.bullets.length; i++){
      this.bullets[i].y += this.velocity.y;
    }
  }

//Removing the bullets that go off screen
  edges(){
      for(var i=0; i<this.bullets.length; i++){
        if(this.bullets[i].y > 800){
          this.bullets[i].splice(i, 1)
        }
      }
  }
}

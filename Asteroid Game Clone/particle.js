class Particle {

  constructor(pos,tpos,dir) {
    this.acceleration = dir.copy();
    this.velocity = p5.Vector.random2D().mult(0.5);
    this.position = pos.copy();
    this.position.add(tpos);
    this.lifespan = 255.0;
  }

  run() {
    this.update();
    this.display();
  }

// Updating position
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2.0;
  }

// Displaying
  display() {
    noStroke();
    fill(255, this.lifespan);
    ellipse(this.position.x, this.position.y, 12, 12);
  }

//Checking if particle is still useful
  isDead() {
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}
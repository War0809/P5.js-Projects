class Particles {

    constructor(x,y){
        this.particles = [];
        this.lifespans = [];
        this.velocities = [];
        this.diam = 10;
        this.location = createVector(x + this.diam/2,y + this.diam/2);
        this.pluckStrength = 10;
    }
    
    run(){
        // Moving the particles
        this.move();
        // Destroying the particles going beyond the canvas
        for(var i = 0; i < this.particles.length; i++){
            if(this.lifespans[i] <= 0 || this.particles[i].x > 620){
                this.destroy(i);
                i--;
            }
            this.lifespans[i]--;
        }
        // Drawing the particles
        this.draw();
    }
    
    // Creating a particle and giving it direction
    createParticle(direction){
        this.particles.push(createVector(this.location.x,this.location.y));
        this.lifespans.push(5);
        this.velocities.push(direction);
    }
    
     //Creating the vibrating guitar strings
    pluck(){
        for(var i = 0; i < this.pluckStrength; i++){
            this.createParticle(createVector(random(-180,180), 1 ));
        }
    }
    
    // Drawing the particles
    draw() {
        fill(255);
        for(var i =0; i < this.particles.length; i++){
            // Draw the particles - width shrinks based on lifespan
            ellipse(this.particles[i].x, this.particles[i].y, this.diam * this.lifespans[i], this.diam/2);
        }
    }
    
    //Updating the location of the particles
    move(){
        for (var i=0; i<this.particles.length; i++){
            this.particles[i].y += this.velocities[i].y;
            this.particles[i].x += this.velocities[i].x;
        }
    }
    
    // Destroys the particle at a given index by removing it from the array
    destroy(index) {
        this.particles.splice(index,1);
        this.lifespans.splice(index,1);
        this.velocities.splice(index,1);
  }
}
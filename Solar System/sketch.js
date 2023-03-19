var speed;

function setup() {
    createCanvas(900, 700);
}

function draw() {
    background(0);
    speed = frameCount;
    
    translate(width/2, height/2);
    push();
    
    //Sun Spin
    rotate(radians(speed/3));
    celestialObj(color(255,150,0), 120); // SUN
    pop();
    
    //Earth Orbit around sun
    rotate(radians(speed));
    
    translate(200,0);
    push();
    
    //Earth Spin
    rotate(radians(speed));
    celestialObj(color(0,0,255),80); //Earth
    pop();
    
    //Moon 1
    push();
    rotate(radians(- speed*2)) //Moon Rotation
    translate(100,0);
    celestialObj(color(255,255,255),30);
    
    //Asteroid
    rotate(radians(- speed*4));
    translate(25,0);
    celestialObj(color(0,255,0),15)
    pop();
    
   // Moon 2
    push();
    rotate(radians(- speed*4)) //Moon 2 Rotation
    translate(70,0);
    celestialObj(color(255,255,255),20);
    pop();
}

function celestialObj(c, size){
    strokeWeight(5);
    fill(c);
    stroke(0);
    ellipse(0, 0, size, size);
    line(0, 0, size/2, 0);
}

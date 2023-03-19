//Array Declaration
    var confLocs = [];
    var confTheta = [];

function setup() {
    createCanvas(900, 800, WEBGL);
    
//Creating the sliders to control the size and speed
    
    //Slider properties
    label1 = createDiv('Size');
    label1.position(50,50);
    sizeSlider = createSlider(50, 500, 100); 
    sizeSlider.position(0, 20);
    sizeSlider.style('width', '200px');
    sizeSlider.parent(label1);
    
    label2 = createDiv('Speed');
    label2.position(50,100);
    speedSlider = createSlider(0, 15, 2); 
    speedSlider.position(0, 30);
    speedSlider.style('width', '200px');
    speedSlider.parent(label2);
    
//Pushing 3D vectors into confLocs array and a random angle into confTheta array
     for(var i = 0; i < 200; i++)
     {
      confLocs[i] = [(random(-500,500)), (random(-800,0)), (random(-500,500))];
      confTheta[i] = [random(0,360)];
     }
}

function draw() {
    background(125);
    angleMode(DEGREES);
    
//Setting the camera angle to rotate along the x axis
    var xLoc = cos(frameCount*0.2) * (height+450);
    var zLoc = sin(frameCount*0.2) * (height+450);
    
//Setting the camera to point to the centre
    camera(xLoc,-900, zLoc,0, 0, 0,0,1,0);
    
//Creating a loop to create the boxes
    for(var x = -400; x<= 400; x+=50)
        {
       for (var z = -400; z <= 400; z+=50)
            {
                push();
                translate(x, 0, z);
                
//Storing the values of x and z coordinates
                var distance = dist(0, 0, x, z);

//Storing the slider value
                var sliderval1 = sizeSlider.value();
                var sliderval2 = speedSlider.value();
                
//Storing the box height depending on the slider value
                var length = (((sin(360 * distance/600 + frameCount * sliderval2) + 1)/2) * 200)+sliderval1;

//Declaring variables for material and light
                var locX = mouseX - height / 2;
                var locY = mouseY - width / 2;
                
//Setting the ambient Light
                ambientLight(40, 40, 40);
                specularColor(255,0,0);
                pointLight(255, 0, 0, -locY, locX, 250);
                specularColor(0, 0, 255);
                pointLight(0, 0, 255, locY,locX, 250);
  
//Setting the material for the boxes
                specularMaterial(255);
                stroke(0);
                strokeWeight(2);        

//Creating the boxes    
                box(50, length , 50);
                pop();
            }
        }
        confetti();
}

//Confetti function
function confetti(){

//Setting the material and stroke for the confetti
    normalMaterial();
    noStroke();
    
//Looping over the confetti location array
    for(var j = 0; j < 200; j++)
        {
            push();
            
            var valx = confLocs[j][0];
            var valy = confLocs[j][1]+=1;
            var valz = confLocs[j][2];
            
//Translating values in the confetti location array
            translate(valx, valy, valz);
            
//Rotating the confetti using the values stored in the confetti position array, incrementing rotation by 10
            rotateX(confTheta[j][0]+=10);
            
//Setting the confetti size and shape
            plane(15,15);
            
//Checking the condition on the y coordinate
            if(valy > 0)
           {
               confLocs[j][1] = -800;
           }
            
            pop();
        }
}
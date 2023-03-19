//Declaring variables
var imgs = [];
var avgImg;
var numOfImages = 30;
var rand;
var imgsMoveMouse;

//Preload function to load images
function preload() { 
    for (var i = 0; i < numOfImages; i++) {
        var filename = 'assets/' + i + '.jpg';
        var tempImg = loadImage(filename);
        imgs.push(tempImg);
    }
}
//Setup function 
function setup() {
    createCanvas(imgs[0].width * 2, imgs[0].height);
    pixelDensity(1);
    avgImg = createGraphics(imgs[0].width, imgs[0].height);
    rand = floor(random() * numOfImages);
    imgsMoveMouse = 0;
}
//Draw function
function draw() {
    background(125);
    image(imgs[rand], 0, 0);
    avgImg.loadPixels();
    for (var i = 0; i < numOfImages; i++) {
        imgs[i].loadPixels();
    }

    let r = color(255, 0, 0);

    for (var y = 0; y < imgs[0].height; y++) {
        for (var x = 0; x < imgs[0].width; x++) {
            var index = ((imgs[0].width * y) + x) * 4;
            avgImg.set(width / 2 + x, y, r);
            var sumR = 0;
            var sumG = 0;
            var sumB = 0;
            for (var i = 0; i < numOfImages; i++) {
                sumR += imgs[i].pixels[index];
                sumG += imgs[i].pixels[index + 1];
                sumB += imgs[i].pixels[index + 2];
            }
            //Saving average face values in a vector
            var i = sumR / imgs.length;
            var j = sumG / imgs.length;
            var k = sumB / imgs.length;
            //Creating vectors
            var v1 = createVector(imgs[rand].pixels[index],
                imgs[rand].pixels[index + 1],
                imgs[rand].pixels[index + 2])
            var v2 = createVector(i, j, k);
            //Using lerp function on the two vectors when moving mouse over image
            var v3 = p5.Vector.lerp(v1, v2, imgsMoveMouse);
            avgImg.pixels[index] = v3.x;
            avgImg.pixels[index + 1] = v3.y;
            avgImg.pixels[index + 2] = v3.z;
        }
    }
    avgImg.updatePixels();
    image(avgImg, width / 2, 0);
    noLoop();
}

//Showing a random picture when the spacebar is pressed
function keyPressed() {
    if (keyCode == 32) {
        rand = floor(random() * numOfImages);
        draw();
    }
}

//Function to create the average face effect when the mouse is moved over the picture
function mouseMoved() {
    imgsMoveMouse = mouseX / width;
    loop();
}

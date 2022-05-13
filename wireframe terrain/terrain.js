
// Screen size is window size
const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

// Set scale and grid for the terrain
var cols, rows;
var scl = 18;
var w = 2000;
var h = 700;
var terrain = [];
var flying = 0;

// Background constants
//let colorTop, colorBottom;

// Create canvas
function setup() {
    createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT, WEBGL);
    cols = w / scl;
    rows = h / scl;

    for (var x = 0; x < cols; x++) {
        terrain[x] = [];

        for (var y = 0; y < rows; y++) {
            terrain[x][y] = 0; //specify a default value for now
        }
    }

    /*      Linear gradient backround (doesn't work)
    colorTop = color(0, 0, 102);
    colorBottom = color(102, 0, 77);

    for(let y2=0; y2 < height; y2++){
        n = map(y2, 0, SCREEN_HEIGHT, 0, 1);
        let newc = lerpColor(colorTop, colorBottom,n);
        background(newc);
        line(0, y2, SCREEN_WIDTH, y2);
    } */
}

// Draw terrain & move through it
function draw() {
    // flying is the speed of the "camera"
    flying -= 0.06;

    var yOffset = flying;
    for (var y = 0; y < rows; y++) {
        var xOffset = 0;

        for (var x = 0; x < cols; x++) {
            terrain[x][y] = map(noise(xOffset, yOffset), 0, 1, -100, 100);
            xOffset += 0.2;
        }
        yOffset += 0.2;
    }

    background(0, 0, 102);      // Background color
    stroke(255, 82, 241);       // Wireframe color RGB
    fill(0, 0, 0);              // Terrain fill color RGB
    translate(0, 50);
    rotateX(PI / 3);
    translate(-w / 2, -h / 2);
    for (var y = 0; y < rows - 1; y++) {
        beginShape(TRIANGLE_STRIP);

        for (var x = 0; x < cols; x++) {
            vertex(x * scl, y * scl, terrain[x][y]);
            vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
        }
        endShape();
    }

}



"use strict";  // gives improved error-checking in scripts.

var canvas;    // The canvas element on which we will draw.
var graphics;  // A 2D graphics context for drawing on the canvas.
var pixelSize; // The size of a pixel in the coordinate system; set up by
//    applyWindowToViewportTransform function when it is called.

/**
 *  The draw() function is called by init() after the page loads,
 *  to draw the content of the canvas.  At the start, clear the canvas
 *  and save a copy of the state; restore the state at the end.  (These
 *  actions are not necessary in this program, since the function will
 *  only be called once.)
 */

const customColor = "#a000ff";

function drawFace() {

    const eyeX = 150;
    const eyeY = 150;
    const eyeSpacing = 100;

    const eyeSize = 12;
    const pupilSize = 8;

    const sparkleX = eyeX - 4;
    const sparkleY = eyeY - 4;
    const sparkleSize = 2;

    const mouthX = 210;
    const mouthY = 220;
    const mouthSizeX = 20;
    const mouthSizeY = 15;

    const topLipY = mouthY - 5;
    const bottomLipY = mouthY - 10;
    const lipSizeX = 24;
    const topLipSizeY = 8;
    const bottomLipSizeY = 8;

    const cheekX = mouthX - 20;
    const cheekY = mouthY + 2;
    const cheekSpacing = 40;
    const cheekSize = 5;

    const toothX = mouthX - 4;
    const toothY = mouthY + 4;
    const teethSpacing = 6.5;
    const teethSize = 6;

    const mouthCornerX = mouthX - 25;
    const mouthCornerY = mouthY + 2;
    const mouthCornerSpacing = 50;
    const mouthCornerSize = 7;

    //Eyes
    graphics.fillStyle = 'white';
    graphics.fillCircle(eyeX, eyeY, eyeSize);
    graphics.fillCircle(eyeX + eyeSpacing, eyeY, eyeSize);

    //Pupils
    graphics.fillStyle = 'black';
    graphics.fillCircle(eyeX, eyeY, pupilSize);
    graphics.fillCircle(eyeX + eyeSpacing, eyeY, pupilSize);

    //Sparkles
    graphics.fillStyle = 'white';
    graphics.fillCircle(sparkleX, sparkleY, sparkleSize);
    graphics.fillCircle(sparkleX + eyeSpacing, sparkleY, sparkleSize);



    //Mouth
    graphics.fillStyle = 'black';
    graphics.fillOval(mouthX, mouthY, mouthSizeX, mouthSizeY);

    //Mouth shape - lip
    graphics.fillStyle = customColor;
    graphics.fillOval(mouthX, topLipY, lipSizeX, topLipSizeY);
    graphics.fillOval(mouthX, bottomLipY, lipSizeX, bottomLipSizeY);

    //Cheeks
    graphics.fillStyle = 'black';
    graphics.fillCircle(cheekX, cheekY, cheekSize);
    graphics.fillCircle(cheekX + cheekSpacing, cheekY, cheekSize);

    //Mouth corners
    graphics.fillStyle = customColor;
    graphics.fillCircle(mouthCornerX, mouthCornerY, mouthCornerSize);
    graphics.fillCircle(mouthCornerX + mouthCornerSpacing, mouthCornerY, mouthCornerSize);



    //Teeth
    graphics.fillStyle = 'white';
    graphics.fillRect(toothX, toothY, teethSize, teethSize);
    graphics.fillRect(toothX + teethSpacing, toothY, teethSize, teethSize);
}

function draw() {
    //Wariant 5

    graphics.clearRect(0, 0, 600, 600);

    addGraphicsContextExtras(graphics);

    const polygonSidesNumber = 6;
    const radius = 120;

    let points = [];

    for (let i = 0; i < polygonSidesNumber * 2; i += 2) {
        points[i] = 200 + (radius * Math.cos((Math.PI / polygonSidesNumber) * i));
        points[i + 1] = 200 + (radius * Math.sin((Math.PI / polygonSidesNumber) * i));
    }

    points[9] += 5;

    graphics.fillStyle = customColor;
    graphics.lineWidth = 5;

    graphics.fillPoly(
        ...points
    );

    graphics.strokePoly(
        ...points
    );

    drawFace();

} // end of draw()


/**
 * Sets up a transformation in the graphics context so that the canvas will
 * show x-values in the range from left to right, and y-values in the range
 * from bottom to top.  If preserveAspect is true, then one of the ranges
 * will be increased, if necessary, to account for the aspect ratio of the
 * canvas.  This function sets the global variable pixelsize to be the
 * size of a pixel in the new coordinate system.  (If preseverAspect is
 * true, pixelSize is the maximum of its horizontal and vertical sizes.)
 */
function applyWindowToViewportTransformation(left, right, bottom, top, preserveAspect) {
    var displayAspect, windowAspect;
    var excess;
    var pixelwidth, pixelheight;
    if (preserveAspect) {
        // Adjust the limits to match the aspect ratio of the drawing area.
        displayAspect = Math.abs(canvas.height / canvas.width);
        windowAspect = Math.abs((top - bottom) / (right - left));
        if (displayAspect > windowAspect) {
            // Expand the viewport vertically.
            excess = (top - bottom) * (displayAspect / windowAspect - 1);
            top = top + excess / 2;
            bottom = bottom - excess / 2;
        }
        else if (displayAspect < windowAspect) {
            // Expand the viewport vertically.
            excess = (right - left) * (windowAspect / displayAspect - 1);
            right = right + excess / 2;
            left = left - excess / 2;
        }
    }
    graphics.scale(canvas.width / (right - left), canvas.height / (bottom - top));
    graphics.translate(-left, -top);
    pixelwidth = Math.abs((right - left) / canvas.width);
    pixelheight = Math.abs((bottom - top) / canvas.height);
    pixelSize = Math.max(pixelwidth, pixelheight);
}  // end of applyWindowToViewportTransformation()


/**
 * This function can be called to add a collection of extra drawing function to
 * a graphics context, to make it easier to draw basic shapes with that context.
 * The parameter, graphics, must be a canvas 2d graphics context.
 *
 * The following new functions are added to the graphics context:
 *
 *    graphics.strokeLine(x1,y1,x2,y2) -- stroke the line from (x1,y1) to (x2,y2).
 *    graphics.fillCircle(x,y,r) -- fill the circle with center (x,y) and radius r.
 *    graphics.strokeCircle(x,y,r) -- stroke the circle.
 *    graphics.fillOval(x,y,r1,r2) -- fill oval with center (x,y) and radii r1 and r2.
 *    graphics.stokeOval(x,y,r1,r2) -- stroke the oval
 *    graphics.fillPoly(x1,y1,x2,y2,...) -- fill polygon with vertices (x1,y1), (x2,y2), ...
 *    graphics.strokePoly(x1,y1,x2,y2,...) -- stroke the polygon.
 *    graphics.getRGB(x,y) -- returns the color components of pixel at (x,y) as an array of
 *         four integers in the range 0 to 255, in the order red, green, blue, alpha.
 *
 * (Note that "this" in a function that is called as a member of an object refers to that
 * object.  Here, this will refer to the graphics context.)
 */
function addGraphicsContextExtras(graphics) {
    graphics.strokeLine = function (x1, y1, x2, y2) {
        this.beginPath();
        this.moveTo(x1, y1);
        this.lineTo(x2, y2);
        this.stroke();
    }
    graphics.fillCircle = function (x, y, r) {
        this.beginPath();
        this.arc(x, y, r, 0, 2 * Math.PI, false);
        this.fill();
    }
    graphics.strokeCircle = function (x, y, radius) {
        this.beginPath();
        this.arc(x, y, radius, 0, 2 * Math.PI, false);
        this.stroke();
    }
    graphics.fillPoly = function () {
        if (arguments.length < 6)
            return;
        this.beginPath();
        this.moveTo(arguments[0], arguments[1]);
        for (var i = 2; i + 1 < arguments.length; i = i + 2) {
            this.lineTo(arguments[i], arguments[i + 1]);
        }
        this.closePath();
        this.fill();
    }
    graphics.strokePoly = function () {
        if (arguments.length < 4)
            return;
        this.beginPath();
        this.moveTo(arguments[0], arguments[1]);
        for (var i = 2; i + 1 < arguments.length; i = i + 2) {
            this.lineTo(arguments[i], arguments[i + 1]);
        }
        this.closePath();
        this.stroke();
    }
    graphics.fillOval = function (x, y, horizontalRadius, verticalRadius) {
        this.save();
        this.translate(x, y);
        this.scale(horizontalRadius, verticalRadius);
        this.beginPath();
        this.arc(0, 0, 1, 0, 2 * Math.PI, false);
        this.restore();
        this.fill();
    }
    graphics.strokeOval = function (x, y, horizontalRadius, verticalRadius) {
        this.save();
        this.translate(x, y);
        this.scale(horizontalRadius, verticalRadius);
        this.beginPath();
        this.arc(0, 0, 1, 0, 2 * Math.PI, false);
        this.restore();
        this.stroke();
    }
    graphics.getRGB = function (x, y) {
        var color = this.getImageData(x, y, 1, 1);
        return color.data;
    }
}    // end of addGraphicsContextExtras()

/**
 * The init() funciton is called after the page has been
 * loaded.  It initializes the canvas and graphics variables.
 * It calles addGraphicsContextExtras(graphics) to add the extra
 * drawing functions to the graphics context, and it calls draw()
 * to draw on the canvas.
 */
function init() {
    try {
        canvas = document.getElementById("canvas");
        graphics = canvas.getContext("2d");
    } catch (e) {
        document.getElementById("canvasholder").innerHTML =
            "Canvas graphics is not supported.<br>" +
            "An error occurred while initializing graphics.";
    }
    addGraphicsContextExtras(graphics);
    draw();  // Call draw() to draw on the canvas.
}

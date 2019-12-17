// Assignment 3
// clipping

const VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Colour;\n' +
  'varying vec4 v_Colour;\n' +
  'uniform mat4 u_xformMatrix;\n' +
  'void main() {\n' +
  '  v_Colour = a_Colour;\n' +
  '  gl_Position = a_Position;\n' +
  '}\n';

const FSHADER_SOURCE =
  'precision mediump float;\n' +
  'varying vec4 v_Colour;\n' +
  'void main() {\n' +
  '  gl_FragColor = v_Colour;\n' +
  '}\n';

//track the state of the mouse
var currDown = false;

//track the position of the line endpoints
var startx;
var starty;
var endx;
var endy;
var drag = [];
var area = [];
var temp = [];
var tempDrag = [];

// algoC is true if Cohen is selected
var algoC = true;

var n;

// canvas info
var maxx = 0.8;
var maxy = 0.8;
var minx = -0.8;
var miny = -0.8;

// xy variables for clipping
var x1;
var y1;
var x2;
var y2;

function main() {

  canvas = document.getElementById('webgl');
  gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  n = initVertexBuffers(gl);
  if (n < 0) {
    console.log("Failed to initVertexBuffers");
    return;
  }

  //gl.clearColor(1, 1, 1, 1);

  window.addEventListener("keydown", swap, true);
  canvas.onmousedown = function(win) {
    startx = win.clientX;
    starty = win.clientY;
    currDown = true;
  };
  canvas.onmousemove = function(win) {
    if (currDown) {
      endx = win.clientX;
      endy = win.clientY;
      tempDrag = area;
      n = initDrag(gl);
      drawD(gl);
    }
  };
  canvas.onmouseup = function(win) {
    currDown = false;
    temp = area;
    clip(gl);
  };

  draw(gl);
}

// for the reset functionality of the program
function reset() {
  temp = [];
  tempDrag = [];
  drag = [];
  area = [];
  algoC = true;
  var algorithmChoice = document.getElementById("algorithmChoice");
  algorithmChoice.innerHTML = "Using: Cohen-Sutherland";
  n = initVertexBuffers(gl);
  draw(gl);
}

// swaps between the two algorithms
function swap(arg) {
  if (arg.keyCode == 82) {
    reset();
  } else if (arg.keyCode == 83) {
    algoC = !algoC;
    var algorithmChoice = document.getElementById("algorithmChoice");
    algorithmChoice.innerHTML = algoC ? "Using: Cohen-Sutherland" : "Using: Liang-Barsky";
  }
}

// draws all the stuff
function draw(gl) {
  gl.clearColor(0.7, 0.7, 0.7, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.LINE_LOOP, 0, 4);
  gl.drawArrays(gl.LINES, 4, n - 4);
}

// initializze the vertex buffers
function initVertexBuffers(gl) {
  area = [minx, maxy, 0.968, 0.454, 0.941,
    minx, miny, 0.968, 0.454, 0.941,
    maxx, miny, 0.968, 0.454, 0.941,
    maxx, maxy, 0.968, 0.454, 0.941
  ];

  if (temp.length != 0) {
    for (var i = 0; i < temp.length; i++) {
      area[i] = temp[i];
    }
  }

  var n = area.length / 5;
  var verticesColours = new Float32Array(area);
  var vBuffer = gl.createBuffer();
  var FSIZE = verticesColours.BYTES_PER_ELEMENT;
  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, verticesColours, gl.STATIC_DRAW);

  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(gl.program.a_Position, 2, gl.FLOAT, false, 5 * FSIZE, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(gl.program.a_Position);

  // Assign the buffer object to a_Position variable
  var a_Colour = gl.getAttribLocation(gl.program, 'a_Colour');
  gl.vertexAttribPointer(a_Colour, 3, gl.FLOAT, false, 5 * FSIZE, 2 * FSIZE);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Colour);

  return n;
}

// draws drag
function drawD(gl) {
  gl.clearColor(0.7, 0.7, 0.7, 1);

  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.LINE_LOOP, 0, 4);
  gl.drawArrays(gl.LINES, 4, n - 4);
}


// initialize the drag thing
function initDrag(gl) {

  drag = [minx, maxy, 0.9, 0.5, 0.9,
    minx, miny, 0.9, 0.5, 0.9,
    maxx, miny, 0.9, 0.5, 0.9,
    maxx, maxy, 0.9, 0.5, 0.9
  ];

  if (tempDrag.length != 0) {
    for (var i = 0; i < tempDrag.length; i++) {
      drag[i] = tempDrag[i];
    }
  }

  var rect = canvas.getBoundingClientRect();

  if (startx != null && starty != null && endx != null && endy != null) {

    // add the first point of the line
    drag.push((startx - rect.left) / canvas.height * 2 - 1);
    drag.push((starty - rect.top) / canvas.width * -2 + 1);
    drag.push(1.0);
    drag.push(0.0);
    drag.push(0.0);

    // add the second point of the line
    drag.push((endx - rect.left) / canvas.height * 2 - 1);
    drag.push((endy - rect.top) / canvas.width * -2 + 1);
    drag.push(1.0);
    drag.push(0.0);
    drag.push(0.0);
  }

  var n = drag.length / 5;
  var verticesColours = new Float32Array(drag);

  var vBuffer = gl.createBuffer();
  if (!vBuffer) {
    console.log('Failed to create the buffer object');
    return false;
  }

  var FSIZE = verticesColours.BYTES_PER_ELEMENT;
  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, verticesColours, gl.STATIC_DRAW);

  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(gl.program.a_Position, 2, gl.FLOAT, false, 5 * FSIZE, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(gl.program.a_Position);

  // Assign the buffer object to a_Position variable
  var a_Colour = gl.getAttribLocation(gl.program, 'a_Colour');
  gl.vertexAttribPointer(a_Colour, 3, gl.FLOAT, false, 5 * FSIZE, 2 * FSIZE);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Colour);

  return n;
}

function clip(gl) {

  var rect = canvas.getBoundingClientRect();

  x1 = ((startx - rect.left) / canvas.height * 2) - 1;
  y1 = ((starty - rect.top) / canvas.width * -2) + 1;
  x2 = ((endx - rect.left) / canvas.height * 2) - 1;
  y2 = ((endy - rect.top) / canvas.width * -2) + 1;

  if (algoC) {
    p = clipCS();
  } else {
    p = clipLB();
  }
  pushAll(rect);
  if (p != 0) {
    pushIf();
  }
  n = initVertexBuffers(gl);
  draw(gl);
}

function pushAll(rect) {
  temp.push((startx - rect.left) / canvas.height * 2 - 1);
  temp.push((starty - rect.top) / canvas.width * -2 + 1);
  temp.push(1.0);
  temp.push(0.0);
  temp.push(0.0);
  temp.push((endx - rect.left) / canvas.height * 2 - 1);
  temp.push((endy - rect.top) / canvas.width * -2 + 1);
  temp.push(1.0);
  temp.push(0.0);
  temp.push(0.0);
}

function pushIf() {
  temp.push(x1);
  temp.push(y1);
  temp.push(0.0);
  temp.push(0.0);
  temp.push(0.0);
  temp.push(x2);
  temp.push(y2);
  temp.push(0.0);
  temp.push(0.0);
  temp.push(0.0);
}

// cohen-sutherland
function clipCS() {
  m = (y1 - y2) / (x1 - x2);
  b = (m * -1) * x1 + y1;
  var larb1 = (x1 < minx ? 8 : 0) + (y1 > maxy ? 4 : 0) + (x1 > maxx ? 2 : 0) + (y1 < miny ? 1 : 0);
  var larb2 = (x2 < minx ? 8 : 0) + (y2 > maxy ? 4 : 0) + (x2 > maxx ? 2 : 0) + (y2 < miny ? 1 : 0);


  while (true) {
    if (larb1 == 0 && larb2 == 0) {
      return 1;
    }
    if ((larb1 & larb2) != 0) {
      return 0;
    }
    if (larb1 != 0) { //if p1 is outside
      if ((larb1 & 8) != 0) { //if p1 is to the left edge
        y1 = minx * m + b; //chop
        x1 = minx;
        larb1 = larb1 & 7;
      } else if ((larb1 & 2) != 0) { //if p1 is to the right edge
        y1 = m * maxx + b; //chop
        x1 = maxx;
        larb1 = larb1 & 13;
      } else if ((larb1 & 1) != 0) { //if p1 is to the bottom edge
        x1 = (miny - b) / m; //chop
        y1 = miny;
        larb1 = larb1 & 14;
      } else { //else chop top edge
        x1 = (maxy - b) / m;
        y1 = maxy;
        larb1 = larb1 & 11;
      }
    } else {
      if ((larb2 & 8) != 0) { //if p2 is to the left edge
        y2 = m * minx + b; //chop
        x2 = minx;
        larb2 = larb2 & 7;
      } else if ((larb2 & 2) != 0) { //if p2 is to the right edge
        y2 = m * maxx + b; //chop
        x2 = maxx;
        larb2 = larb2 & 13;
      } else if ((larb2 & 1) != 0) { //if p2 is to the bottom edge
        x2 = (miny - b) / m; //chop
        y2 = miny;
        larb2 = larb2 & 14;
      } else { //else chop top edge
        x2 = (maxy - b) / m;
        y2 = maxy;
        larb2 = larb2 & 11;
      }
    }
  }
}

// Liang-Barsky
function clipLB() {
  var t0 = 0;
  var t1 = 1;
  var dx = x2 - x1;
  var dy = y2 - y1;
  var p, q, r;

  for (var e = 0; e < 4; e++) {
    switch (e) {
      case 0:
        p = -1 * dx;
        q = -1 * (minx - x1);
        break;
      case 1:
        p = dx;
        q = (maxx - x1);
        break;
      case 2:
        p = -1 * dy;
        q = -1 * (miny - y1);
        break;
      case 3:
        p = dy;
        q = (maxy - y1);
        break;
    }

    r = q / p;
    if (p == 0 && q < 0) { //if outside, return
      return 0;
    }
    if (p < 0) {
      if (r > t1) { //skip this edge
        return 0;
      } else if (r > t0) { //clipped lower
        t0 = r;
      }
    } else if (p > 0) {
      if (r < t0) { //skip this edge
        return 0;
      } else if (r < t1) { //clipped lower
        t1 = r;
      }
    }
  }
  x1 = x1 + t0 * dx;
  y1 = y1 + t0 * dy;
  x2 = x1 + t1 * dx;
  y2 = y1 + t1 * dy;
  return 1;
}
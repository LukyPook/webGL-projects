const VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  v_Color = a_Color;\n' +
  '  gl_Position = a_Position;\n' +
  '  gl_PointSize = 2.0;\n' +
  '}\n';

// Fragment shader program
const FSHADER_SOURCE =
  'precision mediump float;\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
    'gl_FragColor = v_Color;\n' +
  '}\n';

let canvas,
    gl;

function main() {

  // Retrieve <canvas> element and the rendering context
  canvas = document.getElementById('webgl');
  gl = getWebGLContext(canvas);
  if (!gl) {  //optional
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders using the cuon-utils library
  //returns gl.program object - if it exists, shaders created correcly
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  //CODE FOR STEP 1B
  // Pass the anvas width and height to fragent shader
  //gl.program.u_Width = gl.getUniformLocation(gl.program, 'u_Width');
  //gl.program.u_Height = gl.getUniformLocation(gl.program, 'u_Height');
  gl.program.a_Color = gl.getAttribLocation(gl.program, 'a_Color');


  // Pass vertex position to attribute variable
  gl.program.a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if(gl.program.a_Position < 0){
    console.log('Failed to find the attribute variable a_Position');
    return;
  }

  // Write the positions of vertices to a vertex shader
  var numOfVertices = initVertexBuffers();

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  draw(numOfVertices);
}

function draw(numVertices){
  //clear the canvas
  gl.clear(gl.COLOR_BUFFER_BIT);
  // Draw the triangles
  gl.uniform1f(gl.program.u_Width, canvas.width);
  gl.uniform1f(gl.program.u_Height, canvas.height);

  
  gl.drawArrays(gl.TRIANGLE_STRIP, 102, 4);
  for(i = 106; i < 406; ++i) {
	  gl.drawArrays(gl.POINTS, i, 1);
  }
  gl.drawArrays(gl.LINE_STRIP, 18, 2);
  gl.drawArrays(gl.LINE_STRIP, 20, 2);
  gl.drawArrays(gl.LINE_STRIP, 22, 2);
  gl.drawArrays(gl.LINE_STRIP, 24, 2);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  gl.drawArrays(gl.TRIANGLES, 3, 3);
  gl.drawArrays(gl.TRIANGLES, 6, 3);
  gl.drawArrays(gl.TRIANGLES, 9, 3);
  gl.drawArrays(gl.TRIANGLES, 12, 3);
  gl.drawArrays(gl.TRIANGLE_FAN, 26, 4);
  gl.drawArrays(gl.LINE_LOOP, 30, 2);
  gl.drawArrays(gl.LINE_STRIP, 32, 2);
  gl.drawArrays(gl.LINES, 34, 2);
  gl.drawArrays(gl.LINE_STRIP, 36, 2);
  gl.drawArrays(gl.LINES, 38, 2);
  gl.drawArrays(gl.LINE_STRIP, 40, 2);
  gl.drawArrays(gl.LINES, 42, 2);
  gl.drawArrays(gl.LINE_STRIP, 44, 2);
  gl.drawArrays(gl.LINES, 46, 56);


}
//TODO Line_Strip, line_loop, triangle_strip,

function initVertexBuffers() {

  const sailboatAndColor = [0.0, 0.0, 0.0, 0.654, 0.792, 1,
                            -0.27, -0.45, 0.0, 0.654, 0.792, 1,
                            0.0, -0.55, 0.0, 0.654, 0.792, 1,

                            0.0, 0.0, 0.0, 0.439, 0.627, 0.874,
                            0.0, -0.55, 0.0, 0.439, 0.627, 0.874,
                            0.2, -0.48, 0.0, 0.439, 0.627, 0.874,

                            0.0, -0.55, 0.0, 0.317, 0.572, 0.831,
                            -0.45, -0.8, 0.0, 0.317, 0.572, 0.831,
                            0.45, -0.8, 0.0, 0.317, 0.572, 0.831,

                            -0.45, -0.8, 0.0, 0.450, 0.588, 0.854,
                            -0.65, -0.3, 0.0, 0.450, 0.588, 0.854,
                            0.0, -0.55, 0.0, 0.450, 0.588, 0.854,

                            0.45, -0.8, 0.0, 0.450, 0.627, 0.854,
                            0.65, -0.3, 0.0, 0.0, 0.0, 0.0,
                            0.0, -0.55, 0.0, 0.450, 0.627, 0.854,

                            // points for stars
                            0.45, 0.8, 0.0, 0.992, 0.937, 0.274,
							
                            -0.46, 0.75, 0.0, 0.992, 0.937, 0.274,
							
                            -0.2, 0.75, 0.0, 0.992, 0.937, 0.274,

                            // lines for the mast
                            0.1, -0.45, 0.0, 0.368, 0.294, 0.149,
                            0.1, 0.25, 0.0, 0.368, 0.294, 0.149,
							
                            0.105, -0.45, 0.0, 0.368, 0.294, 0.149,
                            0.105, 0.25, 0.0, 0.368, 0.294, 0.149,
							
                            0.11, -0.45, 0.0, 0.368, 0.294, 0.149,
                            0.11, 0.25, 0.0, 0.368, 0.294, 0.149,
							
                            0.115, -0.45, 0.0, 0.368, 0.294, 0.149,
                            0.115, 0.25, 0.0, 0.368, 0.294, 0.149,

                            // flag
                            0.0575, 0.25, 0.0, 1.0, 0.0, 0.0,
                            0.0575, 0.1, 0.0, 1.0, 0.0, 0.0,
							
                            0.1575, 0.25, 0.0, 0.0, 0.0, 0.0,
                            0.1575, 0.1, 0.0, 0.0, 0.0, 0.0,

                            // water
							-1.0, -0.8, 0.0, 0.0, 0.0, 1.0,
							1.0, -0.8, 0.0, 0.0, 0.0, 1.0,
							
							-1.0, -0.805, 0.0, 0.0, 0.0, 1.0,
							1.0, -0.805, 0.0, 0.0, 0.0, 1.0,
							
							-1.0, -0.81, 0.0, 0.0, 0.0, 1.0,
							1.0, -0.81, 0.0, 0.0, 0.0, 1.0,
							
							-1.0, -0.815, 0.0, 0.0, 0.0, 1.0,
							1.0, -0.815, 0.0, 0.0, 0.0, 1.0,
							
							-1.0, -0.82, 0.0, 0.0, 0.0, 1.0,
							1.0, -0.82, 0.0, 0.0, 0.0, 1.0,
							
							-1.0, -0.825, 0.0, 0.0, 0.0, 1.0,
							1.0, -0.825, 0.0, 0.0, 0.0, 1.0,
							
							-1.0, -0.83, 0.0, 0.0, 0.0, 1.0,
							1.0, -0.83, 0.0, 0.0, 0.0, 1.0,
							
							-1.0, -0.835, 0.0, 0.0, 0.0, 1.0,
							1.0, -0.835, 0.0, 0.0, 0.0, 1.0,
							
							-1.0, -0.84, 0.0, 0.0, 0.0, 1.0,
							1.0, -0.84, 0.0, 0.0, 0.0, 1.0,
							
							-1.0, -0.845, 0.0, 0.0, 0.0, 1.0,
							1.0, -0.845, 0.0, 0.0, 0.0, 1.0,
							
							-1.0, -0.85, 0.0, 0.0, 0.0, 1.0,
							1.0, -0.85, 0.0, 0.0, 0.0, 1.0,
							
							-1.0, -0.855, 0.0, 0.0, 0.0, 1.0,
							1.0, -0.855, 0.0, 0.0, 0.0, 1.0,
							
							-1.0, -0.86, 0.0, 0.0, 0.0, 1.0,
							1.0, -0.86, 0.0, 0.0, 0.0, 1.0,
							
							-1.0, -0.865, 0.0, 0.0, 0.0, 1.0,
							1.0, -0.865, 0.0, 0.0, 0.0, 1.0,
							
							-1.0, -0.87, 0.0, 0.0, 0.0, 1.0,
							1.0, -0.87, 0.0, 0.0, 0.0, 1.0,
							
							-1.0, -0.875, 0.0, 0.0, 0.0, 1.0,
							1.0, -0.875, 0.0, 0.0, 0.0, 1.0,
							
							-1.0, -0.88, 0.0, 0.0, 0.0, 1.0,
							1.0, -0.88, 0.0, 0.0, 0.0, 1.0,
							
							-1.0, -0.885, 0.0, 0.0, 0.0, 1.0,
							1.0, -0.885, 0.0, 0.0, 0.0, 1.0,
							
							-1.0, -0.89, 0.0, 0.0, 0.0, 1.0,
							1.0, -0.89, 0.0, 0.0, 0.0, 1.0,
							
							-1.0, -0.895, 0.0, 0.0, 0.0, 1.0,
							1.0, -0.895, 0.0, 0.0, 0.0, 1.0,
							
							-1.0, -0.9, 0.0, 0.0, 0.0, 1.0,
							1.0, -0.9, 0.0, 0.0, 0.0, 1.0,
							
							-1.0, -0.905, 0.0, 0.0, 0.0, 1.0,
							1.0, -0.905, 0.0, 0.0, 0.0, 1.0,
							
							-1.0, -0.910, 0.0, 0.0, 0.0, 1.0,
							1.0, -0.910, 0.0, 0.0, 0.0, 1.0,
							
							-1.0, -0.915, 0.0, 0.0, 0.0, 1.0,
							1.0, -0.915, 0.0, 0.0, 0.0, 1.0,
							
							-1.0, -0.92, 0.0, 0.0, 0.0, 1.0,
							1.0, -0.92, 0.0, 0.0, 0.0, 1.0,
							
							-1.0, -0.925, 0.0, 0.0, 0.0, 1.0,
							1.0, -0.925, 0.0, 0.0, 0.0, 1.0,
							
							-1.0, -0.93, 0.0, 0.0, 0.0, 1.0,
							1.0, -0.93, 0.0, 0.0, 0.0, 1.0,
							
							-1.0, -0.935, 0.0, 0.0, 0.0, 1.0,
							1.0, -0.935, 0.0, 0.0, 0.0, 1.0,
							
							-1.0, -0.94, 0.0, 0.0, 0.0, 1.0,
							1.0, -0.94, 0.0, 0.0, 0.0, 1.0,
							
							-1.0, -0.945, 0.0, 0.0, 0.0, 1.0,
							1.0, -0.945, 0.0, 0.0, 0.0, 1.0,
							
							-1.0, -0.95, 0.0, 0.0, 0.0, 1.0,
							1.0, -0.95, 0.0, 0.0, 0.0, 1.0,
							
							-1.0, -0.955, 0.0, 0.0, 0.0, 1.0,
							1.0, -0.955, 0.0, 0.0, 0.0, 1.0,
							
							-1.0, -0.96, 0.0, 0.0, 0.0, 1.0,
							1.0, -0.96, 0.0, 0.0, 0.0, 1.0,
							
							-1.0, -0.965, 0.0, 0.0, 0.0, 1.0,
							1.0, -0.965, 0.0, 0.0, 0.0, 1.0,
							
							-1.0, -0.97, 0.0, 0.0, 0.0, 1.0,
							1.0, -0.97, 0.0, 0.0, 0.0, 1.0,
							
							-1.0, -0.975, 0.0, 0.0, 0.0, 1.0,
							1.0, -0.975, 0.0, 0.0, 0.0, 1.0,
							//strip triangle
							1.0, 0.0, 0.0, 0.0, 0.0, 0.0,
							-1.0, 1.0, 0.0, 0.4, 0.0, 0.0,
							1.0, 1.0, 0.0, 0.4, 0.0, 0.0,
							-1.0, 0.0, 0.0, 0.0, 0.0, 0.0,
							
							
							
							
							
							                 
                      ];
					  console.log(sailboatAndColor.length);
					  for(i = 0; i < 300; ++i) {
						  sailboatAndColor.push(Math.random() * 2 - 1, Math.random() * 2 - 0.8, 0.0, 1.0, 1.0, 0.0);
					  }

  // (1) Create a buffer object
  const vertexBuffer = gl.createBuffer();
  // (2) Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // (3) Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sailboatAndColor), gl.STATIC_DRAW);
  // (4) Define the buffer object connection to the a_Position variable
  gl.vertexAttribPointer(gl.program.a_Position, 3, gl.FLOAT, false, 24, 0);
  gl.vertexAttribPointer(gl.program.a_Color, 3, gl.FLOAT, false, 24, 12);
  // (5) Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(gl.program.a_Position);
  gl.enableVertexAttribArray(gl.program.a_Color);

  return sailboatAndColor.length / 6;
}

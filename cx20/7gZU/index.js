// forked from cx20's "[WebGL] glCubic.js を試してみるテスト（その２）" http://jsdo.it/cx20/9RLh
// forked from cx20's "[WebGL] glCubic.js を試してみるテスト" http://jsdo.it/cx20/lRsw
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var mat4 = gl3.Math.Mat4;
var prg;
var mMatrix;
var vMatrix;
var pMatrix;
var vpMatrix;
var mvpMatrix;
var VBO;
var IBO;
var rad = 0;

// 立方体の座標データを用意
//             1.0 y 
//              ^  -1.0 
//              | / z
//              |/       x
// -1.0 -----------------> +1.0
//            / |
//      +1.0 /  |
//           -1.0
// 
//         [7]------[6]
//        / |      / |
//      [3]------[2] |
//       |  |     |  |
//       | [4]----|-[5]
//       |/       |/
//      [0]------[1]
//
var position = [ 
    // Front face
    -0.5, -0.5,  0.5, // v0
     0.5, -0.5,  0.5, // v1
     0.5,  0.5,  0.5, // v2
    -0.5,  0.5,  0.5, // v3
    // Back face
    -0.5, -0.5, -0.5, // v4
     0.5, -0.5, -0.5, // v5
     0.5,  0.5, -0.5, // v6
    -0.5,  0.5, -0.5, // v7
    // Top face
     0.5,  0.5,  0.5, // v2
    -0.5,  0.5,  0.5, // v3
    -0.5,  0.5, -0.5, // v7
     0.5,  0.5, -0.5, // v6
    // Bottom face
    -0.5, -0.5,  0.5, // v0
     0.5, -0.5,  0.5, // v1
     0.5, -0.5, -0.5, // v5
    -0.5, -0.5, -0.5, // v4
    // Right face
     0.5, -0.5,  0.5, // v1
     0.5,  0.5,  0.5, // v2
     0.5,  0.5, -0.5, // v6
     0.5, -0.5, -0.5, // v5
    // Left face
    -0.5, -0.5,  0.5, // v0
    -0.5,  0.5,  0.5, // v3
    -0.5,  0.5, -0.5, // v7
    -0.5, -0.5, -0.5  // v4
];

var color = [ 
    1.0, 0.0, 0.0, 1.0, // Front face
    1.0, 0.0, 0.0, 1.0, // Front face
    1.0, 0.0, 0.0, 1.0, // Front face
    1.0, 0.0, 0.0, 1.0, // Front face
    1.0, 1.0, 0.0, 1.0, // Back face
    1.0, 1.0, 0.0, 1.0, // Back face
    1.0, 1.0, 0.0, 1.0, // Back face
    1.0, 1.0, 0.0, 1.0, // Back face
    0.0, 1.0, 0.0, 1.0, // Top face
    0.0, 1.0, 0.0, 1.0, // Top face
    0.0, 1.0, 0.0, 1.0, // Top face
    0.0, 1.0, 0.0, 1.0, // Top face
    1.0, 0.5, 0.5, 1.0, // Bottom face
    1.0, 0.5, 0.5, 1.0, // Bottom face
    1.0, 0.5, 0.5, 1.0, // Bottom face
    1.0, 0.5, 0.5, 1.0, // Bottom face
    1.0, 0.0, 1.0, 1.0, // Right face
    1.0, 0.0, 1.0, 1.0, // Right face
    1.0, 0.0, 1.0, 1.0, // Right face
    1.0, 0.0, 1.0, 1.0, // Right face
    0.0, 0.0, 1.0, 1.0, // Left face
    0.0, 0.0, 1.0, 1.0, // Left face
    0.0, 0.0, 1.0, 1.0, // Left face
    0.0, 0.0, 1.0, 1.0  // Left face
];

var indices = [
     0,  1,  2,    0,  2 , 3,  // Front face
     4,  5,  6,    4,  6 , 7,  // Back face
     8,  9, 10,    8, 10, 11,  // Top face
    12, 13, 14,   12, 14, 15,  // Bottom face
    16, 17, 18,   16, 18, 19,  // Right face
    20, 21, 22,   20, 22, 23   // Left face
];

function init() {
    gl3.init('c');
    prg = gl3.createProgramFromId(
        'vs',
        'fs',
        ['position' ,'color'],
        [3, 4],
        ['mvpMatrix'],
        ['matrix4fv']
    );
    
    VBO = [
        gl3.createVbo(position), 
        gl3.createVbo(color)
    ];
    IBO = gl3.createIbo(indices);
    
    mMatrix = mat4.identity(mat4.create());
    vMatrix = mat4.identity(mat4.create());
    pMatrix = mat4.identity(mat4.create());
    vpMatrix = mat4.identity(mat4.create());
    mvpMatrix = mat4.identity(mat4.create());
    
    gl3.gl.enable(gl3.gl.DEPTH_TEST);
}

function render(){
    rad += Math.PI * 1.0 / 180.0;

    prg.useProgram();
    prg.setAttribute(VBO, IBO);
    var cameraPosition = [0.0, 0.0, 4.0];
    var centerPoint    = [0.0, 0.0, 0.0];
    var cameraUp       = [0.0, 1.0, 0.0];
    mat4.lookAt(cameraPosition, centerPoint, cameraUp, vMatrix);

    var fovy = 30;
    var aspect = 1.0;
    var near = 0.1;
    var far = 5.0;
    mat4.perspective(fovy, aspect, near, far, pMatrix);

    var axis = [1.0, 1.0, 1.0];
    mat4.identity(mMatrix);
    mat4.rotate(mMatrix, rad, axis, mMatrix);
    mat4.multiply(pMatrix, vMatrix, vpMatrix);
    mat4.multiply(vpMatrix, mMatrix, mvpMatrix);

    prg.pushShader([mvpMatrix]);

    gl3.drawElements(gl3.gl.TRIANGLES, indices.length);

    requestAnimationFrame(render);
}

init();
render();

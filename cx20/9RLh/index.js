// forked from cx20's "[WebGL] glCubic.js を試してみるテスト" http://jsdo.it/cx20/lRsw
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

let prg;
let VBO;
let IBO;

// Square data
//             1.0 y 
//              ^  -1.0 
//              | / z
//              |/       x
// -1.0 -----------------> +1.0
//            / |
//      +1.0 /  |
//           -1.0
// 
//        [0]------[1]
//         |        |
//         |        |
//         |        |
//        [2]------[3]
//
let position = [ 
    -0.5, 0.5, 0.0, // v0
     0.5, 0.5, 0.0, // v1 
    -0.5,-0.5, 0.0, // v2
     0.5,-0.5, 0.0  // v3
];

let color = [ 
     1.0, 0.0, 0.0, 1.0, // v0
     0.0, 1.0, 0.0, 1.0, // v1
     0.0, 0.0, 1.0, 1.0, // v2
     1.0, 1.0, 0.0, 1.0  // v3
];

let indices = [0, 1, 2, 3];

function init() {
    gl3.init('c');
    prg = gl3.createProgramFromId(
        'vs',
        'fs',
        ['position' ,'color'],
        [3, 4],
        [],
        []
    );
    
    VBO = [
        gl3.createVbo(position), 
        gl3.createVbo(color)
    ];
    IBO = gl3.createIbo(indices);

    resizeCanvas();

    window.addEventListener("resize", function(){
        resizeCanvas();
    });
}

function resizeCanvas() {
    gl3.canvas.width = window.innerWidth;
    gl3.canvas.height = window.innerHeight;
    gl3.gl.viewport(0, 0, gl3.canvas.width, gl3.canvas.height);
}

function render(){
    prg.useProgram();
    prg.setAttribute(VBO, IBO);

    gl3.drawElements(gl3.gl.TRIANGLE_STRIP, indices.length);
}

init();
render();

// forked from cx20's "[WebGL] Babylon.js を試してみるテスト" http://jsdo.it/cx20/84AP
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var createScene = function(engine) {
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 0, -5), scene);
    var triangle = new BABYLON.Mesh('triangle', scene);
    scene.clearColor = new BABYLON.Color3(1, 1, 1);

    var positions = [
         0.0,  0.5, 0.0, // v0
        -0.5, -0.5, 0.0, // v1
         0.5, -0.5, 0.0  // v2
    ];
    var indices = [0, 1, 2];

    triangle.setVerticesData(BABYLON.VertexBuffer.PositionKind, positions, true);
    triangle.setIndices(indices);

    var material = new BABYLON.ShaderMaterial("material", scene, {
        vertexElement: "vs",
        fragmentElement: "fs",
    }, {
        attributes: ["position"]
    });

    triangle.material = material;

    return scene;
}

var canvas = document.querySelector("#c");
var engine = new BABYLON.Engine(canvas, true);
var scene = createScene(engine);

engine._gl = WebGLDebugUtils.makeDebugContext(engine._gl, undefined, logGLCall);

function logGLCall(functionName, args) {
   console.log("gl." + functionName + "(" +
      WebGLDebugUtils.glFunctionArgsToString(functionName, args) + ")");
}

engine.runRenderLoop(function () {
    scene.render();
});

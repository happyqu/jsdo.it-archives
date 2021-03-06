// forked from cx20's "[WebGL] three.js を試してみるテスト（組み込み関数編）" http://jsdo.it/cx20/vvCa
// forked from cx20's "[WebGL] three.js を試してみるテスト（BufferGeometry編）" http://jsdo.it/cx20/yCyD
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var container;
var camera, scene, renderer;
var mesh;

init();
animate();

function init() {
    container = document.getElementById('container');
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10);
    camera.position.z = 3.5;
    scene = new THREE.Scene();

    // 正弦波×余弦波の座標データを用意
    //             1.0 y 
    //              ^  -1.0 
    //              | / z
    //              |/       x
    // -1.0 -----------------> +1.0
    //            / |
    //      +1.0 /  |
    //           -1.0
    // 
    //             [3]
    //         [4]     [2]
    //      [5]            [1]
    //      *                *
    //     [6]              [0]
    //      *                *
    //      [7]            [11]
    //         [8]     [10]
    //             [9]
    //
    var MAX = 24;
    var A = 1.0;
    var B = 2.0;
    var colors = [];
    var geometry = new THREE.Geometry();
    for (var i = 0; i <= MAX; i++) {
        var x = 0.5 * Math.cos(2 * Math.PI * i / MAX * A);
        var y = 0.5 * Math.sin(2 * Math.PI * i / MAX * B);
        var z = 0.5 * Math.sin(2 * Math.PI * i / MAX * A);
        geometry.vertices.push(new THREE.Vector3(x, y, z));
        colors.push(new THREE.Color(x + 0.5, y + 0.5, z + 0.5));
    }
    geometry.colors = colors;
    var material = new THREE.LineBasicMaterial({
        vertexColors: THREE.VertexColors
    });
    mesh = new THREE.Line(geometry, material, THREE.LineStrip);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

var rad = 0.0;
function render() {
    rad += Math.PI * 1.0 / 180.0
    mesh.rotation.y = rad;
    renderer.render(scene, camera);
}

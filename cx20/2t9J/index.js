// forked from cx20's "無限大に変化するロゴ（IE11ロゴ版）" http://jsdo.it/cx20/cTcl
// forked from cx20's "無限大に変化するロゴ" http://jsdo.it/cx20/9lUe
// forked from jsdo.it_team's "HTML5 Experts.jp Contest エントリー用コード" http://jsdo.it/jsdo.it_team/html5experts_vol1

$(window).bind("load", function () {
    // テキストを取得
    var text = $("#copy").text();
    $("#copy")
        .empty() // 一旦、空にする
        .show(); // 表示する
    var arr = text.split(""); // 一文字ずつ、配列に格納
    var elements = [];
    
    var i;

    // 一文字ずつ、spanタグで包む
    for (i = 0; i < arr.length; i++) {
        elements[i] = $("<span>" + arr[i] + "</span>");
        $("#copy").append(elements[i]); // 元の場所に挿入
    }

    for (i = 0; i < elements.length; i++) {
        elements[i]
            .css({top:-60, opacity:0})
            .delay(40 * i)
            .animate({top:0, opacity:1}, 500, "easeOutExpo");
    }

    // 3D アニメーション開始
    init();
    animate();

});

//----------------------------------------------------------------------
var container, stats;
var camera, controls, scene, renderer;
var mesh, plane;

var ID = 1;
var list = [];

var targetRotation = 0;
var targetRotationOnMouseDown = 0;
var rotationSpeed = 0.05;
var mouseX, mouseY, mouseXOnMouseDown, mouseYOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var ROT_SPEED = 400;
var group_rot = 0;
var group;
var theta = 0;

var DOT_SIZE = 10;
var X_START_POS = -8 * DOT_SIZE;
var Y_START_POS = -8 * DOT_SIZE;
var Z_START_POS = -1.5 * DOT_SIZE;

var dataSet = [
    [
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","水","水","水","水","水","水","×","×","×","×","×",
    "×","×","×","×","水","水","水","水","水","水","水","水","×","×","×","×",
    "×","×","×","水","水","×","×","×","×","×","水","水","水","×","×","×",
    "×","×","×","×","×","×","水","×","×","×","×","水","水","×","×","×",
    "×","×","×","×","×","水","水","水","水","水","水","水","水","×","×","×",
    "×","×","×","×","水","水","水","水","水","水","水","水","水","×","×","×",
    "×","×","×","×","水","水","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","水","水","×","×","×","×","×","×","水","×","×","×",
    "×","×","×","×","水","水","水","水","水","水","水","水","水","×","×","×",
    "×","×","×","×","×","水","水","水","水","水","水","水","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×"
    ],
    [
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","水","水","水","水","水","水","×","×","×","×","×",
    "×","×","×","×","水","水","水","水","水","水","水","水","×","×","×","×",
    "×","×","×","水","水","水","水","水","水","水","水","水","水","×","×","×",
    "×","×","水","水","水","×","×","×","×","×","水","水","水","水","×","×",
    "×","×","水","×","×","水","水","×","×","×","×","水","水","水","×","×",
    "×","×","×","×","水","水","水","水","水","水","水","水","水","水","×","×",
    "×","×","×","水","水","水","水","水","水","水","水","水","水","水","×","×",
    "×","×","×","水","水","水","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","水","水","水","×","×","×","×","×","×","水","×","×","×",
    "×","×","×","水","水","水","水","水","水","水","水","水","水","×","×","×",
    "×","×","×","×","水","水","水","水","水","水","水","水","水","×","×","×",
    "×","×","×","×","×","水","水","水","水","水","水","水","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×"
    ],
    [
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","水","水","水","水","水","水","×","×","×","×","×",
    "×","×","×","×","水","水","水","水","水","水","水","水","×","×","×","×",
    "×","×","×","水","水","×","×","×","×","×","水","水","水","×","×","×",
    "×","×","×","×","×","×","水","×","×","×","×","水","水","×","×","×",
    "×","×","×","×","×","水","水","水","水","水","水","水","水","×","×","×",
    "×","×","×","×","水","水","水","水","水","水","水","水","水","×","×","×",
    "×","×","×","×","水","水","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","水","水","×","×","×","×","×","×","水","×","×","×",
    "×","×","×","×","水","水","水","水","水","水","水","水","水","×","×","×",
    "×","×","×","×","×","水","水","水","水","水","水","水","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×"
    ]
];

function getRgbColor( c )
{
    var colorHash = {
        "×":"#000000",
        "橙":"#f16529",
        "赤":"#e44d26",
        "水":"#369cd6",
        "青":"#0a78d5"
    };
    return colorHash[ c ];
}

function getRandomColor() {
    var r = Math.floor(Math.random() * 128);
    var g = Math.floor(Math.random() * 128);
    var b = Math.floor(Math.random() * 128);
    return "rgb(" + r + "," + g + "," + b + ")";
}

function init() {
    if (isWebgl())
        renderer = new THREE.WebGLRenderer({ alpha: true });
    else
        renderer = new THREE.CanvasRenderer();

     renderer.setClearColor(0xffffff);
     renderer.setSize(window.innerWidth, window.innerHeight);

	document.getElementById('logo-vertical').appendChild(renderer.domElement);

    //The smaller the first number is, the closer the cube appears
    camera = new THREE.PerspectiveCamera(50, windowHalfX / windowHalfY, 1, 1000);
    //The height of the camera in comparison to the scene
    camera.position.x = -100;
    camera.position.y = 250;
    //The zoom level of the camera
    camera.position.z = 200;

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 5000.0;
    controls.maxPolarAngle = Math.PI * 0.495;
    //controls.autoRotate = true;     //true:自動回転する,false:自動回転しない
    //controls.autoRotateSpeed = -10.0;    //自動回転する時の速度

    //Create the scene
    scene = new THREE.Scene();
    group = new THREE.Object3D();
    scene.add(group);

    var i, j;
    var x, y, z;
    var meshArray = [];
    var color;
    var geometry = new THREE.BoxGeometry(DOT_SIZE * 0.8, DOT_SIZE * 0.8, DOT_SIZE * 0.8);
    for (j = 0; j < dataSet.length; j++) {
        for (i = 0; i < dataSet[j].length; i++) {
            x = (i % 16) * DOT_SIZE + X_START_POS;
            y = (16 - Math.floor(i / 16)) * DOT_SIZE + Y_START_POS;
            z = j * DOT_SIZE + Z_START_POS;
            color = getRgbColor(dataSet[j][i]);

            if (dataSet[j][i] != "×") {
                var material = new THREE.MeshLambertMaterial({
                    color: color
                });
                meshArray[i] = new THREE.Mesh(geometry, material);
                meshArray[i].position.x = x - 0;
                meshArray[i].position.y = y;
                meshArray[i].position.z = z;

                group.add(meshArray[i]);
                list.push(meshArray[i]);
            }
        }
    }

    //ライティング
    var light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    var light2 = new THREE.DirectionalLight(0xffffff);
    light2.position.set(-1, -1, -1).normalize();
    scene.add(light2);

    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);

    window.addEventListener('resize', onWindowResize, false);

    setInterval(changeID, 5000);
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    render();
}

function onDocumentMouseDown(event) {
    event.preventDefault();

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mouseup', onDocumentMouseUp, false);
    document.addEventListener('mouseout', onDocumentMouseOut, false);

    mouseXOnMouseDown = event.clientX - windowHalfX;
    targetRotationOnMouseDown = targetRotation;
}

function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
}

function onDocumentMouseUp(event) {
    document.removeEventListener('mousemove', onDocumentMouseMove, false);
    document.removeEventListener('mouseup', onDocumentMouseUp, false);
    document.removeEventListener('mouseout', onDocumentMouseOut, false);
}

function onDocumentMouseOut(event) {
    //To get rid of redundant code, call function that does same thing above
    onDocumentMouseUp(event);
}

function onDocumentTouchStart(event) {
    if (event.touches.length === 1) {
        event.preventDefault();

        mouseXOnMouseDown = event.touches[0].pageX - windowHalfX;
        targetRotationOnMouseDown = targetRotation;
    }
}

function onDocumentTouchMove(event) {
    if (event.touches.length === 1) {
        event.preventDefault();

        mouseX = event.touches[0].pageX - windowHalfX;
        //The rotation of the cube on its' x-axis
        targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * rotationSpeed;
    }
}


/**************THIS BLOCK IS NECESSARY -> DRAWS DEBUG AXES********************/
var debugaxis = function (axisLength) {
    //Shorten the vertex function
    function v(x, y, z) {
        return new THREE.Vector3(x, y, z);
    }

    //Create axis (point1, point2, colour)
    function createAxis(p1, p2, color) {
        var line, lineGeometry = new THREE.Geometry(),
            lineMat = new THREE.LineBasicMaterial({
                color: color,
                lineWidth: 1
            });
        lineGeometry.vertices.push(p1, p2);
        line = new THREE.Line(lineGeometry, lineMat);
        scene.add(line);
    }

    createAxis(v(-axisLength, 0, 0), v(axisLength, 0, 0), 0xFF0000);
    createAxis(v(0, -axisLength, 0), v(0, axisLength, 0), 0x00FF00);
    createAxis(v(0, 0, -axisLength), v(0, 0, axisLength), 0x0000FF);
};

//To use enter the axis length
//debugaxis(400);
/**************************************************************************************/
function isWebgl() {
    try {
        return !!window.WebGLRenderingContext && !! document.createElement('canvas').getContext('experimental-webgl');
    } catch (e) {
        return false;
    }
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
}

function render() {
    TWEEN.update();
    group_rot += 0.0001 * ROT_SPEED;
    var axis = new THREE.Vector3(1, 1, 1).normalize();
    var angle = group_rot;
    var q = new THREE.Quaternion().setFromAxisAngle(axis, angle);
    group.quaternion.copy(q);
    renderer.render(scene, camera);
}

function changeID() {

    switch (ID) {
    case 1:
        changeFormation1();
        break;
    case 2:
        changeFormation2();
        break;
    case 3:
        changeFormation3();
        break;
    default:
        changeFormation1();
        break;
    }

    ID++;
    if (ID > 3) {
        ID = 1;
    }
}

//Random
function changeFormation1() {
    for (var i = 0; i < list.length; i++) {
        var rot = 360 / list.length * i;
        var vx = Math.random() * 600 - 300;
        var vy = Math.random() * 600 - 300;
        var vz = Math.random() * 600 - 300;

        new TWEEN.Tween(list[i].scale).to({
            x: 1,
            y: 1,
            z: 1
        }, 1000)
            .easing(TWEEN.Easing.Back.Out).start();

        new TWEEN.Tween(list[i].position).to({
            x: vx,
            y: vy,
            z: vz
        }, 1000)
            .easing(TWEEN.Easing.Exponential.InOut).start();

        new TWEEN.Tween(list[i].rotation).to({
            x: 0,
            y: rot,
            z: 0
        }, 1000)
            .easing(TWEEN.Easing.Cubic.InOut).start();
    }
}

//Cube
function changeFormation2() {
    var i, j, k;
    var x, y, z;
    k = 0;
    for (j = 0; j < dataSet.length; j++) {
        for (i = 0; i < dataSet[j].length; i++) {
            x = (i % 16) * DOT_SIZE + X_START_POS;
            y = (16 - Math.floor(i / 16)) * DOT_SIZE + Y_START_POS;
            z = j * DOT_SIZE + Z_START_POS;
            if (dataSet[j][i] != "×") {
                new TWEEN.Tween(list[k].position).to({
                    x: x,
                    y: y,
                    z: z
                }, 1000)
                    .easing(TWEEN.Easing.Exponential.InOut).start();
        
                new TWEEN.Tween(list[k].rotation).to({
                    x: 0,
                    y: 0,
                    z: 0
                }, 1000)
                    .easing(TWEEN.Easing.Cubic.InOut).start();
                k++;
            }
        }
    }
}

//Infinity
function changeFormation3() {
    for (var i = 0; i < list.length; i++) {
        var rot = 2 * i;
        var vx = 150 * ( Math.cos(rot * Math.PI / 180) * Math.cos(rot * Math.PI / 180)) + Math.random() * 10;
        var vy = 150 * ( Math.cos(rot * Math.PI / 180) * Math.sin(rot * Math.PI / 180)) + Math.random() * 10;
        var vz = 150 * Math.cos(rot * Math.PI / 180) + Math.random() * 10;

        new TWEEN.Tween(list[i].scale).to({
            x: 1,
            y: 1,
            z: 1
        }, 1000)
            .easing(TWEEN.Easing.Back.Out).start();

        new TWEEN.Tween(list[i].position).to({
            x: vx,
            y: vy,
            z: vz
        }, 1000)
            .easing(TWEEN.Easing.Exponential.InOut).start();

        new TWEEN.Tween(list[i].rotation).to({
            x: 0,
            y: rot,
            z: 0
        }, 1000)
            .easing(TWEEN.Easing.Cubic.InOut).start();
    }
}

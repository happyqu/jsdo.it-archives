// forked from cx20's "Three.js + ammo.js でドミノっぽくドット絵を作るテスト" http://jsdo.it/cx20/mmj3
// forked from cx20's "Three.js + ammo.js でドット絵を落下させてみるテスト" http://jsdo.it/cx20/k77l
// forked from cx20's "Three.js + ammo.js でサッカーボールを落下させてみるテスト" http://jsdo.it/cx20/nnK9
// forked from edo_m18's "ammo.jsを試してみる" http://jsdo.it/edo_m18/4Hqh

// ‥‥‥‥‥‥‥‥‥‥‥‥‥□□□
// ‥‥‥‥‥‥〓〓〓〓〓‥‥□□□
// ‥‥‥‥‥〓〓〓〓〓〓〓〓〓□□
// ‥‥‥‥‥■■■□□■□‥■■■
// ‥‥‥‥■□■□□□■□□■■■
// ‥‥‥‥■□■■□□□■□□□■
// ‥‥‥‥■■□□□□■■■■■‥
// ‥‥‥‥‥‥□□□□□□□■‥‥
// ‥‥■■■■■〓■■■〓■‥‥‥
// ‥■■■■■■■〓■■■〓‥‥■
// □□■■■■■■〓〓〓〓〓‥‥■
// □□□‥〓〓■〓〓□〓〓□〓■■
// ‥□‥■〓〓〓〓〓〓〓〓〓〓■■
// ‥‥■■■〓〓〓〓〓〓〓〓〓■■
// ‥■■■〓〓〓〓〓〓〓‥‥‥‥‥
// ‥■‥‥〓〓〓〓‥‥‥‥‥‥‥‥
var dataSet = [
    "無","無","無","無","無","無","無","無","無","無","無","無","無","肌","肌","肌",
    "無","無","無","無","無","無","赤","赤","赤","赤","赤","無","無","肌","肌","肌",
    "無","無","無","無","無","赤","赤","赤","赤","赤","赤","赤","赤","赤","肌","肌",
    "無","無","無","無","無","茶","茶","茶","肌","肌","茶","肌","無","赤","赤","赤",
    "無","無","無","無","茶","肌","茶","肌","肌","肌","茶","肌","肌","赤","赤","赤",
    "無","無","無","無","茶","肌","茶","茶","肌","肌","肌","茶","肌","肌","肌","赤",
    "無","無","無","無","茶","茶","肌","肌","肌","肌","茶","茶","茶","茶","赤","無",
    "無","無","無","無","無","無","肌","肌","肌","肌","肌","肌","肌","赤","無","無",
    "無","無","赤","赤","赤","赤","赤","青","赤","赤","赤","青","赤","無","無","無",
    "無","赤","赤","赤","赤","赤","赤","赤","青","赤","赤","赤","青","無","無","茶",
    "肌","肌","赤","赤","赤","赤","赤","赤","青","青","青","青","青","無","無","茶",
    "肌","肌","肌","無","青","青","赤","青","青","黄","青","青","黄","青","茶","茶",
    "無","肌","無","茶","青","青","青","青","青","青","青","青","青","青","茶","茶",
    "無","無","茶","茶","茶","青","青","青","青","青","青","青","青","青","茶","茶",
    "無","茶","茶","茶","青","青","青","青","青","青","青","無","無","無","無","無",
    "無","茶","無","無","青","青","青","青","無","無","無","無","無","無","無","無"
];

function getRgbColor( c )
{
    var colorHash = {
        "無":{r:0xDC,g:0xAA,b:0x6B},    // 段ボール色
        "白":{r:0xff,g:0xff,b:0xff},
        "肌":{r:0xff,g:0xcc,b:0xcc},
        "茶":{r:0x80,g:0x00,b:0x00},
        "赤":{r:0xff,g:0x00,b:0x00},
        "黄":{r:0xff,g:0xff,b:0x00},
        "緑":{r:0x00,g:0xff,b:0x00},
        "水":{r:0x00,g:0xff,b:0xff},
        "青":{r:0x00,g:0x00,b:0xff},
        "紫":{r:0x80,g:0x00,b:0x80}
    };
    return colorHash[ c ];
}

Ammo().then(function(Ammo) {
var glBoostContext;
var scene;
var dynamicsWorld;
var objs = [];
var numObjects = 0;

function Ball(x, y, z, r, m, color) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.r = r;
    this.color = color;
    this.bulletObj = null;
    this.glboostObj = null;
    this._trans = new Ammo.btTransform();
    this.initGlboostObj();
    this.initBulletObj(m);
}

Ball.prototype.destructor = function () {
    Ammo.destroy(this.bulletObj);
    Ammo.destroy(this._trans);
};

Ball.prototype.initGlboostObj = function () {
    // initialize Object3D
    var material = glBoostContext.createClassicMaterial();
    var texture = glBoostContext.createTexture("../../assets/s/s/X/x/ssXxc.png");  // Football.png
    material.diffuseTexture = texture;
    var color = this.color;
    var color2 = new GLBoost.Vector4(color.r / 0xff, color.g / 0xff, color.b / 0xff, 1.0);
    var sphere = glBoostContext.createSphere(this.r, 10, 10, color2);
    var ball = glBoostContext.createMesh(sphere, material);
    var translate = new GLBoost.Vector3(this.x, this.y, this.z);
    ball.translate = translate;

    this.glboostObj = ball;
};

Ball.prototype.initBulletObj = function (m) {
    var startTransform = new Ammo.btTransform();
    startTransform.setIdentity();
    var origin = startTransform.getOrigin();
    origin.setX(this.x);
    origin.setY(this.y);
    origin.setZ(this.z);

    var shape = new Ammo.btSphereShape(this.r);
    var localInertia = new Ammo.btVector3(0, 0, 0);
    shape.calculateLocalInertia(m, localInertia);

    var motionState = new Ammo.btDefaultMotionState(startTransform);
    var rbInfo = new Ammo.btRigidBodyConstructionInfo(m, motionState, shape, localInertia);
    rbInfo.set_m_restitution(0.6); // 反発係数（0～1）
    var body = new Ammo.btRigidBody(rbInfo);

    Ammo.destroy(startTransform);
    Ammo.destroy(localInertia);
    Ammo.destroy(rbInfo);

    this.bulletObj = body;
};

Ball.prototype.move = function () {
    var pos = [0, 0, 0];

    this.bulletObj.getMotionState().getWorldTransform(this._trans);
    var origin = this._trans.getOrigin();
    pos[0] = origin.x();
    pos[1] = origin.y();
    pos[2] = origin.z();
    var rotation = this._trans.getRotation();
    var quat = new GLBoost.Quaternion(rotation.x(), rotation.y(), rotation.z(), rotation.w());
    var translate = new GLBoost.Vector3(pos[0], pos[1], pos[2]);
    
    this.glboostObj.translate = translate;
    // クォータニオン（ammo.js） → クォータニオン（GLBoost.js）
    this.glboostObj.quaternion = quat;
};

function Box(x, y, z, w, h, d, m, color) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    this.h = h;
    this.d = d;
    this.color = color;
    this.bulletObj = null;
    this.glboostObj = null;
    this._trans = new Ammo.btTransform();
    this.initGlboostObj();
    this.initBulletObj(m);
}

Box.prototype.destructor = function () {
    // TODO:
};

Box.prototype.initGlboostObj = function () {
    var w = this.w;
    var h = this.h;
    var d = this.d;
    var material = glBoostContext.createClassicMaterial();
    material.shaderClass = GLBoost.PhongShader;
    var color = this.color;
    var color2 = new GLBoost.Vector4(color.r / 0xff, color.g / 0xff, color.b / 0xff, 1.0);
    var box = glBoostContext.createCube(new GLBoost.Vector3(w, h, d), color2);
    var mesh = glBoostContext.createMesh(box, material);
    var translate = new GLBoost.Vector3(this.x, this.y, this.z);
    mesh.translate = translate;

    this.glboostObj = mesh;
};

Box.prototype.initBulletObj = function (m) {
    var startTransform = new Ammo.btTransform();
    startTransform.setIdentity();
    var origin = startTransform.getOrigin();
    origin.setX(this.x);
    origin.setY(this.y);
    origin.setZ(this.z);

    var w = this.w;
    var h = this.h;
    var d = this.d;
    var tmpVec = new Ammo.btVector3(w / 2, h / 2, d / 2);
    var shape = new Ammo.btBoxShape(tmpVec);
    var localInertia = new Ammo.btVector3(0, 0, 0);
    shape.calculateLocalInertia(m, localInertia);

    var motionState = new Ammo.btDefaultMotionState(startTransform);
    var rbInfo = new Ammo.btRigidBodyConstructionInfo(m, motionState, shape, localInertia);
    rbInfo.set_m_restitution(0.2); // 反発係数（0～1）
    var body = new Ammo.btRigidBody(rbInfo);

    Ammo.destroy(startTransform);
    Ammo.destroy(localInertia);
    Ammo.destroy(rbInfo);

    this.bulletObj = body;
};

Box.prototype.move = function () {
    var pos = [0, 0, 0];

    this.bulletObj.getMotionState().getWorldTransform(this._trans);
    var origin = this._trans.getOrigin();
    pos[0] = origin.x();
    pos[1] = origin.y();
    pos[2] = origin.z();
    var rotation = this._trans.getRotation();
    var quat = new GLBoost.Quaternion(rotation.x(), rotation.y(), rotation.z(), rotation.w());
    var translate = new GLBoost.Vector3(pos[0], pos[1], pos[2]);
    
    this.glboostObj.translate = translate;
    // クォータニオン（ammo.js） → クォータニオン（GLBoost.js）
    this.glboostObj.quaternion = quat;
};

function Plane(x, y, z, s, m, color) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.s = s; // size (length of one side of cube)
    this.color = color;
    this.bulletObj = null;
    this.glboostObj = null;
    this.initGlboostObj();
    this.initBulletObj(m);
}

Plane.prototype.destructor = function () {
    // TODO:
};

Plane.prototype.initGlboostObj = function () {
    var s = this.s;
    var material = glBoostContext.createClassicMaterial();
    var texture = glBoostContext.createTexture("../../assets/u/y/G/y/uyGy9.jpg"); // grass.jpg
    material.diffuseTexture = texture;
    var planeGeometry = glBoostContext.createPlane(s, s, 5, 5, null, true);
    var ground = glBoostContext.createMesh(planeGeometry, material);

    this.glboostObj = ground;
};

Plane.prototype.initBulletObj = function (m) {
    var s = this.s;
    var tmpVec = new Ammo.btVector3(s / 2, 1 / 2, s / 2);
    var shape = new Ammo.btBoxShape(tmpVec);
    Ammo.destroy(tmpVec);
    var startTransform = new Ammo.btTransform();
    startTransform.setIdentity();
    tmpVec = new Ammo.btVector3(this.x, this.y + 1, this.z);
    startTransform.setOrigin(tmpVec);
    Ammo.destroy(tmpVec);

    var localInertia = new Ammo.btVector3(0, 0, 0);
    var motionState = new Ammo.btDefaultMotionState(startTransform);
    var rbInfo = new Ammo.btRigidBodyConstructionInfo(m, motionState, shape, localInertia);
    rbInfo.set_m_restitution(1);
    var body = new Ammo.btRigidBody(rbInfo);

    Ammo.destroy(startTransform);
    Ammo.destroy(localInertia);
    Ammo.destroy(rbInfo);

    this.bulletObj = body;
};

Plane.prototype.move = function () {
    // TODO:
};

function initPhysicsWorld() {
    var gravity = new Ammo.btVector3(0, -200, 0);

    var collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
    var dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
    var overlappingPairCache = new Ammo.btDbvtBroadphase();
    var solver = new Ammo.btSequentialImpulseConstraintSolver();
    var dynamicsWorld = new Ammo.btDiscreteDynamicsWorld(
        dispatcher, overlappingPairCache, solver, collisionConfiguration);
    dynamicsWorld.setGravity(gravity);

    return dynamicsWorld;
}

window.addEventListener("load", function () {
    var width = 465;
    var height = 465;
    var deltaT = 30;

    canvas = document.getElementById("world");
    glBoostContext = new GLBoost.GLBoostMiddleContext(canvas);
    renderer = glBoostContext.createRenderer({
        clearColor: {
            red: 0.6,
            green: 0.6,
            blue: 0.6,
            alpha: 1
        }
    });
    
    scene = glBoostContext.createScene();

    camera = glBoostContext.createPerspectiveCamera({
        eye: new GLBoost.Vector3(4.0, 10.0, 20.0),
        center: new GLBoost.Vector3(0.0, 0.0, 0.0),
        up: new GLBoost.Vector3(0.0, 1.0, 0.0)
    }, {
        fovy: 45.0,
        aspect: 1.0,
        zNear: 0.1,
        zFar: 2000.0
    });
    camera.cameraController = glBoostContext.createCameraController();
    scene.addChild(camera);

    var pointLight = glBoostContext.createPointLight(new GLBoost.Vector3(1.0, 1.0, 1.0));
    pointLight.translate = new GLBoost.Vector3(10, 10, 10);
    scene.addChild(pointLight);

    dynamicsWorld = initPhysicsWorld();
    var ground = new Plane(0, 0, 0, 500, 0, 0xdddddd);
    scene.addChild(ground.glboostObj);
    dynamicsWorld.addRigidBody(ground.bulletObj);

    createDominos();
    createShapes();

    expression = glBoostContext.createExpressionAndRenderPasses(1);
    expression.renderPasses[0].scene = scene;
    expression.prepareToRender();

    function rendering() {
        dynamicsWorld.stepSimulation(deltaT / 1000);

        for (var i = numObjects; i--;) {
            var obj = objs[i];
            obj.move();
        }

        renderer.clearCanvas();
        renderer.draw(expression);
        setTimeout(rendering, deltaT);
    }

    rendering();

}, false);

function createDominos() {
    var box_size = 1;
    for ( var y = 0; y < 16; y++ ) {
        for ( var x = 0; x < 16; x++ ) {
            var x1 = -6 + x * box_size * 0.95;
            var y1 = box_size * 2;
            var z1 = -8 + y * box_size * 1.2;
            var color = getRgbColor( dataSet[y * 16 + x] );
            var box = new Box(x1, y1, z1, 0.2, 1.2, 1, 10, color);
            scene.addChild(box.glboostObj);
            dynamicsWorld.addRigidBody(box.bulletObj);
            objs.push(box);
            numObjects++;
        }
    }
}

function createShapes() {
    var ball_size = 0.5;
    var box_size = 1;
    for ( var y = 0; y < 16; y++ ) {
        var x1 = -6.2;
        var y1 = 4;
        var z1 = -8 + (15 - y) * box_size * 1.2;
        var color = getRgbColor("白");
        var ball = new Ball(x1, y1, z1, ball_size, 10, color);
        scene.addChild(ball.glboostObj);
        dynamicsWorld.addRigidBody(ball.bulletObj);
        objs.push(ball);
        numObjects++;
    }
}
});
// forked from cx20's "[WebGL] Babylon.js で WebVR を試してみるテスト（その３）（調整中）" http://jsdo.it/cx20/Om12
// forked from cx20's "[WebGL] Babylon.js で WebVR を試してみるテスト（その２）（調整中）" http://jsdo.it/cx20/Ut6C
// forked from cx20's "[WebGL] Babylon.js で WebVR を試してみるテスト（調整中）" http://jsdo.it/cx20/WPxV
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）（その４）" http://jsdo.it/cx20/jwt0
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）（その３）" http://jsdo.it/cx20/uqcv
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）（その２）" http://jsdo.it/cx20/anpf
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）" http://jsdo.it/cx20/oRtWo
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト" http://jsdo.it/cx20/84AP
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

// The babylon engine
var engine;
// The current scene
var scene;
// The HTML canvas
var canvas;

// to go quicker
var v3 = BABYLON.Vector3;

// The function onload is loaded when the DOM has been loaded
document.addEventListener("DOMContentLoaded", function () {
    onload();
}, false);

// Resize the babylon engine when the window is resized
window.addEventListener("resize", function () {
	if (engine) {
		engine.resize();
	}
},false);

/**
 * Onload function : creates the babylon engine and the scene
 */
var onload = function () {
	// Engine creation
    canvas = document.getElementById("renderCanvas");
	engine = new BABYLON.Engine(canvas, true);

    // Scene creation
	createScene();

    // The render function
	engine.runRenderLoop(function () {
        scene.render();
	});	

};

var createScene = function() {

    scene = new BABYLON.Scene(engine);
    scene.enablePhysics(new BABYLON.Vector3(0,-10,0), new BABYLON.OimoJSPlugin());
    scene.getPhysicsEngine().setTimeStep(1 / 30);

    /** SKYBOX **/
/*
    BABYLON.Engine.ShadersRepository = "shaders/";
    var skybox = BABYLON.Mesh.CreateSphere("skyBox", 10, 2500, scene);
    var shader = new BABYLON.ShaderMaterial("gradient", scene, {
        vertexElement: "vertexShaderCode",
        fragmentElement: "fragmentShaderCode"
    }, {});
    shader.setFloat("offset", 0);
    shader.setFloat("exponent", 0.6);
    shader.setColor3("topColor", BABYLON.Color3.FromInts(0,119,255));
    shader.setColor3("bottomColor", BABYLON.Color3.FromInts(240,240, 255));
    shader.backFaceCulling = false;
    skybox.material = shader;
*/
    // Skybox
    var cubeTexture = new BABYLON.CubeTexture(
        "https://rawcdn.githack.com/cx20/gltf-test/c479d543/textures/cube/skybox/", // "../../textures/cube/skybox/",
        scene,
        ["px.jpg", "py.jpg", "pz.jpg", "nx.jpg", "ny.jpg", "nz.jpg"]
    );
    // If you care about the performance of createDefaultSkybox(), The following code can be used to avoid this. However, the environmental texture will not be applied.
    // http://www.html5gamedevs.com/topic/36997-using-skybox-takes-time-to-display-is-it-a-usage-problem/?tab=comments#comment-211765
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 10000, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBoxMaterial", scene);
    //skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = cubeTexture;
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);
    //skyboxMaterial.disableLighting = true;
    skyboxMaterial.alpha = 0.5;
    skybox.material = skyboxMaterial;    

    /** CAMERA **/
    //var camera = new BABYLON.ArcRotateCamera("Camera", 0.86, 1.37, 250, BABYLON.Vector3.Zero(), scene);
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
    camera.setPosition(new BABYLON.Vector3(50, 50, -100));
    camera.attachControl(canvas);
/*
    camera.maxZ = 5000;
    camera.lowerRadiusLimit = 120;
    camera.upperRadiusLimit = 430;
    camera.lowerBetaLimit =0.75;
    camera.upperBetaLimit =1.58 ;
*/
    // Enable VR
    var vrHelper = scene.createDefaultVRExperience({createDeviceOrientationCamera:false});

    /** GROUND **/
    var mat = new BABYLON.StandardMaterial("ground", scene);
    var t = new BABYLON.Texture("../../assets/8/l/A/2/8lA2e.jpg", scene); // grass.jpg
    
    t.uScale = t.vScale = 2;
    mat.diffuseTexture = t;
    mat.specularColor = BABYLON.Color3.Black();
    var g = BABYLON.Mesh.CreateBox("ground", 200, scene);
    g.position.y = -20;
    g.scaling.y = 0.01;
    g.material = mat;
    g.physicsImpostor = new BABYLON.PhysicsImpostor(g, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.4, restitution: 0.6 }, scene);

    // light
    var light1 = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0.0, -1.0, 0.5), scene);
    var light2 = new BABYLON.DirectionalLight("dir02", new BABYLON.Vector3(-0.5, -0.5, -0.5), scene);
    light1.intensity = 1.0;
    light2.intensity = 1.0;

    var matBoard = new BABYLON.StandardMaterial("board", scene);
/*
    matBoard.emissiveColor = new BABYLON.Color3(1, 0, 0);
    var fireTexture = new BABYLON.FireProceduralTexture("fire", 256, scene);
    matBoard.diffuseTexture = fireTexture;
    matBoard.opacityTexture = fireTexture;
*/
    matBoard.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    matBoard.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
    matBoard.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    matBoard.ambientColor = new BABYLON.Color3(1, 1, 1);
    matBoard.alpha = 0.5;

    for ( var i = 0; i < 4; i++ ) {
        var board = BABYLON.Mesh.CreateBox("ground", 50, scene);
        switch ( i ) 
        {
            case 0:
                board.position.y = 10;
                board.position.x = 25;
                board.scaling.x = 0.1;
                break;
            case 1:
                board.position.y = 10;
                board.position.x = -25;
                board.scaling.x = 0.1;
                break;
            case 2:
                board.position.y = 10;
                board.position.z = 25;
                board.scaling.z = 0.1;
                break;
            case 3:
                board.position.y = 10;
                board.position.z = -25;
                board.scaling.z = 0.1;
                break;
        }
        board.material = matBoard;
        board.physicsImpostor = new BABYLON.PhysicsImpostor(board, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.4, restitution: 0.6 }, scene);
    }

    // Get a random number between two limits
    var randomNumber = function (min, max) {
        if (min == max) {
            return (min);
        }
        var random = Math.random();
        return ((random * (max - min)) + min);
    };

    // Initial height
    var y = 100;

    // all our objects
    var objects = [];

    // max number of objects
    var max = 150;

    // Creates arandom position above the ground
    var getPosition = function(y) {
        //return new v3(randomNumber(-25,25), y, randomNumber(-25, 25));
        return new v3(randomNumber(-25,25) , randomNumber(0, 100) + y, randomNumber(-25, 25));
    };
    var dataSet = [
        {imageFile:"../../assets/3/O/Z/o/3OZoF.jpg", scale:1.0}, // Basketball.jpg
        {imageFile:"../../assets/2/y/4/W/2y4Wl.jpg", scale:0.9}, // BeachBall.jpg
        {imageFile:"../../assets/r/x/X/q/rxXqY.jpg", scale:1.0}, // Football.jpg
        {imageFile:"../../assets/i/M/6/F/iM6FW.jpg", scale:0.3}, // Softball.jpg
        {imageFile:"../../assets/f/M/F/x/fMFxB.jpg", scale:0.3}, // TennisBall.jpg
    ];

    var matSphere = [];
    for ( var i = 0; i < dataSet.length; i++ ) {
        var imageFile = dataSet[i].imageFile;
        matSphere[i] = new BABYLON.StandardMaterial("boxmat", scene);
        matSphere[i].diffuseTexture = new BABYLON.Texture(imageFile, scene); // Football.png
        matSphere[i].specularColor = BABYLON.Color3.Black();
    }
    //var shadowGenerator = new BABYLON.ShadowGenerator(1024, light1);
    
    // Creates
    for (var index = 0; index < max; index++) {

        var pos = Math.floor(Math.random() * dataSet.length);
        var scale = dataSet[pos].scale;
        var s = BABYLON.Mesh.CreateSphere("s", 30, 15 * scale, scene);
        s.position = getPosition(y);
        s.material = matSphere[pos];
        s.physicsImpostor = new BABYLON.PhysicsImpostor(s, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, friction:0.4, restitution:0.6 }, scene);

        // Shadows
        //shadowGenerator.getShadowMap().renderList.push(s);
        //shadowGenerator.useExponentialShadowMap  = true;
        //g.receiveShadows = true;
        
        // SAVE OBJECT
        objects.push(s);

        // INCREMENT HEIGHT
        //y+=10;
    }

    scene.registerBeforeRender(function() {
        objects.forEach(function(obj) {
            // If object falls
            if (obj.position.y < -100) {
                obj.position = getPosition(100);
                obj.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0,0,0));
                obj.physicsImpostor.setAngularVelocity(new BABYLON.Vector3(0,0,0));
            }
        });
        //scene.activeCamera.alpha += 0.005;
    });

};

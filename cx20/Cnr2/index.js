// forked from cx20's "[WebGL] three.js で glTF 2.0形式のデータを表示してみるテスト（その８）（調整中）" http://jsdo.it/cx20/qugw
// forked from cx20's "[WebGL] three.js で glTF 2.0形式のデータを表示してみるテスト（その７）" http://jsdo.it/cx20/4r5U
// forked from cx20's "[WebGL] three.js で glTF 2.0形式のデータを表示してみるテスト（その６）" http://jsdo.it/cx20/SMjx
// forked from cx20's "[WebGL] three.js で glTF 2.0形式のデータを表示してみるテスト（その５）" http://jsdo.it/cx20/ahsW
// forked from cx20's "[WebGL] three.js で glTF 2.0形式のデータを表示してみるテスト（その４）" http://jsdo.it/cx20/waIx
// forked from cx20's "[WebGL] three.js で glTF 2.0形式のデータを表示してみるテスト（その３）（調整中）" http://jsdo.it/cx20/q0cx
// forked from cx20's "[WebGL] three.js で glTF 2.0形式のデータを表示してみるテスト（その２）" http://jsdo.it/cx20/K0k6
// forked from cx20's "[WebGL] three.js で glTF 2.0形式のデータを表示してみるテスト" http://jsdo.it/cx20/gMdU
// forked from cx20's "three.js で glTF 形式のデータを表示してみるテスト（その１）" http://jsdo.it/cx20/2qm8N
// forked from cx20's "three.js で OBJ 形式のデータを表示してみるテスト（その１）" http://jsdo.it/cx20/wGMY
// forked from cx20's "three.js で Blender のデータを表示してみるテスト" http://jsdo.it/cx20/2CXI
// forked from 【WebGL特集】第4回：Blenderでモデル出力 http://mox-motion.com/blog/webgl04-2/

var gltf = null;
var mixer = null;
var clock = new THREE.Clock();
var controls;
var camera;
var lastCameraIndex = 0;

init();
  
function init() {
    width = window.innerWidth;
    height = window.innerHeight;
    
    scene = new THREE.Scene();
    
    var ambient = new THREE.AmbientLight( 0x101030 );
    scene.add( ambient );

    var directionalLight = new THREE.DirectionalLight( 0xffeedd );
    directionalLight.position.set( 0, 0, 1 );
    scene.add( directionalLight );

    var directionalLight2 = new THREE.DirectionalLight( 0xffeedd );
    directionalLight2.position.set( 0, 5, -5 );
    scene.add( directionalLight2 );
    
    camera = new THREE.PerspectiveCamera( 60, width / height, 0.01, 10000 );
    //camera.position.set(2, 2, 3);
    camera.position.set(1, 0.5, 1);

    var manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {
        console.log( item, loaded, total );
    };

    var loader = new THREE.GLTFLoader();
    loader.setCrossOrigin( 'anonymous' ); // r84 以降は明示的に setCrossOrigin() を指定する必要がある

    var scale = 1.0;
    //var url = "https://cdn.rawgit.com/cx20/gltf-test/e5c46e508942f1686ed84fcb1e2e1132de80490a/tutorialModels/MetalRoughSpheres/glTF/MetalRoughSpheres.gltf";
    //var url = "https://cdn.rawgit.com/KhronosGroup/glTF-Sample-Models/c89c1709fbfd67a11aa7e540ab4ecb795763b627/2.0/MetalRoughSpheres/glTF/MetalRoughSpheres.gltf";
    //var url = "https://raw.githubusercontent.com/shrekshao/minimal-gltf-loader/store-drone-model/glTFs/glTF_version_2/buster_drone/scene.gltf";
    //var url = "https://cdn.rawgit.com/KhronosGroup/glTF-Blender-Exporter/2bdcb263/polly/project_polly.gltf";
    //var url = "https://cdn.rawgit.com/KhronosGroup/glTF-Blender-Exporter/0e23c773bf27dad67d2c25f060370d6fa012d87d/polly/project_polly.gltf";
    var url = "https://cdn.rawgit.com/KhronosGroup/glTF-Blender-Exporter/64017da8f49a618dbeec8ff80f6053cbcb715ad5/polly/project_polly.gltf";
    
    loader.load(url, function (data) {
        gltf = data;
        var object = gltf.scene;
        object.scale.set(scale, scale, scale);
        //object.position.y -= 10;

        var animations = gltf.animations;
        if ( animations && animations.length ) {
            mixer = new THREE.AnimationMixer( object );
            for ( var i = 0; i < animations.length; i ++ ) {
                var animation = animations[ i ];
                mixer.clipAction( animation ).play();
            }
        }
        lastCameraIndex = Math.floor(gltf.cameras.length * Math.random());
        camera = gltf.cameras[lastCameraIndex];
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        var envMap = getEnvMap();
        object.traverse( function( node ) {
            if ( node.material ) {
                node.material.envMap = envMap;
                node.material.needsUpdate = true;
            }
        } );
        scene.background = envMap;

        scene.add(object);

        animate();
    });

    var axis = new THREE.AxesHelper(1000);   
    scene.add(axis);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( 0xaaaaaa );

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 5000.0;
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.autoRotate = false;
    controls.autoRotateSpeed = -10.0;

    renderer.setSize( width, height );
    renderer.gammaOutput = true; // if >r88, models are dark unless you activate gammaOutput

    document.body.appendChild( renderer.domElement );
}

// https://github.com/mrdoob/three.js/tree/dev/examples/textures/cube/skybox
function getEnvMap() {
    //var path = '../../textures/cube/skybox/';
    var path = 'https://cdn.rawgit.com/cx20/gltf-test/c479d543/textures/cube/skybox/';
    var format = '.jpg';
    var urls = [
        path + 'px' + format, path + 'nx' + format,
        path + 'py' + format, path + 'ny' + format,
        path + 'pz' + format, path + 'nz' + format
    ];
    var loader = new THREE.CubeTextureLoader();
    loader.setCrossOrigin( 'anonymous' );
    var envMap = loader.load( urls );
    envMap.format = THREE.RGBFormat;
    return envMap;
}

var count = 0;
function animate() {
    requestAnimationFrame( animate );
    if ( count > 1000 ) {
        var thisCameraIndex = Math.floor(gltf.cameras.length * Math.random());
        if ( thisCameraIndex != lastCameraIndex ) {
            camera = gltf.cameras[thisCameraIndex];
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            lastCameraIndex = thisCameraIndex;
        }
        count = 0;
    }
    if (mixer) mixer.update(clock.getDelta());
    controls.update();
    render();
    count++;
}

function render() {
    renderer.render( scene, camera );
}
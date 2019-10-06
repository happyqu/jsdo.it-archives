// forked from cx20's "Three.js でドット絵を表示するテスト" http://jsdo.it/cx20/3U7N

var DOT_SIZE = 10;
var X_START_POS = -DOT_SIZE * 8;
var Y_START_POS = -DOT_SIZE * 8;

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
        "無":"#000000",
        "白":"#ffffff",
        "肌":"#ffcccc",
        "茶":"#800000",
        "赤":"#ff0000",
        "黄":"#ffff00",
        "緑":"#00ff00",
        "水":"#00ffff",
        "青":"#0000ff",
        "紫":"#800080"
    };
    return colorHash[ c ];
}

var camera, scene, renderer;
var theta = 0;

var controls;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 200, 200, 200 );

    scene = new THREE.Scene();

    var material = new THREE.MeshLambertMaterial();

    for ( i = 0; i < dataSet.length; i++ ) {
        var x = ( i % 16 ) * DOT_SIZE + X_START_POS;
        var y = ( 16 - Math.floor( i / 16 ) ) * DOT_SIZE + Y_START_POS;
        var z = 0;
        var color = getRgbColor(dataSet[i]);
        if ( dataSet[i] != "無" ) {
            var cube = createCss3Cube(DOT_SIZE*0.8, DOT_SIZE*0.8, DOT_SIZE*0.8, color);
            cube.position.x = x;
            cube.position.y = y;
            cube.position.z = z;
            scene.add( cube );
        }
    }
    
    renderer = new THREE.CSS3DRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = 0;
    document.body.appendChild( renderer.domElement );

}

function animate() {
    requestAnimationFrame( animate );

    camera.lookAt(scene.position);
    camera.position.x = 200 * Math.sin(theta * Math.PI / 180) * -1; // 逆回転
    camera.position.y = 200 * Math.cos(60 * Math.PI / 180);
    camera.position.z = 200 * Math.cos(theta * Math.PI / 180);
    theta += 2.0;

    renderer.render( scene, camera );
}

function createCss3Cube(w, h, d, color) {
    // params
    var r = Math.PI / 2;
    var pos = [
        [  w/2,  0,  0 ],
        [ -w/2,  0,  0 ],
        [  0,  h/2,  0 ],
        [  0, -h/2,  0 ],
        [  0,  0,  d/2 ],
        [  0,  0, -d/2 ]
    ];
    var rot = [
        [  0,  r, 0 ],
        [  0, -r, 0 ],
        [ -r,  0, 0 ],
        [  r,  0, 0 ],
        [  0,  0, 0 ],
        [  0,  0, 0 ]
    ];

    // cube
    var cube = new THREE.Object3D();

    // sides
    for ( var i = 0; i < 6; i ++ ) {

        var element = document.createElement( 'div' );
        element.style.width = w + 'px';
        element.style.height = h + 'px';
        element.style.background = new THREE.Color( color ).getStyle();
        element.style.opacity = '0.50';

        var object = new THREE.CSS3DObject( element );
        object.position.fromArray( pos[ i ] );
        object.rotation.fromArray( rot[ i ] );
        cube.add( object );

    }
    
    return cube;
}

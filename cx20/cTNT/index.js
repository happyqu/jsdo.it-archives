// forked from cx20's "[WebGL] Hilo3d を試してみるテスト（組み込み関数編）（その４）" http://jsdo.it/cx20/aWAs
// forked from cx20's "[WebGL] Hilo3d を試してみるテスト（組み込み関数編）（その３）" http://jsdo.it/cx20/6Ujc
// forked from cx20's "[WebGL] Hilo3d を試してみるテスト（組み込み関数編）（その２）" http://jsdo.it/cx20/O7Hi
// forked from cx20's "[WebGL] Hilo3d を試してみるテスト（組み込み関数編）" http://jsdo.it/cx20/gKXr
// forked from cx20's "[WebGL] Hilo3d を試してみるテスト" http://jsdo.it/cx20/gwMA
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

//var camera = new Hilo3d.PerspectiveCamera();
var camera = new Hilo3d.PerspectiveCamera({
    aspect: innerWidth / innerHeight,
    far: 100,
    near: 0.1,
    z: 3
});
var stage = new Hilo3d.Stage({
    container: document.getElementById('container'),
    camera: camera,
    clearColor: new Hilo3d.Color(1.0, 1.0, 1.0),
    width: innerWidth,
    height: innerHeight
});

var geometry = new Hilo3d.BoxGeometry();
geometry.setAllRectUV([[0, 1], [1, 1], [1, 0], [0, 0]]);

var mesh1 = new Hilo3d.Mesh({
    x: -0.7,
    scaleX: 0.8,
    scaleY: 0.8,
    scaleZ: 0.8,
    geometry: geometry,
    material: new Hilo3d.BasicMaterial({
        diffuse:new Hilo3d.LazyTexture({
            src:'../../assets/A/k/w/j/AkwjW.jpg'
        })
    }),
    onUpdate: function() {
       this.rotationX += 0.5;
       this.rotationY += 0.5;
       this.rotationZ += 0.5;
    }
});
mesh1.addChild(new Hilo3d.AxisHelper());
stage.addChild(mesh1);

var angle = 0;
var mesh2 = new Hilo3d.Mesh({
    x: 0.7,
    scaleX: 0.8,
    scaleY: 0.8,
    scaleZ: 0.8,
    geometry: geometry,
    material: new Hilo3d.BasicMaterial({
        diffuse:new Hilo3d.LazyTexture({
            src:'../../assets/A/k/w/j/AkwjW.jpg'
        })
    }),
    onUpdate: function() {
        var axis = new Hilo3d.Vector3(1,1,1).normalize();
        angle += Math.PI / 180;
        var q = new Hilo3d.Quaternion();
        q.setAxisAngle(axis, angle);
        this.quaternion.copy(q);
    }
});
mesh2.addChild(new Hilo3d.AxisHelper());
stage.addChild(mesh2);

var ticker = new Hilo3d.Ticker(60);
ticker.addTick(stage);
ticker.start(true);

// forked from cx20's "[WebGL] Grimoire.js+ ポリゴンで３次元関数を表示してみるテスト" http://jsdo.it/cx20/8e5I
// forked from cx20's "[WebGL] Grimoire.js で３次元リサージュ図形を描いてみるテスト" http://jsdo.it/cx20/SM1B
// forked from cx20's "[WebGL] Grimoire.js でリサージュ図形を描いてみるテスト" http://jsdo.it/cx20/8Fx0
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（VBO編）" http://jsdo.it/cx20/iUdQ
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト" http://jsdo.it/cx20/4ZEB
// forked from cx20's "[WebGL] jThree を試してみるテスト" http://jsdo.it/cx20/Go5s

var WIDTH_SEGMENT = 255;
var HEIGHT_SEGMENT = 255;
var WIDTH_SIZE = 1.0 * 2 / WIDTH_SEGMENT;
var HEIGHT_SIZE = 1.0 * 2 / WIDTH_SEGMENT;

var positions = new Float32Array((WIDTH_SEGMENT + 1) * (HEIGHT_SEGMENT + 1) * 3);
var colors = new Float32Array((WIDTH_SEGMENT + 1) * (HEIGHT_SEGMENT + 1) * 4);
var indices = new Uint32Array(WIDTH_SEGMENT * HEIGHT_SEGMENT * 6);
var isInitialized = false;
var isTextureLoaded = false;
var data = [];

var GLExtRequestor = gr.lib.fundamental.Resource.GLExtRequestor;
GLExtRequestor.request("OES_element_index_uint");

var GeometryFactory = gr.lib.fundamental.Geometry.GeometryFactory;
var Geometry = gr.lib.fundamental.Geometry.Geometry;
GeometryFactory.addType("custom", {}, function (gl, attrs) {
  var geometry = new Geometry(gl);
  // 3次元リサージュの座標データを用意
  //             1.0 y 
  //              ^  -1.0 
  //              | / z
  //              |/       x
  // -1.0 -----------------> +1.0
  //            / |
  //      +1.0 /  |
  //           -1.0
  // 
  var k = 0;
  for (var row = 0; row < HEIGHT_SEGMENT; row++) {
    for (var col = 0; col < WIDTH_SEGMENT; col++) {
      var a = (row + 1) * (WIDTH_SEGMENT + 1) + col;
      var b = (row + 0) * (WIDTH_SEGMENT + 1) + col;
      var c = (row + 0) * (WIDTH_SEGMENT + 1) + col + 1;
      var d = (row + 1) * (WIDTH_SEGMENT + 1) + col + 1;
      indices[k * 6 + 0] = b;
      indices[k * 6 + 1] = a;
      indices[k * 6 + 2] = c;
      indices[k * 6 + 3] = a;
      indices[k * 6 + 4] = d;
      indices[k * 6 + 5] = c;
      k++;
    }
  }
  geometry.addAttributes(positions, {
    POSITION: {
      size: 3
    }
  });
  geometry.addAttributes(colors, {
    COLOR: {
      size: 4
    }
  });
  geometry.addIndex("default", indices, WebGLRenderingContext.TRIANGLES);
  //geometry.addIndex("default", indices, WebGLRenderingContext.LINES);
  return geometry;
});

gr.registerComponent('Rotate', {
  attributes: {
    speed: {
      default: '1',
      converter: 'Number',
    },
  },
  $mount: function () {
    this.phi = 0;
    var img = new Image();
    img.onload = function () {
      // heightMap より標高データを取得
      data = getHeightData(img);
      isInitialized = false;
      isTextureLoaded = true;
    }
    img.src = "../../assets/y/M/M/6/yMM6T.png"; // heightmap_256x256.png
  },
  $update: function () {
    var gr = this.companion.get("GeometryRegistory");
    var geometry = gr.getGeometry("c1");
    var bufferPositions = geometry.buffers[geometry.accessors["POSITION"].bufferIndex];
    var bufferColors = geometry.buffers[geometry.accessors["COLOR"].bufferIndex];
    if ( !isInitialized && isTextureLoaded ) {
      var k = 0;
      for (var j = -16; j < 16; j += 1/8) {
        for (var i = -16; i < 16; i += 1/8) {
          var x = i;
          var y = j;
          var z = data[k];
          var x2 = x / 16;
          var y2 = y / 16;
          var z2 = z / 32 - 0.5;
          positions[k * 3 + 0] = x2;
          positions[k * 3 + 1] = y2;
          positions[k * 3 + 2] = z2;
  
          colors[k * 4 + 0] = z2 + 0.5;
          colors[k * 4 + 1] = z2 + 0.5;
          colors[k * 4 + 2] = z2 + 0.5;
          colors[k * 4 + 3] = 1.0;
  
          k++;
        }
      }
      bufferPositions.update(positions);
      bufferColors.update(colors);
      isInitialized = true;
    }

    this.phi += this.getAttribute('speed');
    //this.node.setAttribute('rotation', this.phi + ',' + this.phi + ',' + 0);
  },
});

gr(function () {
  var $$ = gr('#canvas');
  $$('mesh').addComponent('Rotate');
});

// heightMap より標高データを取得する
// 参考：http://danni-three.blogspot.jp/2013/09/threejs-heightmaps.html
function getHeightData(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var context = canvas.getContext("2d");

  var size = img.width * img.height;
  var data = new Float32Array(size);

  context.drawImage(img, 0, 0);

  var imgd = context.getImageData(0, 0, img.width, img.height);
  var pix = imgd.data;

  var j = 0;
  for (var i = 0; i < pix.length; i += 4) {
    var k = 1.5; // 起伏の強調度
    var height = (pix[i] + pix[i + 1] + pix[i + 2]) / 3 * 1 / 16 * k;
    data[j++] = height;
  }

  return data;
}

// forked from cx20's "[簡易版] WebGL でドット絵を描いてみるテスト（gl.POINTS 編）（改3）" http://jsdo.it/cx20/Cff6
// forked from cx20's "[簡易版] WebGL でドット絵を描いてみるテスト（gl.POINTS 編）（改2）" http://jsdo.it/cx20/1vMP
// forked from cx20's "[簡易版] WebGL でドット絵を描いてみるテスト（gl.POINTS 編）（改）" http://jsdo.it/cx20/7mdD
// forked from cx20's "[簡易版] WebGL でドット絵を描いてみるテスト（gl.POINTS 編）" http://jsdo.it/cx20/ciEf
// forked from cx20's "[簡易版] WebGL で点をプロットしてみるテスト" http://jsdo.it/cx20/puXG
// forked from cx20's "[簡易版] WebGL で四角形を描いてみるテスト" http://jsdo.it/cx20/vwnxi
// forked from cx20's "[簡易版 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

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
        "×":[0x00/0xFF, 0x00/0xFF, 0x00/0xFF],
        "無":[0x00/0xFF, 0x00/0xFF, 0x00/0xFF],
        //"無":[0xff/0xFF, 0xff/0xFF, 0xff/0xFF],
        "白":[0xff/0xFF, 0xff/0xFF, 0xff/0xFF],
        "肌":[0xff/0xFF, 0xcc/0xFF, 0xcc/0xFF],
        "茶":[0x80/0xFF, 0x00/0xFF, 0x00/0xFF],
        "赤":[0xff/0xFF, 0x00/0xFF, 0x00/0xFF],
        "黄":[0xff/0xFF, 0xff/0xFF, 0x00/0xFF],
        "緑":[0x00/0xFF, 0xff/0xFF, 0x00/0xFF],
        "水":[0x00/0xFF, 0xff/0xFF, 0xff/0xFF],
        "青":[0x00/0xFF, 0x00/0xFF, 0xff/0xFF],
        "紫":[0x80/0xFF, 0x00/0xFF, 0x80/0xFF]
    };
    return colorHash[ c ];
}

var c, gl;
var aLoc = [];
var uLoc = [];
var data = [];
var color = [];
var colorBuffers;
var colorBuffersTemp;
var SCALE = window.innerHeight / 465;

function initWebGL() {
    c = document.getElementById("c");
    c.width = window.innerHeight;
    c.height = window.innerHeight;
    gl = c.getContext("experimental-webgl");
}

function initShaders() {
    var p = gl.createProgram();
    var v = document.getElementById("vs").textContent;
    var f = document.getElementById("fs").textContent;
    var vs = gl.createShader(gl.VERTEX_SHADER);
    var fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(vs, v);
    gl.shaderSource(fs, f);
    gl.compileShader(vs);
    gl.compileShader(fs);
    gl.attachShader(p, vs);
    gl.attachShader(p, fs);
    gl.linkProgram(p);
    gl.useProgram(p);
    aLoc[0] = gl.getAttribLocation(p, "position");
    aLoc[1] = gl.getAttribLocation(p, "color");
    uLoc[0] = gl.getUniformLocation(p, "scale");
    gl.enableVertexAttribArray(aLoc[0]);
    gl.enableVertexAttribArray(aLoc[1]);
}

function initBuffers() {
    for ( var i = 0; i < 256; i++ ) {
        var x = (i % 16) / 16 - 0.5;
        var y = (16 - Math.floor(i / 16)) / 16 - 0.5;
        var rgb = getRgbColor(dataSet[i]);
        data = data.concat( [x, y, 0.0] );
        color = color.concat( [rgb[0], rgb[1], rgb[2], 1.0] );
    }
    colorBuffers = new Float32Array(color);
    colorBuffersTemp = new Float32Array(color);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aLoc[0], 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());


}

function animate() {
    render();
    requestAnimationFrame(animate);
}

function render() {
    var N = 4;
    // subarray / set によるコピー
    for (var row = 0; row < 16; row++) {
        var pos = row * N * 16;
        
        // 色データをブロック転送することでスクロールさせる
        // [A][B][C][D][E][F][G][H][I][J][K][L][M][N][O][P]
        //   ＼ ＼ ＼ ＼ ＼ ＼ ＼ ＼ ＼ ＼ ＼ ＼ ＼ ＼ ＼ ＼
        // [P][A][B][C][D][E][F][G][H][I][J][K][L][M][N][O]｜
        // ↑　　　　　　　　　　　　　　　　　　　　　　　｜
        // └───────────────────────┘
        var srcBlock1 = colorBuffers.subarray(pos, pos + N * 15);
        var srcBlock2 = colorBuffers.subarray(pos + N * 15, pos + N * 16);

        var dstBlock1 = colorBuffersTemp.subarray(pos + N, pos + N * 16);
        var dstBlock2 = colorBuffersTemp.subarray(pos, pos + N);

        dstBlock1.set(srcBlock1);
        dstBlock2.set(srcBlock2);
    }
    
    // バッファを更新する
    colorBuffers.set( colorBuffersTemp );
    
    gl.bufferData(gl.ARRAY_BUFFER, colorBuffers, gl.STATIC_DRAW);
    gl.vertexAttribPointer(aLoc[1], 4, gl.FLOAT, false, 0, 0);

    gl.uniform1f(uLoc[0], SCALE);

    gl.drawArrays(gl.POINTS, 0, data.length / 3);
    gl.flush();
}

initWebGL();
initShaders();
initBuffers();
animate();
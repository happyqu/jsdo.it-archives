// forked from cx20's "isomer.jsでドット絵を描いてみるテスト" http://jsdo.it/cx20/mCQ9

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

var scale = 0.2;
var DOT_SIZE = scale;
var iso;
var angle = 0;
var pos = 0;

var Point  = Isomer.Point;
var Path   = Isomer.Path;
var Shape  = Isomer.Shape;
var Color  = Isomer.Color;

var black  = new Color( 0x00, 0x00, 0x00 );
var white  = new Color( 0xff, 0xff, 0xff );
var beige  = new Color( 0xff, 0xcc, 0xcc );
var brown  = new Color( 0x80, 0x00, 0x00 );
var red    = new Color( 0xff, 0x00, 0x00 );
var yellow = new Color( 0xff, 0xff, 0x00 );
var green  = new Color( 0x00, 0xff, 0x00 );
var ltblue = new Color( 0x00, 0xff, 0xff );
var blue   = new Color( 0x00, 0x00, 0xff );
var purple = new Color( 0x80, 0x00, 0x80 );

function getRgbColor( c )
{
    var colorHash = {
        "無":black,   // 0x000000,
        "白":white,   // 0xffffff,
        "肌":beige,   // 0xffcccc,
        "茶":brown,   // 0x800000,
        "赤":red,     // 0xff0000,
        "黄":yellow,  // 0xffff00,
        "緑":green,   // 0x00ff00,
        "水":ltblue,  // 0x00ffff,
        "青":blue,    // 0x0000ff,
        "紫":purple   // 0x800080
    };
    return colorHash[ c ];
}

function init() {
    iso = new Isomer(document.getElementById("canvas"));
    setInterval(draw, 200);
}

function draw() {
    iso.canvas.clear();
    for (var i = 0; i < dataSet.length; i++) {
        var x = (15 - Math.floor(i / 16)) * DOT_SIZE;
        var y = (15 - (i+pos) % 16) * DOT_SIZE;
        if (dataSet[i] != "無") {
            var color = getRgbColor(dataSet[i]);
            iso.add(Shape.Pyramid(
                    new Point(x, y),
                    1 * DOT_SIZE,
                    1 * DOT_SIZE,
                    1 * DOT_SIZE * 0.5),
                color);
        }
    }
    pos++;
}

init();

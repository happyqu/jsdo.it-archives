var DOT_SIZE = 16;
var X_START_POS = 0;
var Y_START_POS = 0;
var Z_START_POS = 0;

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
        "無":"000000",
        "白":"ffffff",
        "肌":"ffcccc",
        "茶":"800000",
        "赤":"ff0000",
        "黄":"ffff00",
        "緑":"00ff00",
        "水":"00ffff",
        "青":"0000ff",
        "紫":"800080"
    };
    return colorHash[ c ];
}

var arrX = [];
var arrY = [];
var arrZ = [];

var sizes = [];
var colors = [];
for (var i = 0; i < 3000; i++) {
    var x0 = Math.random() * 2 - 1;
    var y0 = Math.random() * 2 - 1;
    var z0 = Math.random() * 2 - 1;

    var x1 = (Math.floor((x0 + 1) * 8) - 0)
    var y1 = (Math.floor((y0 + 1) * 8) - 0)
    var z1 = (Math.floor((z0 + 1) * 8) - 0)

    if (x1 >= (0 + X_START_POS) && x1 < (16 + X_START_POS) 
     && y1 >= (0 + Y_START_POS) && y1 < (16 + Y_START_POS) 
     && z1 > 5 && z1 < 11) {
        var pos = (x1 - X_START_POS) + ((15 - y1) - Y_START_POS) * 16;
        if (dataSet[pos] != "無") {
            colors.push(getRgbColor(dataSet[pos]));
            arrX.push(x0);
            arrY.push(y0);
            arrZ.push(z0);
        }
    }
}
var config = {
    color: colors,
    height: 465,
    width: 465,
    elementID: "graph"
}

var plot = plot3d(arrX, arrY, arrZ, config);

// forked from cx20's "Canvas で音楽のビジュアライズを試してみるテスト" http://jsdo.it/cx20/9uO9
// forked from cx20's "forked: drawFrequencyData" http://jsdo.it/cx20/8Bp5
// forked from fumito_ito's "drawFrequencyData" http://jsdo.it/fumito_ito/nmGz
// forked from fumito_ito's "drawTimeDomainData" http://jsdo.it/fumito_ito/dlV5

// forked from fumito_ito's "svg girl music" http://jsdo.it/fumito_ito/aqaV
function BufferLoader(context, urlList, callback) {
    this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = new Array();
    this.loadCount = 0;
};
BufferLoader.prototype.loadBuffer = function(url, index){
    // Load buffer asynchronously
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";
    var loader = this;
    request.onload = function() {
	// Asynchronously decode the audio file data in request.response
	loader.context.decodeAudioData(
	    request.response,
	    function(buffer) {
		if (!buffer) {
		    alert('error decoding file data: ' + url);
		    return;
		}
		loader.bufferList[index] = buffer;
		if (++loader.loadCount == loader.urlList.length) {
			loader.onload(loader.bufferList);
		}
	    }
	);
    }
    request.onerror = function() {
	alert('BufferLoader: XHR error');
    }
    request.send();
};
BufferLoader.prototype.load = function(){
    for (var i = 0; i < this.urlList.length; ++i) {
    	this.loadBuffer(this.urlList[i], i);
    }
};

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var context = new AudioContext();
var analyser = context.createAnalyser();
var timeDomainData1 = new Uint8Array(analyser.frequencyBinCount);
var timeDomainData2 = new Uint8Array(analyser.frequencyBinCount);
var url = '../../assets/svggirl/01/svg_girl_theme.ogg';
//var url = 'svg_girl_theme.ogg';
var cnt = 0;
var source;
var start = document.getElementById('start');
start.addEventListener('click', function() {
    start.disabled = true;
    stop.disabled = false;
    var bufferLoader = new BufferLoader(context, [url], function(bufferList) {
        source = context.createBufferSource();
        source.buffer = bufferList[0];	// 最初の１ファイル目を使用する。複数ファイルには対応しない。
        source.loop = true;
        source.connect(analyser);
        analyser.connect(context.destination);
        source.start(0);
        animationLoop();
    });
    bufferLoader.load();
}, false);

var stop = document.getElementById('stop');
stop.addEventListener('click', function() {
    start.disabled = false;
    stop.disabled = true;
    source.stop();
}, false);

/**
* ele canvas HTML Element
* ctx canvas context 2d
* data Time Damain Data
*/
function drawGraph(ele, ctx) {
    //背景
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.rect(0, 0, ele.width, ele.height);
    ctx.closePath();
    ctx.fill();

    //基準線
/*
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.moveTo(0, ele.height / 2);
    ctx.lineTo(ele.width, ele.height / 2);
    ctx.closePath();
    ctx.stroke();
*/
}

function drawChart(ele, ctx, data) {
    var DOT_SIZE = 16;
    var value;
    ctx.beginPath();
    //ctx.fillStyle = '#007f00';
    ctx.fillStyle = '#ff7f00';
    for (var i = 0; i < data.length; i += DOT_SIZE) {
        value = parseInt(data[i]) / 2;
        ctx.fillRect(i, ele.height / 2 + 128, DOT_SIZE*0.9, - value);
    }
}

function drwaWave(ele, ctx, data) {
    var h = cnt % 360;
    var s = 100;
    var l = 50;
    var value;
    ctx.beginPath();
    //ctx.strokeStyle = '#7f00ff';
    ctx.strokeStyle = "hsl(" + h + "," + s + "%," + l + "%)";
    ctx.moveTo(0, ele.height / 2);
    for (var i = 0; i < data.length; ++i) {
        value = (parseInt(data[i]) - 128) / 2 + ele.height / 2;
        ctx.lineTo(i, value);
    }
    ctx.moveTo(data.length, ele.height / 2);
    ctx.closePath();
    ctx.stroke();
}

function animationLoop() {
    analyser.getByteTimeDomainData(timeDomainData1);
    analyser.getByteFrequencyData(timeDomainData2);

    drawGraph(canvas, ctx);
    drawChart(canvas, ctx, timeDomainData2);
    drwaWave(canvas, ctx, timeDomainData1);
    
    cnt++;
 
    requestAnimationFrame(animationLoop);
}
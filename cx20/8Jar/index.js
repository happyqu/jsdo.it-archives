// forked from cx20's "forked: Waterfall  (WebGL2 + Oimo.js)" http://jsdo.it/cx20/mxCK
// forked from gaziya's "Waterfall  (WebGL2 + Oimo.js)" http://jsdo.it/gaziya/nY3Z

var gl = canvas.getContext("experimental-webgl");
gl.clearColor(0.05, 0.1, 0.3, 1.0);
gl.enable(gl.DEPTH_TEST);
gl.depthFunc(gl.LEQUAL);
var ext = gl.getExtension("ANGLE_instanced_arrays");

var p1 = gl.createProgram();
var type = [gl.VERTEX_SHADER, gl.FRAGMENT_SHADER];
var src = [vs.text, fs.text];
for (var i = 0; i < 2; i++) {
    var shader = gl.createShader(type[i]);
    gl.shaderSource(shader, src[i]);
    gl.compileShader(shader);
    console.log(gl.getShaderInfoLog(shader));
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {alert(gl.getShaderInfoLog(shader));}
    gl.attachShader(p1, shader);
    gl.deleteShader(shader);
}
gl.linkProgram(p1);
gl.useProgram(p1);
var perspective = function (fovy, aspect, near, far) {
    var top = near * Math.tan(fovy * Math.PI / 360.0);
    var right = top * aspect;
    var u = right * 2;
    var v = top * 2;
    var w = far - near;
    return new Float32Array([
        near * 2 / u, 0, 0, 0,
        0, near * 2 / v, 0, 0,
        0, 0, -(far + near) / w, -1,
        0, 0, -(far * near * 2) / w, 0
    ]);
};
gl.uniformMatrix4fv(
    gl.getUniformLocation(p1, "pMatrix"),
    false,
    perspective(45, canvas.width / canvas.height, 0.1, 100.0)
);

var h = 0.5;
var position = new Float32Array([
    -h, -h, -h, -h, -h,  h,  h, -h,  h,  h, -h, -h,
    -h,  h, -h, -h,  h,  h,  h,  h,  h,  h,  h, -h,
    -h, -h, -h, -h,  h, -h,  h,  h, -h,  h, -h, -h,
    -h, -h,  h, -h,  h,  h,  h,  h,  h,  h, -h,  h,
    -h, -h, -h, -h, -h,  h, -h,  h,  h, -h,  h, -h,
    h, -h, -h,  h, -h,  h,  h,  h,  h,  h,  h, -h ]);
var normal = new Float32Array([
    0, -1,  0,  0, -1,  0,  0, -1,  0,  0, -1,  0,
    0,  1,  0,  0,  1,  0,  0,  1,  0,  0,  1,  0,
    0,  0, -1,  0,  0, -1,  0,  0, -1,  0,  0, -1,
    0,  0,  1,  0,  0,  1,  0,  0,  1,  0,  0,  1,
    -1,  0,  0, -1,  0,  0, -1,  0,  0, -1,  0,  0,
    1,  0,  0,  1,  0,  0,  1,  0,  0,  1,  0,  0 ]);

var textureCoords = new Float32Array([
    // Front face
    0.0, 0.0,
    1.0, 0.0,
    1.0, 1.0,
    0.0, 1.0,

    // Back face
    1.0, 0.0,
    1.0, 1.0,
    0.0, 1.0,
    0.0, 0.0,

    // Top face
    0.0, 1.0,
    0.0, 0.0,
    1.0, 0.0,
    1.0, 1.0,

    // Bottom face
    1.0, 1.0,
    0.0, 1.0,
    0.0, 0.0,
    1.0, 0.0,

    // Right face
    1.0, 0.0,
    1.0, 1.0,
    0.0, 1.0,
    0.0, 0.0,

    // Left face
    0.0, 0.0,
    1.0, 0.0,
    1.0, 1.0,
    0.0, 1.0,
]);

var indeces = new Int16Array([
    0,  2,  1,  0,  3,  2,
    4,  5,  6,  4,  6,  7,
    8,  9, 10,  8, 10, 11,
    12, 15, 14, 12, 14, 13,
    16, 17, 18, 16, 18, 19,
    20, 23, 22, 20, 22, 21 ]);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indeces, gl.STATIC_DRAW);
var indexCount = indeces.length;

var strides = [3, 3, 2];
var vertices = [position, normal, textureCoords];
for (var i = 0; i < strides.length; i++) {
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, vertices[i], gl.STATIC_DRAW);
    gl.vertexAttribPointer(i, strides[i], gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(i);
}

var max = 300;
var posStride = 3;
var idsStride = 1;
var rotStride = 4;
var posBuffer =  gl.createBuffer();
var idsBuffer =  gl.createBuffer();
var rotBuffer =  gl.createBuffer();
var posArray = new Float32Array(max * posStride);
var idsArray = new Float32Array(max * idsStride);
var rotArray = new Float32Array(max * rotStride);

var idx = strides.length;
gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
gl.bufferData(gl.ARRAY_BUFFER,  posArray, gl.STATIC_DRAW);
gl.enableVertexAttribArray(idx);
gl.vertexAttribPointer(idx, posStride, gl.FLOAT, false, 0, 0);
//gl.vertexAttribDivisor(idx, 1);
ext.vertexAttribDivisorANGLE(idx, 1)

idx++;
gl.bindBuffer(gl.ARRAY_BUFFER, idsBuffer);
gl.bufferData(gl.ARRAY_BUFFER,  idsArray, gl.STATIC_DRAW);
gl.enableVertexAttribArray(idx);
gl.vertexAttribPointer(idx, idsStride, gl.FLOAT, false, 0, 0);
//gl.vertexAttribDivisor(idx, 1);
ext.vertexAttribDivisorANGLE(idx, 1)

idx++;
gl.bindBuffer(gl.ARRAY_BUFFER, rotBuffer);
gl.bufferData(gl.ARRAY_BUFFER,  rotArray, gl.STATIC_DRAW);
gl.enableVertexAttribArray(idx);
gl.vertexAttribPointer(idx, rotStride, gl.FLOAT, false, 0, 0);
//gl.vertexAttribDivisor(idx, 1);
ext.vertexAttribDivisorANGLE(idx, 1)

var img = new Image();
var texture;
img.onload = function(){
    texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.generateMipmap(gl.TEXTURE_2D);
};
//img.src = "frog.jpg";
img.src = "../../assets/A/k/w/j/AkwjW.jpg";  // 256x256

// physics
var world = new OIMO.World();
world.gravity = new OIMO.Vec3(0, -0.98, 0);

var genPosition = function () {
    var p = new OIMO.Vec3(Math.random() - 0.5, Math.random() + 1 , Math.random() - 0.5);
    p = new OIMO.Vec3().scale(p, 15);
    return p;
};
var ground = new OIMO.Body({size:[10, 0.1, 10], pos:[0, -10, 0], world:world});
var bodys = [];
for (var i = 0; i < max; i++) {
    var p = genPosition();
    bodys[i] = new OIMO.Body({type:'box', size:[h*2, h*2, h*2], pos:[p.x, p.y, p.z], move:true, world:world});
}

var data2buf = function () {
    var pIdx = 0;
    var qIdx = 0;
    for (var i = 0; i < max; i++) {
        var p = bodys[i].body.getPosition();
        posArray[pIdx++] = p.x; 
        posArray[pIdx++] = p.y; 
        posArray[pIdx++] = p.z; 
        // instanceID
        idsArray[i] = i 
        var q = bodys[i].body.getQuaternion();
        rotArray[qIdx++] = q.x; 
        rotArray[qIdx++] = q.y; 
        rotArray[qIdx++] = q.z; 
        rotArray[qIdx++] = q.w; 
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, posArray, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, idsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, idsArray, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, rotBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, rotArray, gl.STATIC_DRAW);
};
data2buf();

var time1;
var prevTime1 = Date.now();
var fps1 = 0;
setInterval(function () {
    time1 = Date.now();
    if (time1 - 1000 > prevTime1) {
        prevTime1 = time1;
        div1.innerHTML = "Physics / Second : " + fps1; 
        fps1 = 0;
    }
    fps1++;   

    world.step();
    for (var i = 0; i < max; i++) {
        var pos  = bodys[i].body.getPosition();
        if (pos.y < -15) {
            var p = genPosition();
            bodys[i].resetPosition(p.x, p.y, p.z);
        }
    }
    data2buf();
}, 1000 / 60);

var time0;
var prevTime0 = Date.now();
var fps0 = 0;
(function () {
    time0 = Date.now();
    if (time0 - 1000 > prevTime0) {
        prevTime0 = time0;
        div0.innerHTML = "Frames / Second : " + fps0; 
        fps0 = 0;
    }
    fps0++;
    
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(p1);
    //gl.drawElementsInstanced(gl.TRIANGLES, indexCount, gl.UNSIGNED_SHORT, 0, max);
    ext.drawElementsInstancedANGLE(gl.TRIANGLES, indexCount, gl.UNSIGNED_SHORT, 0, max);
    requestAnimationFrame(arguments.callee);
})();
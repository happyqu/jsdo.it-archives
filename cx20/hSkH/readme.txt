﻿[WebGL] webgl-utils.js を試してみるテスト（その２）

＜対応した点＞
・色設定用の頂点バッファを追加。
・GLSL のシェーダに色設定用変数を追加
　＜頂点シェーダ＞
　attribute vec4 color
　varying vec4 vColor;
　＜フラグメントシェーダ＞
　varying vec4 vColor;

＜参考＞
■ [簡易版] WebGL で四角形に色を付けてみるテスト
http://jsdo.it/cx20/veHj

■ [WebGL] TWGL.js を試してみるテスト（その２）
http://jsdo.it/cx20/3ZFk

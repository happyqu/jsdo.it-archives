[WebGL] Grimoire.js で ammo.js を試してみるテスト（その４）（調整中）

＜対応した点＞
・キューブをボールに変更

＜対応できていない点＞
・球に対する物理演算がキューブのままになっている模様。

＜変更履歴＞
2017/07/16 grimoire-preset-basic.js v1.8.8 → v1.10.18 に変更。
　　　　　・Component に attributes が必須となった為 AmmoScene に attributes を追加
　　　　　・transform.localPosition/loalRotation/localScale → transform.position/rotation/scale に変更
　　　　　・ammo.js の仕様変更対応。Ammo().then(function(Ammo) {}) を追加
2017/04/08 初版作成

＜参考＞
■ 【忙しい人向け】JavaScriptで3D物理エンジン動かしてみる (three.js + ammo.js)
http://qiita.com/daxanya1/items/79be9e0591b98196c376

■ WebGLと3D物理演算ライブラリの組み合わせを試してみる
http://qiita.com/cx20/items/3ebed669fb9c9e797935

■ [WebGL] Grimoire.js で Oimo.js を試してみるテスト（その４）
http://jsdo.it/cx20/ue3r

[WebGL] GLBoost を試してみるテスト（phina.js編）（その４）

GLBoost は @emadurandal さんが開発中の玄人向けのWebGLライブラリです。
WebGL 1.0/2.0 対応の他、WebGL 拡張を生かした高速化対応がされているようです。

＜対応した点＞
・phina.js + GLBoost にて立方体にテクスチャを貼るよう対応。
・ライブラリ組み込みの行列演算関数を用いて立方体を回転させるよう対応。
・箱が閉じるよう CULL_FACE を無効化
・メソッド名の変更に対応。
　変更前）var geometry = new GLBoost.Geometry();
　変更後）var geometry = glBoostContext.createGeometry();

＜変更履歴＞
2016/06/30 ライブラリを最新化。メソッド名の変更に対応。
2016/01/30 ライブラリを最新化。既定のカリングを無効化。
2016/01/17 ライブラリを最新版に差し替え。mesh → mesh / geometry に機能分割。
2015/12/12 初版作成

＜参考＞
■ emadurandal/GLBoost
https://github.com/emadurandal/GLBoost

■ [WebGL] GLBoost を試してみるテスト（tmlib.js編）（その４）
http://jsdo.it/cx20/21OF

■ [簡易版] WebGL でテクスチャ付き立方体を回転させてみるテスト（glMatrix.js v2.2.2編）
http://jsdo.it/cx20/jqD6

■ 各種 WebGL ライブラリで基本図形を表示してみる
http://qiita.com/cx20/items/0fa19c96aa6470d98807

[WebGL] Grimoire.js + Oimo.js でドミノっぽくドット絵を作るテスト

＜対応した点＞
・ボールをドミノに変更
・grimoire-forward-shading.js を使用し light を適用するよう対応
・色の指定を material でなく albedo で指定するよう対応。

＜変更履歴＞
2017/12/26 grimoire-preset-basic.js v1.10.18 → v1.11.20 に変更。色の指定を albedo で行うよう変更。
2017/07/16 grimoire-preset-basic.js v1.8.8 → v1.10.18 に変更。
　　　　　・Component に attributes が必須となった為 OimoScene に attributes を追加
　　　　　・transform.localPosition/loalRotation/localScale → transform.position/rotation/scale に変更
2017/04/08 初版作成

＜参考＞
■ grimoirejs-handson/Session2/
https://github.com/kyasbal-1994/grimoirejs-handson/tree/master/Session2
■ grimoirejs-handson/Session2.pdf
https://github.com/kyasbal-1994/grimoirejs-handson/blob/master/Session2.pdf

■ WebGLと3D物理演算ライブラリの組み合わせを試してみる
http://qiita.com/cx20/items/3ebed669fb9c9e797935

// forked from cx20's "[WebGL] Grimoire.js でモデルに Direction Light を照射してみるテスト" http://jsdo.it/cx20/yDZi
// forked from cx20's "[WebGL] Grimoire.js で glTF 2.0形式のデータを表示してみるテスト（その４）" http://jsdo.it/cx20/eIqR
// forked from cx20's "[WebGL] Grimoire.js で glTF 2.0形式のデータを表示してみるテスト（その３）（調整中）" http://jsdo.it/cx20/8kAm
// forked from cx20's "[WebGL] Grimoire.js で glTF 2.0形式のデータを表示してみるテスト（その２）" http://jsdo.it/cx20/6lfv
// forked from cx20's "[WebGL] Grimoire.js で glTF 2.0形式のデータを表示してみるテスト" http://jsdo.it/cx20/QmpT
// forked from cx20's "[WebGL] Grimoire.js + glTF ファイルを試してみるテスト" http://jsdo.it/cx20/GJUm
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その４）" http://jsdo.it/cx20/yNCh
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その３）" http://jsdo.it/cx20/a1kX
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その２）" http://jsdo.it/cx20/mjC6
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト" http://jsdo.it/cx20/4ZEB
// forked from cx20's "[WebGL] jThree を試してみるテスト" http://jsdo.it/cx20/Go5s

gr.registerComponent('Rotate', {
  attributes: {
    speed: {
      default: '1',
      converter: 'Number',
    },
  },
  $mount: function () {
    this.phi = 0;
  },
  $update: function () {
    this.phi += this.getAttribute('speed');
    this.node.setAttribute('rotation', 0 + ',' + this.phi + ',' + 0);
  },
});

gr(function () {
  var $$ = gr('#canvas');
  //$$('mesh').addComponent('Rotate');
  $$('#mesh-group').addComponent('Rotate');
});

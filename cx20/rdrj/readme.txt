﻿forked: 単純図形回転

＜対応した点＞
・三角形をドット絵に変更

＜対応できていない点＞
・毎回ドット絵描画用のループを実行して為か、かなり重いです。。。パフォーマンスについて要検討。

＜追記＞
・shadowColor / shadowBlur に負荷がかかっていたようなのでコメントアウトしました。

ちなみに、shadowColor / shadowBlur はブラウザによって負荷が違うようです。

＜試した結果＞
Chrome  … ◎ 軽い
IE      … ○ 普通
Firefox … × 重すぎ

# UnipaDestroyer
某大学の履修科目を時間割りから消していけ

## 使い方
1. DL
1. chromeの右上にあるボタンを押す
1. `その他のツール` > `拡張機能`　を選択
1. `デベロッパーモード`にチェックをつける
1. DLしたファイルを`パッケージ化されていない~`から選択する
1. unipaにログイン
1. `成績関連` > `成績照会`を一度見る
1. 以降から`時間割` > `授業時間割表`を見ると単位修得済みの科目がDestroyされる
1. 各コマの下にあるボタンを押すと5科目以上が表示・非表示になる

## その他
- 授業コードとか履修に関係ないので表示から消した
- Destroyされた科目は各コマの下に来るようにした。
- Destroyにカーソルを合わせると元の科目がわかるようにした。
リンクも残ってるのでシラバスに飛べる。

## 使用しているライブラリ
jQuery

## 参考文献
[listのn番目以降を隠したり表示したりするjQuery（gist: 4168815 をもうちょっとかっこよくした）](https://gist.github.com/tmitz/4173232)

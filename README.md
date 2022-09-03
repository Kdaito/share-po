# nfl-app
概要
-
nflの選手を覚えるために作ったアプリです

技術構成
-
* バックエンド
  * go
* フロントエンド
  * React.js(TypeScript)
  * Vite
  * react-hook-form
  * MUI
* DB
  * postgresql

### その他
* open-apiを用いてRestful-apiのフォーマットを管理しています。
* dockerコンテナを用いて、ローカル環境をできるだけ汚さないように環境構築できることを心がけています。

環境構築
-
```
$ docker -v
Docker version 20.10.11
```
```
$ docker-compose -v
docker-compose version 1.29.2
```
TODO
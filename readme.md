## 自宅サーバー WebAPI

<img src="https://cdn.jsdelivr.net/gh/kanaaa224/home-server@master/logo.png" width="100">

## 概要
このAPIは個人で開発したもので、開発中のアプリ・ゲームのバックエンドとして使用する目的で開発しました。  
実行環境は自宅にある常に電源ONのPC（オンプレ 物理サーバー）にデプロイし、動作させています。  
また、以前友人や家族とゲーム開発をした際にバックエンド処理でサーバーが必要になり困ったことがあったため、誰でも使うことができるように設計しました。

## API 一覧（リファレンス）
分離した複数のAPIが独立して動作しています。

| API 名 | 説明 |
| - | - |
| [WebAPI v1](web-api-v1.md) | PHPで実装したWebAPI |
| [WebAPI v2](web-api-v2.md) | 新しくPythonで実装中のWebAPI |

## 使うには
このAPIの接続先となる各エンドポイントのURLは変わってしまうことがあり、常に最新の接続先情報を参照する仕組みが必要です。  
そのため、このリポジトリに含まれている```dist/endpoints.json```を呼び出し側の環境（クライアント）でフェッチし、APIの接続先となるURLを取得します。  
そして、取得したURLを使ってAPIの呼び出しを行います。

（今すぐ使う（直接接続する）場合: ```dist/endpoints.json```に記された```v1```のURLを参照）

呼び出し側の環境（クライアント）がWebブラウザの場合、このリポジトリに含まれている```dist/web-api-client.js```の```WebAPIClientクラス```を使って簡単に呼び出すことができます。

※（ESM対応バージョンもあります）

```
<script src="https://cdn.jsdelivr.net/gh/kanaaa224/home-server-web-api@master/dist/web-api-client.min.js"></script>

<script>
    const API_ENDPOINTS_URL = 'https://cdn.jsdelivr.net/gh/kanaaa224/home-server-web-api@master/dist/endpoints.json'; // 各APIの接続先情報

    const api = new WebAPIClient(API_ENDPOINTS_URL, 'v1'); // v1のAPIを使用

    (async () => {
        try {
            await api.connect(); // APIへの接続先情報を取得し、使えるようにする

            console.log(`[ API ] version: ${await api.call({ method: 'version' })}`); // APIへバージョン取得のメソッドを呼び出し、コンソールへ出力
        } catch(e) {
            console.error(e);
        }
    })();
</script>
```

## 使う際
このAPIは学習の用途で開発したものなので、全ての機能を無償で自由に使うことができます。

リクエストする場合、サーバーに与える負荷やデータベースの労力を考慮してください。  
（同じデータを繰り返しリクエストしなくて済むように、応答をキャッシュするなど）

また、事前の申告なしに異常な数のリクエスト（1日に数千回など）を行うと攻撃と見做されてしまい、当該IPによるアクセスが永久的に拒否される可能性があります。

・急な仕様変更や提供停止  
急に仕様が変更されたり、提供を停止する可能性があります。

・ユーザー認証が必要なケース  
一部の機能や秘匿性の高いデータを扱う場合で、認証を行う必要があります。  
この場合、IDとパスワードでログインすることで利用者を確認するユーザー認証を用いて認証を行います。  
また、この認証を行うためユーザー作成を事前に行なっておく必要があります。

・自己責任  
自己責任で使用してください。
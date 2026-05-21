## 自宅サーバー WebAPI

<img src="https://cdn.jsdelivr.net/gh/kanaaa224/home-server@master/logo.png" width="100">

## 概要

趣味の個人Web開発で自宅サーバーを構築/運営しており、そのサーバーへアクセスするためのWebAPIです。  
元々は個人開発したWebアプリのバックエンド処理を、学習のため別の言語で実装し直すことが多かったためAPI化したものですが、  
他の言語やプラットフォーム、チーム開発の作品からも実行できるようにするため、パブリック化しました。  
主な機能はファイルやデータの保存です。

現在サーバーでは、言語やフレームワークごとに複数のAPIサーバーが実行されており、  
使うAPIやバージョンを、エンドポイントで指定することで選択できます。

また、このAPIは学習の用途なため、全ての機能を無償で使うことができます。

## APIの一覧（リファレンス）

| API 名 | 使用言語 | 提供状況 | 開発状況 |
| - | - | - | - |
| [WebAPI v1](web-api-v1.md) | PHP | 公開中 | 終了 |
| [WebAPI v2](web-api-v2.md) | Java | 限定公開 | 開発中 |

## 使うには

まず、各APIの接続先となるURLはドメインの都合などで変わる事があり、常に最新の接続先情報を参照する処理が必要です。  
具体的には、このリポジトリにある`hosts.json`ファイルに各APIの接続先情報が定義されており、変更があった時はこのjsonファイルが更新されます。  
そのため、CDNなどを使ってクライアント側でこの情報を定期的に取得する事で、常に最新の接続を維持可能です。

ブラウザなどのWebで使う場合、このリポジトリにある`HomeServerWebAPIClient`クラスを使うと、  
自動でこれらの処理を行うため、下のソースコードのように簡単に使う事が出来ます。

``` js
import HomeServerWebAPIClient from 'https://cdn.jsdelivr.net/gh/kanaaa224/home-server-web-api@master/dist/home-server-web-api-client.js';

const api = new HomeServerWebAPIClient();

(async () => {
    try {
        await api.prepare(); // 接続先情報の取得

        const response = await api.call({ path: '/version' }); // APIの呼び出し

        document.body.innerText = `"response": ${JSON.stringify(response, null, 2)}`;

        console.log(response);
    } catch(e) {
        console.error(e);
    }
})();
```

## 使う時は

・サーバーに与える負荷やデータベースへの労力の考慮をお願いします  
事前の申告なしに異常な数のリクエスト（1日に数千回など）を行うと攻撃と見做されてしまい、  
当該IPによるアクセスが永久的に拒否される可能性があります。

・急な仕様変更や提供を停止することがあります  
急に仕様が変更されたり、提供を停止する可能性があります。

・ユーザー認証が必要なケース  
一部の機能や秘匿性の高いデータを扱う場合で、認証を行う必要があります。  
この場合、IDとパスワードでログインすることで利用者を確認するユーザー認証を用いて認証を行います。  
また、この認証を行うには、ユーザー作成を事前に行なっておく必要があります。

・自己責任でお願いします  
自己責任で使用してください。
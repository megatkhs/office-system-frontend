# React x Vite 開発テンプレート

`create-vite` を使用せずにスクラッチで開発を始めるための構成済みの開発テンプレートです。

## 使い方

[degit](https://github.com/Rich-Harris/degit) を使用すると簡単にリポジトリのコピーを取得できます。

```sh
$ pnpx degit megatkhs/react-vite-app-template
$ pnpm install
$ git init
```

## 採用技術

| 名前                                                                                      | 説明                                                                     |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [React](https://react.dev/)                                                               | フロントエンド UI 構築用ライブラリ                                       |
| [TypeScript](https://www.typescriptlang.org/)                                             | JavaScript に型システムを追加したプログラミング言語                      |
| [PostCSS](https://postcss.org/)                                                           | プラグインで拡張可能な CSS 生成ツール (可搬性のために採用)               |
| [Vite](https://ja.vitejs.dev/)                                                            | Web アプリケーション開発環境 (モジュールバンドラ)                        |
| [ESLint](https://https://eslint.org/)                                                     | JavaScript の静的解析ツール                                              |
| [Prettier](https://prettier.io/)                                                          | 多言語対応のコードフォーマッター                                         |
| [Stylelint](https://stylelint.io/)                                                        | CSS の静的解析ツール                                                     |
| [typescript-plugin-css-modules](https://github.com/mrmckeb/typescript-plugin-css-modules) | CSS Modules でコードジャンプ可能にする TypeScript 言語サービスプラグイン |
| [Plop](https://plopjs.com/)                                                               | カスタマイズ可能なコードジェネレーター                                   |
| [Vitest](https://vitest.dev/)                                                             | 高速なテスト実行環境                                                     |
| [Storybook](https://storybook.js.org/)                                                    | コンポーネント単体で開発/テスト/文書化するための環境                     |
| [pnpm](https://pnpm.io/ja/)                                                               | Node.js の高速なパッケージマネージャー                                   |
| [Volta](https://volta.sh/)                                                                | Node.js のバージョン管理 (pnpm にも対応してほしい)                       |

## 基本的なコマンド

| コマンド           | 説明                                                               |
| ------------------ | ------------------------------------------------------------------ |
| pnpm dev           | Vite の開発環境を起動し Happy CSS Modules の監視を開始する         |
| pnpm storybook     | Storybook の開発環境を起動し Happy CSS Modules の監視を開始する    |
| pnpm build         | 型情報を検証し Vite でアプリケーションをビルドする                 |
| pnpm test          | Vitest のテストを実行する                                          |
| pnpm test:coverage | Vitest のテスト結果を出力する (`pnpx serve .coverage`で確認できる) |
| pnpm new:fc        | Plop のコード生成ウィザードを開始する                              |
| pnpm lint          | コードの静的解析結果を表示する                                     |
| pnpm fix           | コードを静的解析し修正可能な箇所を修正する                         |

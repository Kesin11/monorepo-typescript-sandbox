# my-lerna-typescript-sandbox

npm workspace + TypeScript project reference + Github Packagesの素振り

## Install
```bash
npm ci
```

npm workspaceの機能により、packages以下の依存は全て巻き上げられてrootのnode_modulesに集約される。また、packages間の依存は自動的に検知されてnode_modules内でシンボリックリンクに変換される。この挙動は `npm ls` で見るとわかりやすい。

## それぞれのpackagesがお互いに依存している場合の追加方法
例として、providerに依存しているconsumerのpackage.jsonにproviderを追加する場合

### lernaの場合
`lerna add` でいい感じにやってくれる。バージョンだけは正確に合わせる必要がある

```bash
npx lerna add @kesin11/lerna-sandbox-provider@0.1.1 --scope @kesin11/lerna-sandbox-consumer
```

### npm workspaceの場合
```bash
npm i @kesin11/lerna-sandbox-provider@0.1.1 -w @kesin11/lerna-sandbox-consumer
```

`lerna add` のように `npm install` でいけるかと思いきや、registry.npmjs.orgにそんなパッケージは無いと怒られてしまう。

`npm install` で入れる方法は分からなかったが、package.jsonのdependenciesに直接 `"@kesin11/lerna-sandbox-provider": "0.1.1"` と書いて `npm install` を実行すればちゃんとsymlinkを貼ってくれてよしなに解決してくれる。やはりバージョンは合わせる必要がある
が、例えば `^0.1.0` のように解決される幅を広げた場合には最終的に依存している別のpackage.jsonのバージョンに解決できれば問題な
さそう。この例だと逆に `0.1.0` と固定した場合にはエラーになる。

## Build
```bash
npm run build
# = tsc -b

npm run build:clean
# = tsc -b --clean && tsc -b
```

TypeScriptのProject Referenceによってpackages以下を全てまとめてビルドしてくれる。

各パッケージが互いに依存しているので、それぞれのtsconfigのreferenceに依存しているパッケージへの参照を追加する必要がある。これは[@monorepo-utils/workspaces-to-typescript-project-references](https://efcl.info/2020/11/23/workspaces-to-typescript-project-references/)によって自動的にメンテが可能。

全体をビルドするのでそこそこ時間がかかるが、`tsc -b` はビルドキャッシュを活用できるので実際はそれほど困らないはず。また後述のjestによるテストを実行する前に依存しているパッケージも最新の状態でビルドされていないと結果がおかしくなってしまうので `tsc -b --watch` で常時ビルドしておくのが安全かもしれない。

## Test
```bash
npm run test
# = npm run test --workspaces
```

npm workspaceの機能によって各packagesそれぞれの `npm run test` が実行される。

注意点はpackageが他のpakageに依存している場合（例: packages/consumerはpackages/provider, packages/typesに依存している）は依存されている側があらかじめビルド済みで `dist` に.jsや.d.tsが存在しないと型の解決ができなかったりimportできないので当然テストも動かない。

事前に全てが最新の状態にビルドされていないとテスト結果がおかしくなる可能性があることに注意する。


## Release
### lernaの場合
lerna versionで各packagesのバージョンを上げつつgit tagを作り、CHANGELOGを生成してGithub Releaseまで更新してくれる。
CHANGELOG生成 -> Github Releaseまで一気通貫で行われるため、shipjsのように手動でCHANGELOGを書き換えることはできない。

packagesが互いに依存している場合、自動でpackage.jsonのdependenciesを書き換えてくれるはず。

```bash
npm run versionup
npm run release
```

各packagesが互いに依存している場合、shipjsのフローは無理そう。

### shipjsの場合
shipjs prepareで一応lerna.jsonや各packagesのバージョンを上げつつ、CHANGELOGを生成してPRを作ってくれる。

packagesが互いに依存していても、それぞれのdependenciesは書き換えてくれなさそう。
さらに、triggerでpublishするときにforeachで各packagesを回しつつnpm publishをするらしいので、lerna publishが使えない。その結果、もしかすると依存関係の順番でリリースに失敗する可能性があるかもしれない。

```bash
npm run release:prepare
npm run release:trigger
```

各packagesが互いに依存はしていない場合、shipjsのフローでも多分大丈夫。

**追記**  
shipjsのリリースサイクルのhookポイントにおいて `lerna version` を実行することでpackagesが互いに依存している場合でも正しくバージョンアップできる方法を発見できた。詳細は [ship.config.js](./ship.config.js) 参照。

# my-lerna-typescript-sandbox

lerna + TypeScript + Github Packagesの素振り

## Install
```bash
npm ci
npm run bootstrap
```

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

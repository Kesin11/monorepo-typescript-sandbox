# my-lerna-typescript-sandbox

lerna + TypeScript + Github Packagesの素振り

## Install
```bash
npm ci
npm run bootstrap
```

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

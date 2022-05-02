# monorepo-typescript-sandbox

npm workspace + TypeScript project reference + リリース自動化の素振り

ここまでの変遷

|バージョン|構成|
|----|----|
|[v0.1.1](https://github.com/Kesin11/monorepo-typescript-sandbox/tree/v0.1.1)|lerna + TypeScript + Shipjs|
|[v1.0.0](https://github.com/Kesin11/monorepo-typescript-sandbox/tree/v1.0.0)|npm workspace + TypeScript project reference + Shipjs|
|[v2.0.0](https://github.com/Kesin11/monorepo-typescript-sandbox/tree/v2.0.0)|npm workspace + TypeScript project reference + release-drafter|

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

注意点はpackageが他のpackageに依存している場合（例: packages/consumerはpackages/provider, packages/typesに依存している）は依存されている側があらかじめビルド済みで `dist` に.jsや.d.tsが存在しないと型の解決ができなかったりimportできないので当然テストも動かない。

事前に全てが最新の状態にビルドされていないとテスト結果がおかしくなる可能性があることに注意する。


## Release
### lernaの場合
lerna versionで各packagesのバージョンを上げつつgit tagを作り、CHANGELOGを生成してGithub Releaseまで更新してくれる。
CHANGELOG生成 -> Github Releaseまで一気通貫で行われるため、shipjsのように手動でCHANGELOGを書き換えることはできない。

packagesが互いに依存している場合、自動でpackage.jsonのdependenciesを書き換えてくれるはず。

```bash
lerna version --conventional-commits
lerna publish from-package
```

### shipjs + lernaの場合
[v0.1.1](https://github.com/Kesin11/monorepo-typescript-sandbox/tree/v0.1.1)のREADME参照

### shipjs + npm workspaceの場合
[v1.0.0](https://github.com/Kesin11/monorepo-typescript-sandbox/tree/v1.0.0)のREADME参照

### release-drafter + npm workspaceの場合
#### バージョンの書き換え
`npm version -ws major` のように `npm verson` を実行すると全パッケージのバージョンを上げてくれる。昔はpackage-lock.jsonまでは更新していなかった気がするがいつの間にか同時に更新されるようになっていた。ただし、monorepoの各パッケージが互いに依存している場合にそれぞれの `dependencies` のバージョンまでは上げてくれない。`^1.0.0` の指定の場合はpatchとminorまでは問題ないがmajorを上げるときに `npm install` がエラーになってしまう。

majorのときに手動で修正が必要になるのを避けるため、バージョン指定を `"*"` にすることで制約を無しにしておく。workspaceを使っている場合はmonorepoのパッケージを参照するように `npm install` されるので多分問題はないはず。参照できているかどうかは `npm ls` で確認できる。

#### リリース作業
リリース作業は手動（workflow_dispatch）+ [release-drafter](https://github.com/marketplace/actions/release-drafter)で行う。release-drafterはGithub Releasesの作成とSemantic Versioningに基づく次バージョンの文字列を自動生成してくれるので、次バージョンの文字列を使用して `npm version` でバージョンを更新する。

release-drafterはshipjsのようにツールが裏側で自動的に各種コマンドを実行するわけではないため、nodejs以外の言語でも使えるしnpmの標準的なフロー以外の作業が必要なリポジトリにも応用しやすいメリットがある。

release-drafterはSemantic Versioningの解決をshipjsの[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)ではなく、pull-requestsのラベルを使用する。このルールは[release-drafter.yml](./.github/release-drafter.yml)で独自にカスタマイズを行っている。

# 参考
- https://github.com/Quramy/npm-ts-workspaces-example
- [TypeScriptのProject Referencesを使ってソースコードを分割し、レイヤー間の依存関係を強制する](https://zenn.dev/katsumanarisawa/articles/58103deb4f12b4)
- [lerna/yarn/npm workspacesとTypeScript Project Referencesの設定を同期するツール](https://efcl.info/2020/11/23/workspaces-to-typescript-project-references/)
- [npm-version#workspaces](https://docs.npmjs.com/cli/v8/commands/npm-version#workspaces)
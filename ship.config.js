module.exports = {
  // Don't pubilsh to npm
  publishCommand: ({ _isYarn, _tag, _defaultCommand, _dir }) => 'true',

  monorepo: {
    mainVersionFile: 'lerna.json',
    packagesToBump: ['packages/*'],
    packagesToPublish: ['packages/*']
  },
  // shipjsのmonorepoオプションは各packageのpackage.jsonのバージョンは書き換えるが、pakcage-lock.jsonは書き換えてくれない
  // lernaはローカルのpackage同士が依存している場合、互いのバージョンが揃っていないとnpm installがエラーになるためpackage-lock.jsonを気軽に直せない
  // lerna-versionはpackage-lock.jsonを含めて正しくバージョンアップしてくれるため、shipjsが書き換えたpackage.jsonがコミットされる前に元に戻してlerna versionを実行させる
  versionUpdated: ({ version, _releaseType, _dir, exec }) => {
    console.log('hook versionUpdated: git checkout .')
    exec('git checkout .')
    console.log(`hook versionUpdated: npm run lerna version -- ${version}`)
    exec(`npm run version -- ${version}`)
  }
}

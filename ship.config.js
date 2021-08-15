module.exports = {
  // Don't pubilsh to npm
  publishCommand: ({ _isYarn, _tag, _defaultCommand, _dir }) => 'true',

  monorepo: {
    mainVersionFile: 'package.json',
    packagesToBump: ['packages/*'],
    packagesToPublish: ['packages/*']
  },
  // ローカルのpackage同士が依存している場合、それぞれのversionとdependenciesのバージョンを同時に更新した場合にnpm workspaceではnpm installがエラーになる
  // それぞれのversionを更新 -> npm install(package-lock.jsonの更新) -> dependencies更新 -> npm installという手順を踏むことでnpm workspaceでも正常に更新を完了できる。
  // npm workspaceではdependencies更新を自動で行うことができないため以下のhackを使う
  //
  // shipjsはversionとdependenciesを同時に更新するため、一度stashで退避させてからnpm versionで各packageのversionだけを更新 -> npm installを行う
  // その後shipjsによる差分をstash popで復活させ、再度npm installを行うことで正常に更新を完了させる。
  versionUpdated: ({ version, _releaseType, _dir, exec }) => {
    console.log('hook versionUpdated: git stash')
    exec('git stash')
    console.log(`hook versionUpdated: npm run version -- ${version}`)
    exec(`npm run version -- ${version}`)
    console.log('hook versionUpdated: npm install')
    exec('npm install')
    console.log('hook versionUpdated: git checkout packages')
    exec('git checkout packages')
    console.log('hook versionUpdated: git stash pop')
    exec('git stash pop')
    console.log('hook versionUpdated: npm install')
    exec('npm install')
  }
}

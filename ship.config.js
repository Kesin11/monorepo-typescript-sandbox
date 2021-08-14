module.exports = {
  // Don't pubilsh to npm
  publishCommand: ({ _isYarn, _tag, _defaultCommand, _dir }) => 'true',

  monorepo: {
    mainVersionFile: 'package.json',
    packagesToBump: ['packages/*'],
    packagesToPublish: ['packages/*']
  },
}

module.exports = {
  monorepo: {
    mainVersionFile: 'lerna.json',
    packagesToBump: ['packages/*'],
    packagesToPublish: ['packages/*']
  },
  updateChangelog: false,
  publishCommand: ({ isYarn, tag, defaultCommand, dir }) => 'npm run release'
}

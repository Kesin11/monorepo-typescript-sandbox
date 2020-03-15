module.exports = {
  monorepo: {
    mainVersionFile: 'lerna.json',
    packagesToBump: ['packages/*'],
    packagesToPublish: ['packages/*']
  },
  installCommand: ({ isYarn }) => 'npm i && npm run bootstrap'
}

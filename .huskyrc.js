const tasks = arr => arr.join(' && ')

module.exports = {
  hooks: {
    'pre-commit': tasks([
      'yarn run lint-staged',
      'yarn run prettier-fix',
      'yarn run build',
    ]),
  },
}

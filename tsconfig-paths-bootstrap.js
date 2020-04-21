const tsConfig = require('./tsconfig.json')
const tsConfigPaths = require('tsconfig-paths')
const path = require('path')

const baseUrl = path.resolve('dist', 'src')
tsConfigPaths.register({
  baseUrl,
  paths: tsConfig.compilerOptions.paths,
})

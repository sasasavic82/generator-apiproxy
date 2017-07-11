'use strict'

module.exports = {
  app: require.resolve('./generators/app'),
  boilerplate: require.resolve('./generators/boilerplate'),
  // cli: require.resolve('./generators/cli'),
  docs: require.resolve('./generators/docs'),
  editorconfig: require.resolve('./generators/editorconfig'),
  eslint: require.resolve('./generators/eslint'),
  // git: require.resolve('./generators/git'),
  jsc: require.resolve('./generators/jsc'),
  nsp: require.resolve('./generators/nsp'),
  readme: require.resolve('./generators/readme')
}

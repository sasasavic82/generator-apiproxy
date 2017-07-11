/* eslint security/detect-non-literal-fs-filename: "off" */
'use strict'
const _ = require('lodash')
const YeomanGenerator = require('yeoman-generator')
const path = require('path')

module.exports = class extends YeomanGenerator {
  constructor (args, options) {
    super(args, options)

    this.argument('name', {
      type: String,
      required: true,
      desc: 'Javascript callout name'
    })

    this.option('generateInto', {
      type: String,
      required: false,
      defaults: 'lib',
      desc: 'Relocate the location of the generated files.'
    })
  }

  initializing () {
    this._lintJsc = () => {
      this.spawnCommand(path.resolve('node_modules', '.bin', 'eslint'), [
        'lib/__tests__/*.js',
        '--config',
        '.eslintrc.yml',
        '--fix',
        '--no-ignore',
        '--quiet',
        '--rule',
        'no-unused-vars:off'
      ])
        .on('error', err => this.log(`Ignoring error "${err.message}"`))
    }
  }

  writing () {
    const jscFilename = _.kebabCase(this.options.name) + '.js'

    const filepath =
      this.destinationPath(this.options.generateInto, jscFilename)

    this.fs.copyTpl(
      this.templatePath('jsc'),
      filepath, {
        name: _.camelCase(this.options.name)
      }
    )

    this.composeWith(require.resolve('generator-jest/generators/test'), {
      arguments: [filepath],
      componentName: _.camelCase(this.options.name)
    })
  }

  end () {
    this._lintJsc()
  }
}

/* eslint security/detect-non-literal-fs-filename: "off" */
'use strict'
const _ = require('lodash')
const path = require('path')
const YeomanGenerator = require('yeoman-generator')

module.exports = class extends YeomanGenerator {
  constructor (args, options) {
    super(args, options)

    this.argument('componentName', {
      type: String,
      defaults: 'index',
      required: true,
      desc: 'Javascript callout name'
    })

    this.option('generateInto', {
      type: String,
      required: false,
      defaults: 'lib',
      desc: 'Destination path of the Javascript callout files.'
    })
  }

  initializing () {
    this._lintJsc = () => {
      this.spawnCommand(path.resolve('node_modules', '.bin', 'eslint'), [
        '.',
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
    const extname = path.extname(this.options.componentName) || '.js'
    const filename = _.kebabCase(this.options.componentName) + extname

    const destinationPath = this.destinationPath(
      this.options.generateInto,
      filename
    )

    this.fs.copyTpl(this.templatePath('jsc'), destinationPath, {
      componentName: _.camelCase(this.options.componentName)
    })

    this.composeWith(require.resolve('generator-jest/generators/test'), {
      arguments: [destinationPath],
      componentName: _.camelCase(this.options.componentName)
    })
  }

  end () {
    this._lintJsc()
  }
}

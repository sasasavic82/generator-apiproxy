const _ = require('lodash')
const YeomanGenerator = require('yeoman-generator')
const rootPkg = require('../../package.json')

module.exports = class extends YeomanGenerator {
  constructor (args, options) {
    super(args, options)

    this.option('generateInto', {
      type: String,
      required: false,
      default: '',
      desc: 'Relocate the location of the generated files.'
    })
  }

  writing () {
    const devDependencies = (() => {
      const eslintDependencies = [
        'eslint',
        'eslint-config-xo-space',
        'eslint-plugin-jest',
        'eslint-plugin-jsdoc',
        'eslint-plugin-no-unsafe-innerhtml',
        'eslint-plugin-node',
        'eslint-plugin-promise',
        'eslint-plugin-scanjs-rules',
        'eslint-plugin-security',
        'eslint-plugin-standard'
      ]
      return _.pick(rootPkg.devDependencies, eslintDependencies)
    })()

    const pkgJson = {
      devDependencies: devDependencies,
      eslintConfig: {
        extends: 'xo-space',
        env: {
          jest: true,
          node: true
        }
      },
      scripts: {
        pretest: 'eslint . -c .eslintrc.yml --fix'
      }
    }

    this.fs.extendJSON(
      this.destinationPath(this.options.generateInto, 'package.json'),
      pkgJson
    )

    this.fs.copy(
      this.templatePath('eslintignore'),
      this.destinationPath(this.options.generateInto, '.eslintignore')
    )

    this.fs.copy(
      this.templatePath('eslintrc'),
      this.destinationPath(this.options.generateInto, '.eslintrc.yml')
    )
  }
}

/* eslint security/detect-non-literal-fs-filename: "off" */
'use strict'
const _ = require('lodash')
const rootPkg = require('../../package.json')
const YeomanGenerator = require('yeoman-generator')
const npmScriptsPkg = require('./templates/npm-scripts')

module.exports = class extends YeomanGenerator {
  constructor (args, options) {
    super(args, options)

    this.option('generateInto', {
      type: String,
      required: false,
      default: '',
      desc: 'Relocate the location of the generated files.'
    })

    this.option('scmAccount', {
      type: String,
      required: true,
      desc: 'GitHub username or organization'
    })

    this.option('name', {
      type: String,
      required: true,
      desc: 'The new module name.'
    })
  }

  writing () {
    const devDependencies = (() => {
      const keys = [
        'coveralls',
        'eslint',
        'eslint-config-xo-space',
        'eslint-plugin-jest',
        'eslint-plugin-jsdoc',
        'eslint-plugin-no-unsafe-innerhtml',
        'eslint-plugin-node',
        'eslint-plugin-promise',
        'eslint-plugin-scanjs-rules',
        'eslint-plugin-security',
        'eslint-plugin-standard',
        'complexity-report',
        'jsdoc-to-markdown',
        'swagger-markdown'
      ]
      return _.omit(rootPkg.devDependencies, keys)
    })()
    // Add npm devDependencies and scripts
    const npmScripts = _.template(JSON.stringify(npmScriptsPkg))({
      name: this.options.name
    })
    this.fs.extendJSON(this.destinationPath('', 'package.json'), {
      devDependencies: devDependencies,
      scripts: JSON.parse(npmScripts)
    })

    // Copy Javsacript callouts
    // let filepath = this.destinationPath(this.options.generateInto, 'lib/index.js')
    //
    // this.fs.copyTpl(this.templatePath('lib/index.js'), filepath)
    //
    // this.composeWith(require.resolve('generator-jest/generators/test'), {
    //   arguments: [filepath],
    //   componentName: _.camelCase(this.options.name)
    // })
    // Copy jest configuration file
    let filepath = this.destinationPath(this.options.generateInto, 'jest.config.json')

    this.fs.copy(this.templatePath('jest.config.json'), filepath)

    // Copy sonar properties
    filepath = this.destinationPath(this.options.generateInto, 'sonar-project.properties')

    this.fs.copyTpl(this.templatePath('sonar-project.properties'), filepath, {
      scmAccount: 'CAOV',
      projectName: this.options.name,
      version: rootPkg.version
    })

    // Copy .assets
    const assets = [
      '.assets/README.md',
      '.assets/media/README.md',
      '.assets/media/audio/README.md',
      '.assets/media/img/README.md',
      '.assets/media/video/README.md'
    ]

    assets.forEach(asset => {
      filepath = this.destinationPath(this.options.generateInto, asset)
      this.fs.copyTpl(this.templatePath(asset), filepath, {
        projectName: this.options.name,
        author: {
          name: this.options.authorName,
          url: this.options.authorUrl
        },
        license: rootPkg.license
      })
    })

    // Copy .github templates
    const templates = [
      '.github/CODE_OF_CONDUCT.md',
      '.github/CONTRIBUTING.md',
      '.github/ISSUE_TEMPLATE.md',
      '.github/PULL_REQUEST_TEMPLATE.md',
      '.github/README.md'
    ]

    templates.forEach(template => {
      filepath = this.destinationPath(this.options.generateInto, template)
      this.fs.copyTpl(this.templatePath(template), filepath, {
        projectName: this.options.name,
        author: {
          name: this.options.authorName,
          url: this.options.authorUrl
        },
        license: rootPkg.license
      })
    })

    // Copy apiproxy resources
    const apiproxyResources = [
      'apiproxy/README.md',
      'apiproxy/policies/README.md',
      'apiproxy/proxies/README.md',
      'apiproxy/resources/jsc/README.md',
      'apiproxy/targets/README.md'
    ]

    apiproxyResources.forEach(resource => {
      filepath = this.destinationPath(this.options.generateInto, resource)
      this.fs.copyTpl(this.templatePath(resource), filepath, {
        projectName: this.options.name,
        author: {
          name: this.options.authorName,
          url: this.options.authorUrl
        },
        license: rootPkg.license
      })
    })

    // Copy openapi directory
    filepath = this.destinationPath(this.options.generateInto, 'openapi/README.md')

    this.fs.copyTpl(this.templatePath('openapi/README.md'), filepath, {
      projectName: this.options.name,
      author: {
        name: this.options.authorName,
        url: this.options.authorUrl
      },
      license: rootPkg.license
    })
  }
}

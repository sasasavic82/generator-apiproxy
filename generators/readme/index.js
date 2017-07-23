'use strict'
const ApiProxyGenerator = require('../api-proxy-generator')
const _ = require('lodash')
const rootPkg = require('../../package.json')
const path = require('path')

module.exports = class extends ApiProxyGenerator {
  constructor (args, options) {
    super(args, options)

    this.option('authorName', {
      type: String,
      required: true,
      desc: 'Author name'
    })

    this.option('authorUrl', {
      type: String,
      required: true,
      desc: 'Author url'
    })

    this.option('coveralls', {
      type: Boolean,
      required: true,
      desc: 'Include coveralls badge'
    })

    this.option('content', {
      type: String,
      required: false,
      desc: 'Readme content'
    })

    this.option('description', {
      type: String,
      required: true,
      desc: 'Project description'
    })

    this.option('scmAccount', {
      type: String,
      required: true,
      desc: 'User github account'
    })

    this.option('name', {
      type: String,
      required: true,
      desc: 'Project name'
    })

    this.option('privateRepo', {
      type: Boolean,
      required: true,
      defaults: false,
      desc: 'Is this a private repository?'
    })

    this.option('version', {
      this: String,
      required: false,
      defaults: rootPkg.version,
      desc: 'Product\'s current semantic version'
    })
  }

  initializing () {
    this._addTableOfContents = () => {
      this.spawnCommand(path.resolve('node_modules', '.bin', 'markdown-toc'), [
        '-i',
        'README.md'
      ])
        .on('error', (err) => this.log(`Ignoring error "${err.message}"`))
    }
  }

  writing () {
    const pkg = this.fs.readJSON(this.destinationPath(this.options.generateInto, 'package.json'), {})
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath(this.options.generateInto, 'README.md'),
      {
        projectName: this.options.name,
        safeProjectName: _.camelCase(this.options.name),
        description: this.options.description,
        scmAccount: this.options.scmAccount,
        author: {
          name: this.options.authorName,
          url: this.options.authorUrl
        },
        license: pkg.license,
        includeCoveralls: this.options.coveralls,
        content: this.options.content,
        privateRepo: this.options.privateRepo,
        version: this.options.version
      }
    )
  }

  end () {
    this._addTableOfContents()
  }
}

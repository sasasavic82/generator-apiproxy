/* eslint security/detect-non-literal-fs-filename: "off" */
'use strict'
const YeomanGenerator = require('yeoman-generator')
const _ = require('lodash')
const chalk = require('chalk')
const extend = _.merge
const path = require('path')
const pkgJson = require('../../package.json')
const util = require('../util')

module.exports = class extends YeomanGenerator {
  constructor (args, options) {
    super(args, options)

    this.option('name', {
      type: String,
      required: true,
      default: path.basename(process.cwd()),
      desc: 'API Proxy machine name',
      filter: _.kebabCase,
      validate (str) {
        /* istanbul ignore next: research inquirer.js filter test coverage */
        return str.length > 0
      }
    })

    this.option('travis', {
      type: Boolean,
      required: false,
      default: true,
      desc: 'Include travis config'
    })

    this.option('boilerplate', {
      type: Boolean,
      required: false,
      default: true,
      desc: 'Include boilerplate files'
    })

    this.option('jsc', {
      type: Boolean,
      required: false,
      default: true,
      desc: 'Add a Javascript callout'
    })

    this.option('coveralls', {
      type: Boolean,
      required: false,
      desc: 'Include coveralls config'
    })

    this.option('editorconfig', {
      type: Boolean,
      required: false,
      default: true,
      desc: 'Include a .editorconfig file'
    })

    this.option('license', {
      type: Boolean,
      required: false,
      default: true,
      desc: 'Include a license'
    })

    this.option('git', {
      type: Boolean,
      required: false,
      defaults: true,
      desc: 'Initialize a Git repository'
    })

    this.option('originUrl', {
      type: String,
      required: true,
      desc: 'Git remote origin URL'
    })

    this.option('projectRoot', {
      type: String,
      required: false,
      default: 'lib',
      desc: 'Relative path to the project code root'
    })
  }

  initializing () {
    // Pre set the default props from the information we have at this point
    util.initializer.init(this)
  }

  _askFor () {
    const prompts = [{
      name: 'name',
      message: 'API Proxy machine name',
      filter: _.kebabCase,
      validate (str) {
        /* istanbul ignore next: research inquirer.js filter test coverage */
        return str.length > 0
      },
      when: !this.props.name
    }, {
      name: 'description',
      message: 'Description',
      when: !this.props.description
    }, {
      name: 'homepage',
      message: 'Project homepage url',
      when: !this.props.homepage
    }, {
      name: 'authorName',
      message: 'Author\'s Name',
      when: !this.props.authorName,
      default: this.user.git.name(),
      store: true
    }, {
      name: 'authorEmail',
      message: 'Author\'s Email',
      when: !this.props.authorEmail,
      default: this.user.git.email(),
      store: true
    }, {
      name: 'authorUrl',
      message: 'Author\'s Homepage',
      when: !this.props.authorUrl,
      store: true
    }, {
      name: 'keywords',
      message: 'Package keywords (comma to split)',
      when: !this.pkg.keywords,
      filter (words) {
        /* istanbul ignore next: research inquirer.js filter test coverage */
        return words.split(/\s*,\s*/g)
      }
    }, {
      name: 'includeCoveralls',
      type: 'confirm',
      message: 'Send coverage reports to coveralls',
      when: _.isUndefined(this.options.coveralls)
    }, {
      name: 'originUrl',
      message: 'Git remote origin URL',
      default: this.originUrl,
      when: !this.props.originUrl
    }]

    return this.prompt(prompts).then((props) => {
      this.props = extend(this.props, props)
    })
  }

  prompting () {
    return this._askFor()
  }

  writing () {
    // Re-read the content at this point because a composed generator might modify it.
    const currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {})

    const pkg = extend({
      name: _.kebabCase(this.props.name),
      version: '0.0.0',
      description: this.props.description,
      homepage: this.props.homepage,
      author: {
        name: this.props.authorName,
        email: this.props.authorEmail,
        url: this.props.authorUrl
      },
      files: [this.options.projectRoot],
      main: path.join(this.options.projectRoot, 'index.js').replace(/\\/g, '/'),
      keywords: [],
      devDependencies: {}
    }, currentPkg)

    if (this.props.includeCoveralls) {
      pkg.devDependencies.coveralls = pkgJson.devDependencies.coveralls
    }

    // Combine the keywords
    if (this.props.keywords && this.props.keywords.length) {
      pkg.keywords = _.uniq(this.props.keywords.concat(pkg.keywords))
    }

    // Let's extend package.json so we're not overwriting user previous fields
    this.fs.writeJSON(this.destinationPath('package.json'), pkg)
  }

  _composeWithBoilerplate (props) {
    if (this.options.boilerplate) {
      this.composeWith(require.resolve('../boilerplate'), props)
    }
    return this
  }

  _composeWithEditorConfig () {
    if (this.options.editorconfig) {
      this.composeWith(require.resolve('../editorconfig'))
    }
    return this
  }

  _composeWithGit () {
    if (this.options.git) {
      this.composeWith(require.resolve('../git'), {
        name: this.props.name,
        originUrl: this.props.originUrl,
        scmAccount: this.props.scmAccount
      })
    }
    return this
  }

  _composeWithJsc (props) {
    if (this.options.jsc) {
      this.composeWith(require.resolve('../jsc'), props)
    }
    return this
  }

  _composeWithLicense () {
    if (this.options.license && !this.pkg.license) {
      this.composeWith(require.resolve('generator-license/app'), {
        name: this.props.authorName,
        email: this.props.authorEmail,
        website: this.props.authorUrl
      })
    }
    return this
  }

  _composeWithTravis () {
    if (this.options.travis) {
      let options = {config: {}}
      if (this.props.includeCoveralls) {
        options.config['after_script'] = 'cat ./coverage/lcov.info | coveralls'
      }
      this.composeWith(require.resolve('generator-travis/generators/app'), options)
    }
    return this
  }

  _composeWithReadme (props) {
    if (!this.fs.exists(this.destinationPath('README.md'))) {
      this.composeWith(require.resolve('../readme'), props)
    }
    return this
  }

  default () {
    const props = util.initializer.props(this)

    this.composeWith(require.resolve('../docs'), props)
    this.composeWith(require.resolve('../nsp'))
    this.composeWith(require.resolve('../eslint'))

    this.composeWith(require.resolve('generator-jest/generators/app'), {
      testEnvironment: 'node',
      coveralls: false
    })

    this._composeWithBoilerplate(props)
      ._composeWithEditorConfig()
      ._composeWithGit()
      ._composeWithJsc(props)
      ._composeWithLicense()
      ._composeWithReadme(props)
      ._composeWithTravis()
  }

  installing () {
    this.npmInstall()
  }

  end () {
    this.log('Thanks for using Yeoman.')

    if (this.options.travis) {
      /* istanbul ignore next: defer */
      let travisUrl = chalk.cyan(`https://travis-ci.org/profile/${this.props.scmAccount || ''}`)
      this.log(`- Enable Travis integration at ${travisUrl}`)
    }

    if (this.props.includeCoveralls) {
      let coverallsUrl = chalk.cyan('https://coveralls.io/repos/new')
      this.log(`- Enable Coveralls integration at ${coverallsUrl}`)
    }
  }
}

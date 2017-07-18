/* eslint security/detect-non-literal-fs-filename: "off" */
'use strict'
const _ = require('lodash')
const chalk = require('chalk')
const extend = _.merge
const parseAuthor = require('parse-author')
const path = require('path')
const pkgJson = require('../../package.json')
const YeomanGenerator = require('yeoman-generator')

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
      default: false,
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
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {})

    // Pre set the default props from the information we have at this point
    this.props = {
      name: this.pkg.name,
      description: this.pkg.description,
      version: this.pkg.version,
      homepage: this.pkg.homepage
    }

    if (_.isObject(this.pkg.author)) {
      this.props.authorName = this.pkg.author.name
      this.props.authorEmail = this.pkg.author.email
      this.props.authorUrl = this.pkg.author.url
    } else if (_.isString(this.pkg.author)) {
      const info = parseAuthor(this.pkg.author)
      this.props.authorName = info.name
      this.props.authorEmail = info.email
      this.props.authorUrl = info.url
    }

    if (_.isObject(this.pkg.repository)) {
      this.props.originUrl = this.pkg.repository.url
    } else {
      this.props.originUrl = this.pkg.repository
    }
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
      when: this.options.coveralls === undefined
    }, {
      name: 'originUrl',
      message: 'Git remote origin URL',
      default: this.originUrl,
      when: !this.props.originUrl
    }]

    return this.prompt(prompts).then(props => {
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

  default () {
    if (this.options.travis) {
      let options = {config: {}}
      if (this.props.includeCoveralls) {
        options.config.after_script = 'cat ./coverage/lcov.info | coveralls' // eslint-disable-line camelcase
      }
      this.composeWith(require.resolve('generator-travis/generators/app'), options)
    }

    if (this.options.editorconfig) {
      this.composeWith(require.resolve('../editorconfig'))
    }

    this.composeWith(require.resolve('../nsp'))
    this.composeWith(require.resolve('../eslint'))

    if (this.options.git) {
      this.composeWith(require.resolve('../git'), {
        name: this.props.name,
        originUrl: this.props.originUrl,
        scmAccount: this.props.scmAccount
      })
    }

    this.composeWith(require.resolve('generator-jest/generators/app'), {
      testEnvironment: 'node',
      coveralls: false
    })

    if (this.options.boilerplate) {
      this.composeWith(require.resolve('../boilerplate'), {
        license: this.props.license,
        name: this.props.name
      })
    }

    if (this.options.jsc) {
      this.composeWith(require.resolve('../jsc'), {
        name: this.props.name
      })
    }

    this.composeWith(require.resolve('../docs'), {
      projectName: this.options.name,
      author: {
        name: this.options.authorName,
        url: this.options.authorUrl
      },
      license: this.props.license
    })

    if (this.options.license && !this.pkg.license) {
      this.composeWith(require.resolve('generator-license/app'), {
        name: this.props.authorName,
        email: this.props.authorEmail,
        website: this.props.authorUrl
      })
    }

    if (!this.fs.exists(this.destinationPath('README.md'))) {
      this.composeWith(require.resolve('../readme'), {
        name: this.props.name,
        description: this.props.description,
        originUrl: this.props.originUrl,
        authorName: this.props.authorName,
        authorUrl: this.props.authorUrl,
        coveralls: this.props.includeCoveralls,
        content: this.options.readme,
        scmAccount: this.props.scmAccount
      })
    }
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

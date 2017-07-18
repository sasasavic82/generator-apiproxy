'use strict'

const YeomanGenerator = require('yeoman-generator')
const rootPkg = require('../../package.json')
const complexity = require('./complexity')

module.exports = class extends YeomanGenerator {
  constructor (args, options) {
    super(args, options)

    this.option('authorName', {
      type: String,
      required: true,
      defaults: rootPkg.author.name,
      desc: 'License'
    })

    this.option('authorUrl', {
      type: String,
      required: true,
      defaults: rootPkg.author.url,
      desc: 'License'
    })

    this.option('license', {
      type: String,
      required: true,
      defaults: rootPkg.license,
      desc: 'License'
    })

    this.option('name', {
      type: String,
      required: true,
      defaults: rootPkg.name,
      desc: 'Module, package, or component name'
    })

    this.option('generateInto', {
      type: String,
      required: false,
      defaults: 'docs',
      desc: 'Relocate the location of the generated files.'
    })

    this.option('files', {
      type: String,
      required: false,
      defaults: 'lib/*.js',
      desc: 'The files (or glob) you want to generate docs for'
    })
  }

  writing () {
    this.fs.extendJSON(this.destinationPath('', 'package.json'), {
      devDependencies: {
        'complexity-report': rootPkg.devDependencies['complexity-report'],
        'jsdoc-to-markdown': rootPkg.devDependencies['jsdoc-to-markdown'],
        'swagger-markdown': rootPkg.devDependencies['swagger-markdown']
      },
      scripts: {
        docs: 'npm run docs:swagger:apis && npm run docs:jsc',
        'docs:jsc': 'npm run docs:jsc:apis && npm run docs:jsc:complexity',
        'docs:jsc:apis': 'jsdoc2md --files lib/*.js > docs/JSCS.md',
        'docs:jsc:complexity': 'cr --format markdown lib/*.js > docs/COMPLEXITY.md',
        'docs:swagger:apis': 'swagger-markdown -i openapi/*.json -o docs/SWAGGER.md'
      }
    })

    complexity.report.factory(this)
      .then(report => {
        this.fs.copyTpl(
          this.templatePath('../complexity/templates/COMPLEXITY.erb.md'),
          this.destinationPath(this.options.generateInto, 'COMPLEXITY.md'),
          report
        )
      })
      .catch(err => this.log(`Error: ${err}`))

    this.fs.copyTpl(
      this.templatePath('JSCS.md'),
      this.destinationPath(this.options.generateInto, 'JSCS.md'),
      {
        projectName: this.options.name,
        author: {
          name: this.options.authorName,
          url: this.options.authorUrl
        },
        license: rootPkg.license
      }
    )

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath(this.options.generateInto, 'README.md'),
      {
        projectName: this.options.name,
        description: this.options.description,
        scmAccount: this.options.scmAccount,
        author: {
          name: this.options.authorName,
          url: this.options.authorUrl
        },
        license: rootPkg.license
      }
    )

    this.fs.copyTpl(
      this.templatePath('SWAGGER.md'),
      this.destinationPath(this.options.generateInto, 'SWAGGER.md'),
      {
        projectName: this.options.name,
        author: {
          name: this.options.authorName,
          url: this.options.authorUrl
        },
        license: rootPkg.license
      }
    )

    this.fs.copy(
      this.templatePath('TERMS_OF_SERVICE.md'),
      this.destinationPath(this.options.generateInto, 'TERMS_OF_SERVICE.md')
    )
  }
}

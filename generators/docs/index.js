const YeomanGenerator = require('yeoman-generator')
const rootPkg = require('../../package.json')

module.exports = class extends YeomanGenerator {
  constructor (args, options) {
    super(args, options)

    this.option('generateInto', {
      type: String,
      required: false,
      defaults: 'docs',
      desc: 'Relocate the location of the generated files.'
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
        'docs:jsc': 'npm run docs:jsc:apis && npm run:jsc:complexity',
        'docs:jsc:apis': 'jsdoc2md --files lib/*.js > docs/JSCS.md',
        'docs:jsc:complexity': 'cr --format markdown lib/*.js > docs/COMPLEXITY.md',
        'docs:swagger:apis': 'swagger-markdown -i openapi/*.yml -o docs/SWAGGER.e2e.md'
      }
    })

    this.fs.copyTpl(
      this.templatePath('COMPLEXITY.md'),
      this.destinationPath(this.options.generateInto, 'COMPLEXITY.md'),
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
        githubAccount: this.options.githubAccount,
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

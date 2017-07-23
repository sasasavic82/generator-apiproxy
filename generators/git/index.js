
const ApiProxyGenerator = require('../api-proxy-generator')
const originUrl = require('git-remote-origin-url')

module.exports = class extends ApiProxyGenerator {
  constructor (args, options) {
    super(args, options)

    this.option('name', {
      type: String,
      required: true,
      desc: 'Module name'
    })

    this.option('scmAccount', {
      type: String,
      required: true,
      desc: 'Source control account name'
    })

    this.option('originUrl', {
      type: String,
      required: true,
      desc: 'Git remote origin URL'
    })
  }

  initializing () {
    this.fs.copy(
      this.templatePath('gitattributes'),
      this.destinationPath(this.options.generateInto, '.gitattributes')
    )

    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath(this.options.generateInto, '.gitignore')
    )

    return originUrl(this.destinationPath(this.options.generateInto))
      .then((url) => (this.originUrl = url))
      .catch(() => {
        this.originUrl = this.options.originUrl
      })
  }

  writing () {
    this.pkg = this.fs.readJSON(this.destinationPath(this.options.generateInto, 'package.json'), {})

    let repository = this.originUrl

    this.pkg.repository = this.pkg.repository || repository

    this.fs.writeJSON(this.destinationPath(this.options.generateInto, 'package.json'), this.pkg)
  }

  end () {
    this.spawnCommandSync('git', ['init', '--quiet'], {
      cwd: this.destinationPath(this.options.generateInto)
    })

    /* istanbul ignore else */
    if (this.pkg.repository) {
      this.spawnCommandSync('git', ['remote', 'add', 'origin', this.pkg.repository], {
        cwd: this.destinationPath(this.options.generateInto)
      })
    }
  }
}

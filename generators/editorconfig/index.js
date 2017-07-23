
const ApiProxyGenerator = require('../api-proxy-generator')

module.exports = class extends ApiProxyGenerator {
  initializing () {
    this.fs.copy(
      this.templatePath('editorconfig'),
      this.destinationPath(this.options.generateInto, '.editorconfig')
    )
  }
}

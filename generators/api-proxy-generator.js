const YeomanGenerator = require('yeoman-generator')

class ApiProxyGenerator extends YeomanGenerator {
  constructor (args, options) {
    super(args, options)

    this.option('generateInto', {
      type: String,
      required: false,
      default: '',
      desc: 'Relocate the location of the generated files.'
    })
  }
}

module.exports = ApiProxyGenerator

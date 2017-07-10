const assert = require('yeoman-assert')
const helpers = require('yeoman-test')

describe('apigee-apiproxy:editorconfig', () => {
  it('creates .editorconfig', () => helpers.run(require.resolve('../../generators/editorconfig'))
    .then(() => assert.file('.editorconfig')))

  it('respect --generate-into option', () => helpers.run(require.resolve('../../generators/editorconfig'))
    .withOptions({generateInto: 'other/'})
    .then(() => assert.file('other/.editorconfig')))
})

/* globals jasmine */

const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000

describe('apiproxy:editorconfig', () => {
  it('creates .editorconfig', () => helpers.run(require.resolve('../../generators/editorconfig'))
    .then(() => assert.file('.editorconfig')))

  it('respect --generate-into option', () => helpers.run(require.resolve('../../generators/editorconfig'))
    .withOptions({generateInto: 'other/'})
    .then(() => assert.file('other/.editorconfig')))
})

/* globals jasmine */

const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000

describe('apiproxy:jsc', () => {
  beforeEach(() => helpers.run(require.resolve('../../generators/jsc'))
    .withArguments([
      'someSidebar'
    ]))

  it('creates and fill contents in lib/some-sidebar.js', () => {
    assert.file('lib/some-sidebar.js')
    assert.fileContent('lib/some-sidebar.js', 'const someSidebar = {')
    assert.fileContent('lib/some-sidebar.js', 'module.exports = someSidebar')
  })

  it('creates a jest BDD stub in lib/__tests__/some-sidebar.test.js', () => {
    assert.file('lib/__tests__/someSidebar.test.js')
    assert.fileContent('lib/__tests__/someSidebar.test.js', 'const someSidebar = require(\'../some-sidebar.js\')')
  })
})

describe('apiproxy:jsc --generate-into', () => {
  beforeEach(() => helpers.run(require.resolve('../../generators/jsc'))
    .withArguments([
      'another-sidebar'
    ]).withOptions({
      generateInto: 'other/'
    }))

  it('generates and fill contents into a user-specified location', () => {
    assert.file('other/another-sidebar.js')
    assert.fileContent('other/another-sidebar.js', 'const anotherSidebar = {')
    assert.fileContent('other/another-sidebar.js', 'module.exports = anotherSidebar')
  })

  it('creates a jest BDD stub in __tests__/another-sidebar.test.js', () => {
    assert.file('other/__tests__/anotherSidebar.test.js')
    assert.fileContent('other/__tests__/anotherSidebar.test.js', 'const anotherSidebar = require(\'../another-sidebar.js\')')
  })
})

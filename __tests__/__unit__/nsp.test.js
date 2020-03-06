/* globals jasmine */

const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const rootPkg = require('../../package.json')
jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000

describe('apiproxy:nsp', () => {
  it('setup nsp in project', () => helpers.run(require.resolve('../../generators/nsp')).then(() => {
    assert.jsonFileContent('package.json', {
      devDependencies: {
        nsp: rootPkg.devDependencies.nsp
      },
      scripts: {
        prepublish: 'npm audit --parseable',
        posttest: 'npm audit --parseable'
      }
    })
  }))
})

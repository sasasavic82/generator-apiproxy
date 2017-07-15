/* globals jasmine */

const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000

describe('apiproxy:eslint', () => {
  it('fill package.json', () => helpers.run(require.resolve('../../generators/eslint'))
    .then(() => {
      assert.fileContent('package.json', /"eslint-config-xo-space":/)
      assert.jsonFileContent('package.json', {
        eslintConfig: {
          extends: 'xo-space',
          env: {
            jest: true
          }
        },
        scripts: {
          pretest: 'eslint . -c .eslintrc.yml --fix'
        }
      })
      assert.file('.eslintignore')
      assert.file('.eslintrc.yml')
    }))

  it('respect --generate-into option as the root of the scaffolding', () => helpers.run(require.resolve('../../generators/eslint'))
    .withOptions({generateInto: 'other/'})
    .then(() => {
      assert.fileContent('other/package.json', /"eslint-config-xo-space":/)
      assert.jsonFileContent('other/package.json', {
        eslintConfig: {
          extends: 'xo-space'
        }
      })
      assert.file('other/.eslintignore')
      assert.file('other/.eslintrc.yml')
    }))
})

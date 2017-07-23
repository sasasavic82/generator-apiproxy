/* globals jasmine */

const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000

describe('apiproxy:eslint', () => {
  it('fill package.json', () => helpers.run(require.resolve('../../generators/eslint'))
    .then(() => {
      const eslintDeps = [
        'eslint',
        'eslint-config-xo-space',
        'eslint-plugin-import',
        'eslint-plugin-jest',
        'eslint-plugin-jsdoc',
        'eslint-plugin-no-unsafe-innerhtml',
        'eslint-plugin-no-unsanitized',
        'eslint-plugin-node',
        'eslint-plugin-promise',
        'eslint-plugin-scanjs-rules',
        'eslint-plugin-security',
        'eslint-plugin-standard',
        'eslint-plugin-xss'
      ]
      eslintDeps.forEach((dep) => assert.fileContent('package.json', dep))

      assert.jsonFileContent('package.json', {
        eslintConfig: {
          extends: 'xo-space',
          env: {
            jest: true
          }
        },
        scripts: {
          pretest: 'eslint . -c .eslintrc.yml --fix',
          'docs:eslint-index': 'npm run lint:rules --  --docs --format table > docs/ESLINT_RULES.md',
          lint: 'eslint -c .eslintrc.yml generators/** __tests__/** -f table --fix',
          'lint:rules': 'eslint-index .eslintrc.yml',
          'swagger:lint': 'swagger validate *.swagger.yaml --debug && swagger validate *.swagger.json --debug',
          'eslint:html': './node_modules/.bin/eslint -c ./.eslintrc.yml -f html generators/**/*.js --fix > ./eslint-report.html',
          eslint: './node_modules/.bin/eslint -c ./.eslintrc.yml -f table generators/**/*.js --fix'
        }
      })
      assert.file('.eslintignore')
      assert.file('.eslintrc.yml')
    }))

  it('respect --generate-into option as the root of the scaffolding', () => helpers.run(require.resolve('../../generators/eslint'))
    .withOptions({generateInto: 'other/'})
    .then(() => {
      assert.fileContent('other/package.json', 'eslint-config-xo-space')
      assert.jsonFileContent('other/package.json', {
        eslintConfig: {
          extends: 'xo-space'
        }
      })
      assert.file('other/.eslintignore')
      assert.file('other/.eslintrc.yml')
    }))
})

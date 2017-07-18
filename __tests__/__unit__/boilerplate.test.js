/* globals jasmine */

const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000

describe('apiproxy:boilerplate', () => {
  beforeEach(() => {
    return helpers.run(require.resolve('../../generators/boilerplate'))
      .withOptions({
        scmAccount: 'CAOV',
        license: 'Apache-2.0',
        name: 'my-module'
      })
  })

  it('creates .assets boilerplate files', () => {
    assert.file('.assets/README.md')
    assert.file('.assets/media/README.md')
    assert.file('.assets/media/audio/README.md')
    assert.file('.assets/media/img/README.md')
    assert.file('.assets/media/video/README.md')
    assert.fileContent('.assets/README.md', '# `.assets/` directory')
  })

  it('creates .github template boilerplate files', () => {
    assert.file('.github/CODE_OF_CONDUCT.md')
    assert.file('.github/CONTRIBUTING.md')
    assert.file('.github/ISSUE_TEMPLATE.md')
    assert.file('.github/PULL_REQUEST_TEMPLATE.md')
    assert.file('.github/README.md')
  })

  it('creates apiproxy template boilerplate files', () => {
    assert.file('apiproxy/README.md')
    assert.file('apiproxy/policies/README.md')
    assert.file('apiproxy/proxies/README.md')
    assert.file('apiproxy/resources/jsc/README.md')
    assert.file('apiproxy/targets/README.md')
  })

  it('creates sonar-project.properties template boilerplate file', () => {
    assert.file('sonar-project.properties')
    assert.fileContent('sonar-project.properties', 'sonar.projectKey=CAOV-my-module')
    assert.fileContent('sonar-project.properties', 'sonar.projectName=my-module')
    assert.fileContent('sonar-project.properties', 'sonar.projectVersion=0.0.0')
    assert.fileContent('sonar-project.properties', 'sonar.links.issue=https://github.com/CAOV/my-module/issues')
  })

  // it('creates test boilerplate files', () => {
  //   assert.file('lib/index.js')
  //   assert.file('lib/__tests__/myModule.test.js')
  //   assert.file('jest.config.json')
  //   assert.fileContent('lib/index.js', 'module.exports = {}')
  //   assert.fileContent('lib/__tests__/myModule.test.js', 'const myModule')
  //   assert.fileContent('lib/__tests__/myModule.test.js', 'describe(\'myModule\'')
  // })

  it('creates openapi template boilerplate files', () => {
    assert.file('openapi/README.md')
    assert.fileContent('openapi/README.md', 'Apache-2.0 ©')
  })

  it('adds npm-scripts to the package.json', () => {
    assert.file('package.json')
    const npmScriptKeys = [
      'apigee:apiproxy:deploy',
      'apigee:apiproxy:update',
      'apigee:deploy-api',
      'apigee:generate-api',
      'apigee:update:policies',
      'apigee:update:proxies',
      'apigee:update:resources:jsc',
      'apigee:update:resources:openapi',
      'apigee:update:targets',
      'apigee:update:zip',
      'btp',
      'build',
      'build-test-push',
      'minify',
      'readme:toc',
      'security',
      'swagger:lint',
      'pretest',
      'test',
      'posttest'
    ]
    npmScriptKeys.forEach(key => assert.fileContent('package.json', key))
  })
})

describe('apiproxy:boilerplate --generate-into', () => {
  beforeEach(() => {
    return helpers.run(require.resolve('../../generators/boilerplate'))
      .withOptions({name: 'my-module', generateInto: 'other/'})
  })

  it('creates apiproxy template boilerplate files', () => {
    assert.file('other/apiproxy/README.md')
    assert.file('other/apiproxy/policies/README.md')
    assert.file('other/apiproxy/proxies/README.md')
    assert.file('other/apiproxy/resources/jsc/README.md')
    assert.file('other/apiproxy/targets/README.md')
  })
})

/* globals jasmine */

const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000

describe('apiproxy:git', () => {
  beforeEach(() => {
    jest.mock('git-remote-origin-url', () => {
      const url = 'git@github.com:talk-the-talk/mock-the-mock.git'
      return () => Promise.resolve(url)
    })

    return helpers.run(require.resolve('../../generators/git'))
      .withOptions({
        repositoryPath: 'gregswindle/generator-apiproxy'
      })
  })

  afterAll(() => jest.clearAllMocks())

  it('creates the git config files and initializes the repository', () => {
    assert.file('.gitignore')
    assert.file('.gitattributes')
    assert.file('.git')
  })
})

describe('apiproxy:git cli', () => {
  beforeEach(() => {
    jest.mock('git-remote-origin-url', () => {
      const url = 'git@github.com:talk-the-talk/mock-the-mock.git'
      return () => Promise.resolve(url)
    })

    return helpers.run(require.resolve('../../generators/git'))
      .withOptions({
        repositoryPath: 'https://github.com/gregswindle/generator-apiproxy.git',
        generateInto: 'other/'
      })
  })

  afterAll(() => jest.clearAllMocks())

  it('respects --generate-into option', () => {
    assert.file('other/.gitignore')
    assert.file('other/.gitattributes')
    assert.file('other/.git')
  })
})

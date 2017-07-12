const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const fs = require('fs')

describe('apigee-apiproxy:git', () => {
  beforeEach(() => {
    jest.mock('git-remote-origin-url', () => {
      const url = 'git@github.com:talk-the-talk/mock-the-mock.git'
      return () => Promise.resolve(url)
    })
  })

  afterAll(() => jest.clearAllMocks())

  it('creates the git config files and initializes the repository', () => {
    return helpers.run(require.resolve('../../generators/git'))
      .withOptions({
        repositoryPath: 'gregswindle/generator-apigee-apiproxy'
      })
      .then(() => {
        assert.file('.gitignore')
        assert.file('.gitattributes')
        assert.file('.git')
      })
  })

  it('respects --generate-into option', () => {
    return helpers.run(require.resolve('../../generators/git'))
      .withOptions({
        repositoryPath: 'gregswindle/generator-apigee-apiproxy',
        generateInto: 'other/'
      })
      .then(() => {
        assert.file('other/.gitignore')
        assert.file('other/.gitattributes')
        assert.file('other/.git')
      })
  })

  it('builds an ssh uri from package.json if the remote call fails', () => {
    let gen = null
    jest.mock('git-remote-origin-url', () => {
      return () => Promise.reject(new Error('git remote unreachable'))
    })

    fs.readJSON = jest.fn(() => {
      return {repository: 'talk-the-talk/mock-the-mock'}
    })

    return helpers.run(require.resolve('../../generators/git'))
      .withOptions({
        repositoryPath: null
      })
      .on('ready', function (generator) {
        gen = generator
        generator.spawnCommandSync = jest.fn()
      })
      .on('end', function () {
        expect(gen.spawnCommandSync.mock.calls.length).toBe(1)
        fs.readJSON.mockClear()
        gen.spawnCommandSync.mockClear()
      })
  })
})

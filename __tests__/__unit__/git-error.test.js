/* globals jasmine */

const helpers = require('yeoman-test')
const fs = require('fs')
jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000

describe('apiproxy:git', () => {
  beforeEach(() => {
    jest.mock('git-remote-origin-url', () => {
      return () => Promise.reject(new Error('fatal: unrecogized host'))
    })
  })

  afterAll(() => jest.clearAllMocks())

  it('--originUrl', () => {
    let gen = null

    fs.readJSON = jest.fn(() => {
      return {repository: 'talk-the-talk/mock-the-mock'}
    })

    return helpers.run(require.resolve('../../generators/git'))
      .withOptions({
        repositoryPath: null,
        originUrl: 'git@github.com:talk-the-talk/mock-the-mock.git'
      })
      .on('ready', function (generator) {
        gen = generator
        generator.spawnCommandSync = jest.fn()
      })
      .on('end', function () {
        expect(gen.spawnCommandSync.mock.calls.length).toBe(2)
        expect(gen.spawnCommandSync.mock.calls[0][1][0]).toBe('init')
        expect(gen.spawnCommandSync.mock.calls[1][1][0]).toBe('remote')
        fs.readJSON.mockClear()
        gen.spawnCommandSync.mockClear()
      })
  })
})

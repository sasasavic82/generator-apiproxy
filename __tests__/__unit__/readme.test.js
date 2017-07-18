/* globals jasmine */

const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000

describe('apiproxy:readme', () => {
  beforeEach(() => helpers.run(require.resolve('../../generators/readme'))
    .withOptions({
      name: 'my-project',
      description: 'a cool project',
      scmAccount: 'yeoman',
      authorName: 'Yeoman',
      authorUrl: 'http://yeoman.io',
      coveralls: true,
      privateRepo: false
    })
    .on('ready', (gen) => {
      gen.fs.writeJSON(gen.destinationPath('package.json'), {
        license: 'MIT'
      })
    }))

  it('creates and fill contents in README.md', () => {
    assert.file('README.md')
    assert.fileContent('README.md', 'const myProject = require(\'my-project\');')
    assert.fileContent('README.md', '> a cool project')
    assert.fileContent('README.md', '$ npm install --save my-project')
    assert.fileContent('README.md', 'MIT © [Yeoman](http://yeoman.io)')
    assert.fileContent('README.md', '[travis-image]: https://travis-ci.org/yeoman/my-project.svg?branch=master')
    assert.fileContent('README.md', 'coveralls')
  })
})

describe('apiproxy:readme for private repositories', () => {
  beforeEach(() => helpers.run(require.resolve('../../generators/readme'))
    .withOptions({
      name: 'my-project',
      description: 'a cool project',
      scmAccount: 'yeoman',
      authorName: 'Yeoman',
      authorUrl: 'http://yeoman.io',
      coveralls: false,
      privateRepo: true
    })
    .on('ready', (gen) => {
      gen.fs.writeJSON(gen.destinationPath('package.json'), {
        license: 'MIT'
      })
    }))

  it('creates and fill contents in README.md', () => {
    assert.file('README.md')
    assert.fileContent('README.md', 'const myProject = require(\'my-project\');')
    assert.fileContent('README.md', '> a cool project')
    assert.fileContent('README.md', '$ npm install --save my-project')
    assert.fileContent('README.md', 'MIT © [Yeoman](http://yeoman.io)')
    assert.fileContent('README.md', '[![Build Status][jenkins-image]][jenkins-url]')
  })
})

describe('apiproxy:readme --content', () => {
  beforeEach(() => helpers.run(require.resolve('../../generators/readme'))
    .withOptions({
      name: 'my-project',
      description: 'a cool project',
      scmAccount: 'yeoman',
      authorName: 'Yeoman',
      authorUrl: 'http://yeoman.io',
      coveralls: true,
      content: 'My custom content'
    })
    .on('ready', (gen) => {
      gen.fs.writeJSON(gen.destinationPath('package.json'), {
        license: 'MIT'
      })
    }))

  it('fill custom contents in README.md', () => {
    assert.file('README.md')
    assert.fileContent('README.md', 'My custom content')
    assert.fileContent('README.md', 'MIT © [Yeoman](http://yeoman.io)')
    assert.fileContent('README.md', '[travis-image]: https://travis-ci.org/yeoman/my-project.svg?branch=master')
    assert.fileContent('README.md', 'coveralls')
  })
})

describe('apiproxy:readme --no-coveralls', () => {
  beforeEach(() => helpers.run(require.resolve('../../generators/readme'))
    .withOptions({
      name: 'my-project',
      description: 'a cool project',
      scmAccount: 'yeoman',
      authorName: 'Yeoman',
      authorUrl: 'http://yeoman.io',
      coveralls: false
    })
    .on('ready', (gen) => {
      gen.fs.writeJSON(gen.destinationPath('package.json'), {
        license: 'MIT'
      })
    }))

  it('does not include coveralls badge README.md', () => {
    assert.noFileContent('README.md', 'coveralls')
  })
})

describe('apiproxy:readme --generate-into', () => {
  beforeEach(() => helpers.run(require.resolve('../../generators/readme'))
    .withOptions({
      name: 'my-project',
      description: 'a cool project',
      scmAccount: 'yeoman',
      authorName: 'Yeoman',
      authorUrl: 'http://yeoman.io',
      coveralls: true,
      generateInto: 'other/'
    })
    .on('ready', (gen) => {
      gen.fs.writeJSON(gen.destinationPath('other/package.json'), {
        license: 'MIT'
      })
    }))

  it('creates and fill contents in README.md', () => {
    assert.file('other/README.md')
    assert.fileContent('other/README.md', 'const myProject = require(\'my-project\');')
    assert.fileContent('other/README.md', '> a cool project')
    assert.fileContent('other/README.md', '$ npm install --save my-project')
    assert.fileContent('other/README.md', 'MIT © [Yeoman](http://yeoman.io)')
    assert.fileContent('other/README.md', '[travis-image]: https://travis-ci.org/yeoman/my-project.svg?branch=master')
    assert.fileContent('other/README.md', 'coveralls')
  })
})

describe('apiproxy:readme --content and --generate-into', () => {
  beforeEach(() => helpers.run(require.resolve('../../generators/readme'))
    .withOptions({
      name: 'my-project',
      description: 'a cool project',
      scmAccount: 'yeoman',
      authorName: 'Yeoman',
      authorUrl: 'http://yeoman.io',
      coveralls: true,
      content: 'My custom content',
      generateInto: 'other/'
    })
    .on('ready', (gen) => {
      gen.fs.writeJSON(gen.destinationPath('other/package.json'), {
        license: 'MIT'
      })
    }))

  it('fill custom contents in README.md', () => {
    assert.file('other/README.md')
    assert.fileContent('other/README.md', 'My custom content')
    assert.fileContent('other/README.md', 'MIT © [Yeoman](http://yeoman.io)')
    assert.fileContent('other/README.md', '[travis-image]: https://travis-ci.org/yeoman/my-project.svg?branch=master')
    assert.fileContent('other/README.md', 'coveralls')
  })
})

describe('apiproxy:readme --no-coveralls and --generate-into', () => {
  beforeEach(() => helpers.run(require.resolve('../../generators/readme'))
    .withOptions({
      name: 'my-project',
      description: 'a cool project',
      scmAccount: 'yeoman',
      authorName: 'Yeoman',
      authorUrl: 'http://yeoman.io',
      coveralls: false,
      generateInto: 'other/'
    })
    .on('ready', (gen) => {
      gen.fs.writeJSON(gen.destinationPath('other/package.json'), {
        license: 'MIT'
      })
    }))

  it('does not include coveralls badge README.md', () => {
    assert.noFileContent('other/README.md', 'coveralls')
  })
})

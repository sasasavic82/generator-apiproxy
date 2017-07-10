const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const rootPkg = require('../../package.json')

describe('apigee-apiproxy:docs', () => {
  beforeEach(() => helpers.run(require.resolve('../../generators/docs'))
    .withOptions({
      name: 'oneapi-testproxy-lcov',
      description: 'A cool project.',
      githubAccount: 'CAOV',
      authorName: 'Neck Beard',
      authorUrl: 'http://neckbeard.io',
      license: 'Apache 2.0'
    })
  )

  it('sets up API docs in project', () => helpers.run(require.resolve('../../generators/docs')).then(() => {
    assert.jsonFileContent('package.json', {
      devDependencies: {
        'complexity-report': rootPkg.devDependencies['complexity-report'],
        'jsdoc-to-markdown': rootPkg.devDependencies['jsdoc-to-markdown'],
        'swagger-markdown': rootPkg.devDependencies['swagger-markdown']
      },
      scripts: {
        docs: 'npm run docs:swagger:apis && npm run docs:jsc',
        'docs:jsc': 'npm run docs:jsc:apis && npm run:jsc:complexity',
        'docs:jsc:apis': 'jsdoc2md --files lib/*.js > docs/JSCS.md',
        'docs:jsc:complexity': 'cr --format markdown lib/*.js > docs/COMPLEXITY.md',
        'docs:swagger:apis': 'swagger-markdown -i openapi/*.yml -o docs/SWAGGER.e2e.md'
      }
    })
  }))

  it('creates and fill contents in docs/COMPLEXITY.md', () => {
    assert.file('docs/COMPLEXITY.md')
    assert.fileContent('docs/COMPLEXITY.md', '# `docs/COMPLEXITY.md`')
    assert.fileContent('docs/COMPLEXITY.md', ':information_source: Congratulations! `oneapi-testproxy-lcov` has a mean cyclomatic complexity of 0 (since there aren\'t any custom Javascript callouts to report on).')
    assert.fileContent('docs/COMPLEXITY.md', '## Generate complexity reports')
    assert.fileContent('docs/COMPLEXITY.md', 'Apache-2.0 © [Neck Beard](http://neckbeard.io)')
  })

  it('creates and fill contents in docs/JSCS.md', () => {
    assert.file('docs/JSCS.md')
    assert.fileContent('docs/JSCS.md', '`docs/JSCS.md`')
    assert.fileContent('docs/JSCS.md', '> :information_source: Since `oneapi-testproxy-lcov` has no custom Javascript callout source code, there isn\'t any `jsc` API documentation.')
    assert.fileContent('docs/JSCS.md', '## Generate static Javascript callout API documentation')
    assert.fileContent('docs/JSCS.md', 'Apache-2.0 © [Neck Beard](http://neckbeard.io)')
  })

  it('creates and fill contents in docs/README.md', () => {
    assert.file('docs/README.md')
    assert.fileContent('docs/README.md', '`docs/` directory [![Inline docs][inch-ci-img]][inch-ci-url]')
    assert.fileContent('docs/README.md', '> **:open_file_folder: Static API documentation for `oneapi-testproxy-lcov`\'s `/resources/jsc/` Javascript objects.**')
    assert.fileContent('docs/README.md', 'Apache-2.0 © [Neck Beard](http://neckbeard.io)')
  })

  it('creates and fill contents in docs/SWAGGER.md', () => {
    assert.file('docs/SWAGGER.md')
    assert.fileContent('docs/SWAGGER.md', '# `docs/SWAGGER.md` [![Inline docs][inch-ci-img]][inch-ci-url]')
    assert.fileContent('docs/SWAGGER.md', '> :information_source: Since `oneapi-testproxy-lcov` has no OpenAPI (aka Swagger) documentation, there aren\'t any OpenAPI/Swagger API docs, yet.')
    assert.fileContent('docs/SWAGGER.md', 'Apache-2.0 © [Neck Beard](http://neckbeard.io)')
  })

  it('creates docs/TERMS_OF_SERVICE.md', () => {
    assert.file('docs/TERMS_OF_SERVICE.md')
    assert.fileContent('docs/TERMS_OF_SERVICE.md', '# OneAPI Terms of Service')
    assert.fileContent('docs/TERMS_OF_SERVICE.md', '13. [Subject to Change](#subject-to-change)')
    assert.fileContent('docs/TERMS_OF_SERVICE.md', '© Verizon')
  })
})

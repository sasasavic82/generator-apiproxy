const MarkdownDecorator = require('../markdown-decorator.js')
const fs = require('fs')

describe('MarkdownDecorator', function () {
  let decorator = null
  let markdown = null
  let fixture = null

  beforeAll(() => {
    fixture = fs.readFileSync(require.resolve('./__fixtures__/readme.md', 'utf8'))
  })

  beforeEach(() => {
    markdown = fixture.toString()
    decorator = new MarkdownDecorator(markdown)
  })

  afterEach(() => {
    decorator = null
    markdown = null
  })

  afterAll(() => jest.clearAllMocks())

  it('inserts the package.verison between semver comments', () => {
    decorator.semver('1.1.0-alpha.1')
    expect(decorator.toString()).toContain('<!-- semver -->1.1.0-alpha.1<!-- semverend -->')
  })

  it('inserts a table of contents', () => {
    decorator.toc(markdown)
    expect(decorator.markdown).toContain('- [1. Installation](#1-installation)')
    expect(decorator.markdown).toContain('- [3. Version and CHANGELOG](#3-version-and-changelog)')
  })

  it('supports method chaining', () => {
    const pkg = {version: '1.1.0-alpha.1'}
    const md =
      decorator
        .semver(pkg.version)
        .toc(markdown)
        .toString()
    expect(md).toContain('<!-- semver -->1.1.0-alpha.1<!-- semverend -->')
    expect(md).toContain('- [1. Installation](#1-installation)')
    expect(md).toContain('- [3. Version and CHANGELOG](#3-version-and-changelog)')
  })

  it('decorates all markdown with a single wrapper method', () => {
    const pkg = {version: '3.0.11'}
    const md = decorator.decorate(pkg).markdown
    expect(md).toContain('<!-- semver -->3.0.11<!-- semverend -->')
    expect(md).toContain('- [1. Installation](#1-installation)')
    expect(md).toContain('- [3. Version and CHANGELOG](#3-version-and-changelog)')
  })

  it('can format output based on a template', () => {
    const template = `<%= header %>
    <%= body %>
    ---
    <%= footer %>
    `
    const md = decorator.decorate({version: '1.0.0'}).toString({
      template,
      header: '# TEMPLATE HEADER',
      body: decorator.markdown,
      footer: 'TEMPLATE FOOTER'
    })
    expect(md).toContain('# TEMPLATE HEADER');
    expect(md).toContain('---');
    expect(md).toContain('TEMPLATE FOOTER');
  })

  it('saves the markdown', () => {
    fs.writeFileSync = jest.fn(() => true)
    decorator.decorate({
      version: '1.0.0'
    }).save('mock.md')
    expect(fs.writeFileSync.mock.calls.length).toBe(1)

    fs.writeFileSync.mockClear()
  })
});

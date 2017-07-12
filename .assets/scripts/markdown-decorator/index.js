#!/usr/bin/env node
'use strict'

const MarkdownDecorator = require('./markdown-decorator.js')
const fs = require('fs')
const path = require('path')
const pkg = require(path.resolve('package.json'))

const files = [{
  name: 'README.md',
  filepath: path.resolve('README.md'),
  content: fs.readFileSync(path.resolve('README.md'), 'utf8')
}]

const decorateFile = (file) => {
  const decorator = new MarkdownDecorator(file.content)
  const opts = {
    version: `v${pkg.version}`
  }
  opts.version = '[`' + opts.version + '`][changelog-url]'
  decorator.decorate(opts).save(file.filepath)
}

files.forEach(decorateFile)

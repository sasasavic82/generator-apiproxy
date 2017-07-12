'use strict'
const _ = require('lodash')
const fs = require('fs')
const markdownToc = require('markdown-toc')
const path = require('path')

const regexFactory = options => {
  const regex = new RegExp(`${options.open}(.*)${options.close}`, 'igm')
  return regex
}

const optionsFactory = options => {
  return {
    open: `<!-- ${options.open} -->`,
    close: `<!-- ${options.close} -->`
  }
}

const replacementFactory = (text, replacement, options) => {
  const regex = regexFactory(options)
  return text.replace(regex, `${options.open}${replacement}${options.close}`)
}

class MarkdownDecorator {
  constructor (markdown) {
    this.markdown = markdown.toString()
  }

  decorate(options) {
    this.semver(options.version).toc()
    console.log(this.markdown)
    return this
  }

  save(destPath) {
    fs.writeFileSync(destPath, this.markdown, {
      encoding: 'utf8'
    })
    return this
  }

  semver(version) {
    const opts = optionsFactory({
      open: 'semver',
      close: 'semverend'
    })
    this.markdown = replacementFactory(this.markdown, version, opts)
    return this
  }

  toc() {
    this.markdown = markdownToc.insert(this.markdown)
    return this
  }

  toString(options) {
    const opts = options || {}
    if (opts.template) {
      return _.template(opts.template)(options)
    }
    return this.markdown
  }
}

module.exports = MarkdownDecorator

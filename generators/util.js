const _ = require('lodash')
const parseAuthor = require('parse-author')
const pkg = require('../package.json')
const updateNotifier = require('update-notifier')

const util = {

  initializer: {
    author: (generator) => {
      if (_.isObject(generator.pkg.author)) {
        generator.props.authorName = generator.pkg.author.name
        generator.props.authorEmail = generator.pkg.author.email
        generator.props.authorUrl = generator.pkg.author.url
      } else if (_.isString(generator.pkg.author)) {
        const info = parseAuthor(generator.pkg.author)
        generator.props.authorName = info.name
        generator.props.authorEmail = info.email
        generator.props.authorUrl = info.url
      }
    },

    git: (generator) => {
      if (_.isObject(generator.pkg.repository)) {
        generator.props.originUrl = generator.pkg.repository.url
      } else {
        generator.props.originUrl = generator.pkg.repository
      }
    },

    init: (generator) => {
      generator.pkg = generator.fs.readJSON(generator.destinationPath('package.json'), {})
      generator.props = {
        name: generator.pkg.name,
        description: generator.pkg.description,
        version: generator.pkg.version,
        homepage: generator.pkg.homepage
      }
      util.initializer.author(generator)
      util.initializer.git(generator)
    },

    props: (generator) => {
      return {
        author: {
          name: generator.options.authorName,
          url: generator.options.authorUrl
        },
        authorName: generator.props.authorName,
        authorUrl: generator.props.authorUrl,
        content: generator.options.readme,
        coveralls: generator.props.includeCoveralls,
        description: generator.props.description,
        email: generator.props.authorEmail,
        license: generator.props.license,
        name: generator.props.name,
        originUrl: generator.props.originUrl,
        scmAccount: generator.props.scmAccount,
        website: generator.props.authorUrl
      }
    }
  },

  notify: () => {
    const daily = 1000 * 60 * 60 * 24 * 1
    updateNotifier({
      pkg,
      updateCheckInterval: daily
    }).notify()
  }
}

util.notify()

module.exports = util

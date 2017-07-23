/* eslint security/detect-object-injection: "off" */

const _ = require('lodash')
const escomplex = require('escomplex')
const glob = require('glob-promise')

const CognitiveComplexity = {}
CognitiveComplexity.SIMPLE = [0, 10]
CognitiveComplexity[CognitiveComplexity.SIMPLE] = 'SIMPLE'
CognitiveComplexity.COMPLICATED = [11, 20]
CognitiveComplexity[CognitiveComplexity.COMPLICATED] = 'COMPLICATED'
CognitiveComplexity.CONVOLUTED = [21, 50]
CognitiveComplexity[CognitiveComplexity.CONVOLUTED] = 'CONVOLUTED'
CognitiveComplexity.INCOMPREHENSIBLE = [51, Infinity]
CognitiveComplexity[CognitiveComplexity.INCOMPREHENSIBLE] = 'INCOMPREHENSIBLE'

const isMatch = (cyclomatic, bound) => {
  const c = _.round(cyclomatic)
  const upper = _.last(bound) + 1
  return !_.isFinite(upper) || _.inRange(c, _.first(bound), upper)
}

class ComplexityLevel {
  constructor (cyclomatic) {
    this.cyclomatic = cyclomatic
  }

  simple (cyclomatic) {
    return isMatch(
      (cyclomatic || this.cyclomatic),
      CognitiveComplexity.SIMPLE
    )
  }

  complicated (cyclomatic) {
    return isMatch(
      (cyclomatic || this.cyclomatic),
      CognitiveComplexity.COMPLICATED
    )
  }

  convoluted (cyclomatic) {
    return isMatch(
      (cyclomatic || this.cyclomatic),
      CognitiveComplexity.CONVOLUTED
    )
  }

  incomprehensible (cyclomatic) {
    return isMatch(
      (cyclomatic || this.cyclomatic),
      CognitiveComplexity.INCOMPREHENSIBLE
    )
  }

  toString () {
    const bounds = _
      .chain(_.values(CognitiveComplexity))
      .remove(_.isArray)
      .find((bound) => isMatch(this.cyclomatic, bound))
      .value()
    return CognitiveComplexity[bounds]
  }

  valueOf () {
    return this.cyclomatic
  }
}

const complexityReport = {
  factory: (generator) => {
    return glob(generator.options.files)
      .then((matches) => {
        generator.log(JSON.stringify(matches, null, 2))
        const sources = matches.map((filepath) => {
          return {
            path: filepath,
            code: generator.fs.read(filepath)
          }
        })
        const report = escomplex.analyse(sources)
        return Promise.resolve({
          name: generator.options.name,
          report: report,
          projectName: generator.options.name,
          author: {
            name: generator.options.authorName,
            url: generator.options.authorUrl
          },
          license: '',
          complexity: report,
          isoDate: new Date().toLocaleDateString(),
          complexityJson: JSON.stringify(report, null, 2)
        })
      })
  },

  level: (cyclomatic) => {
    return new ComplexityLevel(cyclomatic)
  }
}

module.exports = {
  CognitiveComplexity,
  ComplexityLevel,
  report: complexityReport
}

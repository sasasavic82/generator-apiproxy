/* eslint node/no-unsupported-features: ["warn", {
  version: 4,
  ignores: [
    "asyncAwait"
  ]}] */
/* eslint-env es6 */

const _ = require('lodash')
const complexity = require('../../generators/docs/complexity')

describe('complexity module', () => {
  let CognitiveComplexity = complexity.CognitiveComplexity
  let ComplexityLevel = complexity.ComplexityLevel
  let report = complexity.report

  afterEach(() => jest.clearAllMocks())

  describe('CognitiveComplexity', () => {
    it('is an enum', () => {
      expect(CognitiveComplexity).toBeDefined()
    })

    it('declares the thresholds of human understanding', () => {
      expect(CognitiveComplexity.SIMPLE).toEqual([0, 10])
      expect(CognitiveComplexity.COMPLICATED).toEqual([11, 20])
      expect(CognitiveComplexity.CONVOLUTED).toEqual([21, 50])
      expect(CognitiveComplexity.INCOMPREHENSIBLE).toEqual([51, Infinity])
    })

    it('defines SIMPLE as cyclomatic complexity between 0 and 10', () => {
      expect(CognitiveComplexity[CognitiveComplexity.SIMPLE]).toBe('SIMPLE')
    })
    it('defines COMPLICATED as cyclomatic complexity between 11 and 20', () => {
      expect(CognitiveComplexity[CognitiveComplexity.COMPLICATED]).toBe('COMPLICATED')
    })
    it('defines CONVOLUTED as cyclomatic complexity between 21 and  50', () => {
      expect(CognitiveComplexity[CognitiveComplexity.CONVOLUTED]).toBe('CONVOLUTED')
    })
    it('defines INCOMPREHENSIBLE as cyclomatic complexity between 51 and Infinity', () => {
      expect(CognitiveComplexity[CognitiveComplexity.INCOMPREHENSIBLE]).toBe('INCOMPREHENSIBLE')
    })
  })

  describe('ComplexityLevel assesses whether a cyclomatic complexity value is perceived as', () => {
    // We can't test ComplexityLevel.INCOMPREHENSIBLE, since it's Infinite
    const complexityRange = {
      simple: _.range(0, 10),
      complicated: _.range(11, 20),
      convoluted: _.range(21, 50),
      incomprehensible: _.range(51, 150)
    }
    let complexityLevel = null
    let cyclomatic = 0

    afterEach(() => {
      complexityLevel = null
      cyclomatic = null
    })

    it('simple', () => {
      // Simple
      cyclomatic = 0
      complexityLevel = new ComplexityLevel(cyclomatic)
      expect(complexityLevel.valueOf()).toBe(0)
      expect(complexityLevel.valueOf()).toBe(cyclomatic)
      expect(complexityLevel.simple(cyclomatic)).toBe(true)
      expect(complexityLevel.toString()).toBe('SIMPLE')

      cyclomatic = 10
      expect(complexityLevel.simple(cyclomatic)).toBe(true)

      cyclomatic = 11
      expect(complexityLevel.simple(cyclomatic)).toBe(false)

      complexityRange.simple.forEach((cyclomaticComplexity) => {
        expect(complexityLevel.simple(cyclomaticComplexity)).toBe(true)
      })
    })

    it('complicated', () => {
      // Complicated
      cyclomatic = 11
      complexityLevel = new ComplexityLevel(cyclomatic)
      expect(complexityLevel.complicated()).toBe(true)
      expect(complexityLevel.valueOf()).toBe(cyclomatic)
      expect(complexityLevel.toString()).toBe('COMPLICATED')

      expect(complexityLevel.complicated(cyclomatic)).toBe(true)

      cyclomatic = 20
      expect(complexityLevel.complicated(cyclomatic)).toBe(true)

      cyclomatic = 21
      expect(complexityLevel.complicated(cyclomatic)).toBe(false)

      complexityRange.complicated.forEach((cyclomaticComplexity) => {
        expect(complexityLevel.complicated(cyclomaticComplexity)).toBe(true)
      })
    })

    it('convoluted', () => {
      // Convoluted
      cyclomatic = 21
      complexityLevel = new ComplexityLevel(cyclomatic)
      expect(complexityLevel.convoluted()).toBe(true)
      expect(complexityLevel.valueOf()).toBe(cyclomatic)
      expect(complexityLevel.toString()).toBe('CONVOLUTED')

      expect(complexityLevel.convoluted(cyclomatic)).toBe(true)

      cyclomatic = 50
      expect(complexityLevel.convoluted(cyclomatic)).toBe(true)

      cyclomatic = 51
      expect(complexityLevel.convoluted(cyclomatic)).toBe(false)

      complexityRange.convoluted.forEach((cyclomaticComplexity) => {
        expect(complexityLevel.convoluted(cyclomaticComplexity)).toBe(true)
      })
    })

    it('incomprehensible', () => {
      // Incomprehensible
      cyclomatic = 51
      complexityLevel = new ComplexityLevel(cyclomatic)
      expect(complexityLevel.incomprehensible()).toBe(true)
      expect(complexityLevel.incomprehensible(Infinity)).toBe(true)
      expect(complexityLevel.valueOf()).toBe(cyclomatic)
      expect(complexityLevel.toString()).toBe('INCOMPREHENSIBLE')

      expect(complexityLevel.incomprehensible(cyclomatic)).toBe(true)

      cyclomatic = 51 * 100000
      expect(complexityLevel.incomprehensible(cyclomatic)).toBe(true)

      cyclomatic = Infinity - 1
      expect(complexityLevel.incomprehensible(cyclomatic)).toBe(true)

      cyclomatic = Infinity
      expect(complexityLevel.incomprehensible(cyclomatic)).toBe(true)

      complexityRange.incomprehensible.forEach((cyclomaticComplexity) => {
        expect(complexityLevel.incomprehensible(cyclomaticComplexity)).toBe(true)
      })
    })
  })

  describe('report', () => {
    let cyclomatic = 0
    let level = null

    beforeEach(() => {
      jest.mock('../../generators/docs', () => {
        const helpers = require('yeoman-test')
        return helpers.createDummyGenerator()
      })

      jest.mock('glob-promise', () => {
        return jest.fn((pattern, options) => new Promise((resolve, reject) => {
          return options.reject
            ? reject(new Error('glob-promise-error'))
            : resolve([
              'lib/cordova-contacts.js',
              'lib/cordova-contact-type.js'
            ])
        }))
      })
    })

    it('creates ComplexityLevel objects', () => {
      level = report.level(cyclomatic)
      expect(level).toBeDefined()
      expect(level.simple()).toBe(true)
      expect(level.toString()).toBe('SIMPLE')
    })

    it('rejects with an Error Promise when exceptions arise', async () => {
      expect.assertions(1)
      const err = new Error('glob-promise-error')
      const glob = require('glob-promise')

      return glob('**/*.js', { reject: true }).catch((e) =>
        expect(e).toEqual(err)

      )
    })
  })
})

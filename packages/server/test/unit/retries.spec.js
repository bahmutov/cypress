require('../spec_helper.coffee')
const Reporter = require(`${root}lib/reporter`)
const _ = require('lodash')
const sinon = require('sinon')
const Debug = require('debug')
const debug = Debug('spec:retries')
// const snapshot = require('snap-shot-it')
const matchDeep = require('../matchDeep')

matchDeep.registerInMocha()

process.env.SNAPSHOT_UPDATE = 1
Debug.enable('spec:retries*')

const events = require('../../../driver/test/__snapshots__/runner.spec.js.snapshot')

describe('reporter retries', () => {
  let reporter

  const createReporter = (setRunnablesEvent, mochaEvents) => {

    reporter = Reporter()

    const setRunnables = parseSnapshot(setRunnablesEvent)
    const mocha = parseSnapshot(mochaEvents)

    const runnables = setRunnables[0][1]

    reporter.setRunnables(runnables)

    const stubs = {}

    stubs.reporterEmit = spyOn(reporter, 'emit', debug.extend('reporter:emit'))
    stubs.runnerEmit = spyOn(reporter.runner, 'emit', debug.extend('runner:emit'))

    _.each(mocha, (event) => {
      reporter.emit(...event.slice(1))
    })

    return stubs
  }

  it('can receive events', () => {

    const { runnerEmit } = createReporter(events.threeTestsWithHooks_set_runnables, events.threeTestsWithHooks_mocha)

    expect(runnerEmit.args).to.matchSnapshot(runnerEmitCleanseMap)

  })

  it.only('can receive retry events', () => {
    const { runnerEmit } = createReporter(events.threeTestsWithRetry_set_runnables, events.threeTestsWithRetry_mocha)

    const retriedRunnable = _.chain(runnerEmit.args)
    .filter({ 0: 'test' })
    .filter({ 1: { _currentRetry: 0 } })
    .value()

    expect(retriedRunnable).to.matchSnapshot({ parent: stringifyShort })
    // expect(runnerEmit.args).to.matchSnapshot(runnerEmitCleanseMap)
  })
})

const spyOn = (obj, prop, fn) => {
  const _fn = obj[prop]

  const stub = sinon.stub()
  .callsFake(function () {

    fn.apply(this, arguments)

    const ret = _fn.apply(this, arguments)

    return ret

  })

  obj[prop] = stub

  return stub
}

const stringifyShort = (obj) => {
  const constructorName = _.get(obj, 'constructor.name')

  if (constructorName && !_.includes(['Object'], constructorName)) {
    return `{${constructorName}}`
  }

  if (_.isArray(obj)) {
    return `[Array ${obj.length}]`
  }

  if (_.isObject(obj)) {
    return `{Object ${Object.keys(obj).length}}`
  }

  return obj
}

const parseMatcher = (matcher) => {
  const regex = /match\.(.*)/

  if (_.isString(matcher)) {
    const parsed = regex.exec(matcher)

    if (parsed) {

      return parsed[1]
    }
  }
}

const parseSnapshot = (s) => {
  s = _.cloneDeep(s)
  const recurse = (_obj) => {
    _.each(_obj, (value, key) => {
      const matcherType = parseMatcher(value)

      if (matcherType) {
        const replacement = getFake(matcherType)

        _obj[key] = replacement

        return
      }

      if (_.isObjectLike(value)) {
        return recurse(value)
      }

    })
  }

  recurse(s)

  return s
}

const getFake = (matcherType) => {
  if (matcherType === 'number') {
    return 1
  }

  if (matcherType === 'date') {
    return new Date(0)
  }

  if (matcherType === 'string') {
    return 'foobar'
  }
}

const runnerEmitCleanseMap = {
  '^.*.1': stringifyShort,
}

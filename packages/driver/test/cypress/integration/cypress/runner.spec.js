/* eslint prefer-rest-params: "off", no-console: "off", arrow-body-style: "off"*/

const { _ } = Cypress
const helpers = require('../../support/helpers')

const matchDeep = require('../../support/matchDeep')

const sinon = require('sinon')

matchDeep.registerInCypress()
/**
 * @type {sinon.SinonMatch}
 */
const match = Cypress.sinon.match

// const { defer } = helpers

const backupCy = window.cy
const backupCypress = window.Cypress

backupCy.__original__ = true

/**
   * @type {sinon.SinonStub}
   */
let allStubs
/**
   * @type {sinon.SinonStub}
   */
let mochaStubs
/**
   * @type {sinon.SinonStub}
   */
let setRunnablesStub

const stringifyShort = (obj) => {
  if (_.isArray(obj)) {
    return `[Array ${obj.length}]`
  }

  if (_.isObject(obj)) {
    return `{Object ${Object.keys(obj).length}}`
  }

  return obj
}

const simpleSingleTest = {
  suites: { 'suite 1': { tests: [{ name: 'test 1' }] } },
}

const threeTestsWithHooks = {
  suites: { 'suite 1': { hooks: ['before', 'beforeEach', 'afterEach', 'after'], tests: ['test 1', 'test 2', 'test 3'] } },
}

const threeTestsWithRetry = {
  suites: { 'suite 1': { hooks: ['before', 'beforeEach', 'afterEach', 'after'],
    tests: [
      {
        name: 'test 1',
        fn: () => {
          debugger
        },
      }, { name: 'test 2', fail: 2 }, 'test 3',
    ] } },
}

// const enableStubSnapshots = true
const enableStubSnapshots = false

const eventCleanseMap = {
  snapshots: stringifyShort,
  parent: stringifyShort,
  tests: stringifyShort,
  commands: stringifyShort,
  err: stringifyShort,
  body: '[body]',
  wallClockStartedAt: match.date,
  lifecycle: match.number,
  fnDuration: match.number,
  duration: match.number,
  afterFnDuration: match.number,
  wallClockDuration: match.number,
  stack: match.string,
  message: '[error message]',
  // consoleProps: stringifyShort

}

let autCypress

const createCypress = (mochaTests, opts = {}) => {

  _.defaults(opts, {
    state: {},
    config: {},
  })

  return cy.visit('/fixtures/isolated-runner.html#/tests/integration/cypress/runner.spec.js')
  .then({ timeout: 60000 }, (win) => {
    win.channel.destroy()

    allStubs = cy.stub().snapshot(enableStubSnapshots)
    mochaStubs = cy.stub().snapshot(enableStubSnapshots)
    setRunnablesStub = cy.stub().snapshot(enableStubSnapshots)

    return new Promise((resolve) => {
      const runCypress = () => {
        autCypress.run.restore()

        const emit = autCypress.emit
        const emitMap = autCypress.emitMap
        const emitThen = autCypress.emitThen

        cy.stub(autCypress, 'emit').snapshot(enableStubSnapshots).log(false)
        .callsFake(function () {

          const noLog = _.includes([
            'navigation:changed',
            'stability:changed',
            'window:load',
            'url:changed',
            'log:added',
            'page:loading',
            'window:unload',
            'newListener',
          ], arguments[0])
          const noCall = _.includes(['window:before:unload', 'before:screenshot', 'mocha'], arguments[0])
          const isMocha = _.includes(['mocha'], arguments[0])

          isMocha && mochaStubs.apply(this, arguments)

          noLog || allStubs.apply(this, ['emit'].concat([].slice.call(arguments)))

          // if (noCall) debugger

          return noCall || emit.apply(this, arguments)
        })

        cy.stub(autCypress, 'emitMap').snapshot(enableStubSnapshots).log(false)
        .callsFake(function () {
          allStubs.apply(this, ['emitMap'].concat([].slice.call(arguments)))

          return emitMap.apply(this, arguments)
        })

        cy.stub(autCypress, 'emitThen').snapshot(enableStubSnapshots).log(false)
        .callsFake(function () {
          const noCall = ['runnable:after:run:async'].includes(arguments[0])

          allStubs.apply(this, ['emitThen'].concat([].slice.call(arguments)))

          if (noCall) {
            return Promise.resolve()
          }

          return emitThen.apply(this, arguments)
        })

        spyOn(autCypress.mocha.getRunner(), 'fail', (...args) => {
          Cypress.log({
            name: 'Runner Fail',
            message: `${args[1]}`,
            state: 'failed',
            consoleProps: () => ({
              Error: args[1],
            }),
          })
        })

        cy.spy(cy.state('window').console, 'log').as('console_log')
        cy.spy(cy.state('window').console, 'error').as('console_error')

        autCypress.run(resolve)

      }

      cy.spy(win.reporterBus, 'emit').snapshot(enableStubSnapshots)
      cy.spy(win.localBus, 'emit').snapshot(enableStubSnapshots)

      cy.stub(win.channel, 'emit').snapshot(enableStubSnapshots)
      .withArgs('watch:test:file')
      .callsFake(() => {
        autCypress = win.Cypress

        cy.stub(autCypress, 'onSpecWindow').snapshot(enableStubSnapshots).callsFake((specWindow) => {
          autCypress.onSpecWindow.restore()

          autCypress.onSpecWindow(specWindow)

          helpers.generateMochaTestsForWin(specWindow, mochaTests)

          specWindow.before = () => {}
          specWindow.beforeEach = () => {}
          specWindow.afterEach = () => {}
          specWindow.after = () => {}
          specWindow.describe = () => {}
        })

        cy.stub(autCypress, 'run').snapshot(enableStubSnapshots).callsFake(runCypress)
      })
      .withArgs('is:automation:client:connected')
      .yieldsAsync(true)

      .withArgs('get:existing:run:state')
      .callsFake((evt, cb) => {
        cb(opts.state)
      })

      .withArgs('backend:request', 'resolve:url')
      .yieldsAsync({ response: {
        isOkStatusCode: true,
        isHtml: true,
        url: 'http://localhost:3500/fixtures/generic.html',
      } })

      .withArgs('set:runnables')
      .callsFake((...args) => {
        setRunnablesStub(...args)
        _.last(args)()
      })

      // .withArgs('preserve:run:state')
      // .callsFake()

      .withArgs('automation:request')
      .yieldsAsync({ response: {} })

      const c = _.extend({}, Cypress.config(), opts.config)

      c.state = {}
      // c.state = opts.state

      cy.stub(win.channel, 'on').snapshot(enableStubSnapshots)

      win.Runner.start(win.document.getElementById('app'), c)
    })
  })
}

describe('src/cypress/runner', () => {

  describe('isolated test runner', () => {

    beforeEach(async () => {
      window.cy = backupCy
      window.Cypress = backupCypress

      // await new Cypress.Promise((res) => {
      // cy.wait(1000)
      // cy.visit('http://localhost:3939').then(res)
      // })
    })

    describe('test events', function () {
      it('empty', () => {
        createCypress({
          suites: { 'suite 1': { tests: [{ name: 'test 1' }] } },
        })

      })

      it('simple 1', () => {
        createCypress(simpleSingleTest)
        // .call('run')
        .then(shouldHaveTestResults(1, 0))
        .then(() => {

          cy.contains('header .passed', '1')

        })
        .then(() => {

          // expect(formatEvents(allStubs)).to.matchDeep(eventCleanseMap)
          expect(formatEvents(allStubs)).to.matchSnapshot(eventCleanseMap)
        })
      })

      it('simple 3 tests', function () {
        createCypress({
          suites: {
            'suite 1': { tests: ['test 1', 'test 2', 'test 3'] },
          },
        })
        .then(shouldHaveTestResults(3, 0))
        .then(() => {
          expect(formatEvents(allStubs)).to.matchSnapshot(eventCleanseMap)
        })
      })

      it('simple fail', function () {
        createCypress({
          suites: {
            'suite 1': {
              tests: [
                {
                  name: 'test 1',
                  fail: true,
                },
              ],
            },
          },
        })
        .then(shouldHaveTestResults(0, 1))
        .then(() => {
          cy.contains('header .failed', '1')
        })
        .then(() => {
          expect(formatEvents(allStubs)).to.matchSnapshot(eventCleanseMap)
        })
      })

      it('pass fail pass fail', () => {
        createCypress({
          suites: {
            'suite 1': {
              tests: [
                'test 1',
                {
                  name: 'test 2',
                  fail: true,
                },
              ],
            },
            'suite 2': {
              tests: [
                'test 1',
                {
                  name: 'test 2',
                  fail: true,
                },
              ],
            },
          },
        })
        .then(shouldHaveTestResults(2, 2))
        .then(() => {

          expect(formatEvents(allStubs)).to.matchSnapshot(eventCleanseMap)
        })
      })

      it('fail pass', function () {
        createCypress({
          suites: {
            'suite 1': {
              tests: [
                {
                  name: 'test 1',
                  fail: true,
                },
                { name: 'test 2' },
              ],
            },
          },
        })
        .then(shouldHaveTestResults(1, 1))
        .then(() => {
          expect(formatEvents(allStubs)).to.matchSnapshot(eventCleanseMap)
        })
      })

      it('no tests', function () {
        createCypress({})
        .then(shouldHaveTestResults(0, 0))
        .then(() => {
          expect(formatEvents(allStubs)).to.matchSnapshot()
        })
        cy.contains('No tests found in your file').should('be.visible')
        cy.get('.error-message p').invoke('text').should('eq', 'We could not detect any tests in the above file. Write some tests and re-run.')
      })

      it('simple fail, catch cy.on(fail)', () => {
        createCypress({
          suites: {
            'suite 1': {
              tests: [
                {
                  name: 'test 1',
                  fn: () => {
                    console.log('test ran')
                    cy.on('fail', () => {
                      console.log('on:fail')

                      return false
                    })
                    console.log('added handler')
                    expect(false).ok
                    throw new Error('error in test')
                  },
                  eval: true,
                },
              ],
            },
          },
        })
        .then(shouldHaveTestResults(1, 0))
        .then(() => {
          expect(formatEvents(allStubs)).to.matchSnapshot(eventCleanseMap)
        })
      })

      describe('hook failures', () => {
        it('fail in [before]', () => {
          createCypress({
            suites: {
              'suite 1': {
                hooks: [
                  {
                    type: 'before',
                    fail: true,
                  },
                ],
                tests: [{ name: 'test 1' }],
              },
            },
          })
          .then(shouldHaveTestResults(0, 1))
          .then(() => {
            expect(formatEvents(allStubs)).to.matchSnapshot(eventCleanseMap)
          })
        })

        it('fail in [beforeEach]', () => {
          createCypress({
            suites: {
              'suite 1': {
                hooks: [
                  {
                    type: 'beforeEach',
                    fail: true,
                  },
                ],
                tests: [{ name: 'test 1' }],
              },
            },
          })
          .then(shouldHaveTestResults(0, 1))
          .then(() => {
            expect(formatEvents(allStubs)).to.matchSnapshot(eventCleanseMap)
          })
        })

        it('fail in [afterEach]', () => {
          createCypress({
            suites: {
              'suite 1': {
                hooks: [
                  {
                    type: 'afterEach',
                    fail: true,
                  },
                ],
                tests: [{ name: 'test 1' }],
              },
            },
          })
          .then(shouldHaveTestResults(0, 1))
          .then(() => {
            expect(formatEvents(allStubs)).to.matchSnapshot(eventCleanseMap)
          })
        })

        it('fail in [after]', () => {
          createCypress({
            suites: {
              'suite 1': {
                hooks: [
                  {
                    type: 'after',
                    fail: true,
                  },
                ],
                tests: ['test 1', 'test 2'],
              },
            },
          })
          .then(shouldHaveTestResults(1, 1))
          .then(() => {
            expect(formatEvents(allStubs)).to.matchSnapshot(eventCleanseMap)
          })
        })
      })

      describe('test failures w/ hooks', () => {
        it('fail with [before]', () => {
          createCypress({
            suites: {
              'suite 1': {
                hooks: ['before'],
                tests: [
                  {
                    name: 'test 1',
                    fail: true,
                  },
                  { name: 'test 2' },
                ],
              },
            },
          })
          .then(shouldHaveTestResults(1, 1))
          .then(() => {
            expect(formatEvents(allStubs)).to.matchSnapshot(eventCleanseMap)
          })
        })

        it('fail with [after]', () => {
          createCypress({
            suites: {
              'suite 1': {
                hooks: [{ type: 'after' }],
                tests: [{ name: 'test 1', fail: true }, 'test 2'],
              },
            },
          })
          .then(shouldHaveTestResults(1, 1))
          .then(() => {
            expect(formatEvents(allStubs)).to.matchSnapshot(eventCleanseMap)
          })
        })

        it('fail with all hooks', () => {
          createCypress({
            suites: {
              'suite 1': {
                hooks: ['before', 'beforeEach', 'afterEach', 'after'],
                tests: [{ name: 'test 1', fail: true }],
              },
            },
          })
          .then(shouldHaveTestResults(0, 1))
          .then(() => {
            expect(formatEvents(allStubs)).to.matchSnapshot(eventCleanseMap)
          })
        })
      })

      describe('mocha grep', () => {
        it('fail with [only]', () => {
          createCypress({
            suites: {
              'suite 1': {
                hooks: ['before', 'beforeEach', 'afterEach', 'after'],
                tests: [
                  { name: 'test 1', fail: true },
                  { name: 'test 2', fail: true, only: true },
                  { name: 'test 3', fail: true },
                ],
              },
            },
          })
          .then(shouldHaveTestResults(0, 1))
          .then(() => {
            expect(formatEvents(allStubs)).to.matchSnapshot(eventCleanseMap)
          })
        })
        it('pass with [only]', () => {
          createCypress({
            suites: {
              'suite 1': {
                hooks: ['before', 'beforeEach', 'afterEach', 'after'],
                tests: [
                  { name: 'test 1' },
                  { name: 'test 2', only: true },
                  { name: 'test 3' },
                ],
              },
            },
          })
          .then(shouldHaveTestResults(1, 0))
          .then(() => {
            expect(formatEvents(allStubs)).to.matchSnapshot(eventCleanseMap)
          })
        })
      })

      describe('retries', () => {

        it('can set retry config', () => {
          createCypress({}, { config: { retries: 1 } })
          .then(() => {
            expect(autCypress.config()).to.has.property('retries', 1)
          })
        })

        describe('retry ui', () => {
          beforeEach(() => {
            createCypress({
              suites: {
                'suite 1': {
                  tests: [
                    { name: 'test 1', fail: 1 },
                    { name: 'test 2', fail: 2 },
                    { name: 'test 3', fail: 1 },
                  ],
                  // tests: [{ name: 'test 1', fail: true }, 'test 2'],
                },
              },
            }, { config: { retries: 1 } })
            .then(shouldHaveTestResults(2, 1))
          })

          it('empty', () => {})

          it('can toggle failed attempt', () => {
            cy.contains('.runnable-wrapper', 'test 3').click().within(() => {
              cy.contains('AssertionError').should('not.be.visible')
              cy.contains('Attempt 1').click()
              cy.contains('AssertionError').should('be.visible')
              cy.contains('Attempt 1').click()
              cy.contains('AssertionError').should('not.be.visible')
            })
          })

          it('can view error for failed attempt', () => {
            cy.contains('Attempt 1')
            .click()
            .closest('.attempt-item')
            .contains('AssertionError')
            .click()
            cy.get('@console_log').should('be.calledWithMatch', 'Command')

          })
        })

        it('test retry with hooks', () => {
          createCypress({
            suites: {
              'suite 1': {
                hooks: ['before', 'beforeEach', 'afterEach', 'after'],
                tests: [
                  { name: 'test 1', fail: 1 },
                  // { name: 'test 1', fail: false },
                  // { name: 'test 1', fail: true }, 'test 1',
                  // 'test 1', 'test 2',
                ],
              },
            },
          }, { config: { retries: 1 } })
          .then(shouldHaveTestResults(1, 0))
          .then(() => {

            expect(formatEvents(allStubs)).matchSnapshot(eventCleanseMap)

            cy.contains('test')
            cy.contains('after all')
          })

        })

        it('test retry with [only]', () => {
          createCypress({
            suites: {
              'suite 1': {
                hooks: ['before', 'beforeEach', 'afterEach', 'after'],
                tests: [
                  { name: 'test 1' },
                  { name: 'test 2', fail: 1, only: true },
                  { name: 'test 3' },
                  // { name: 'test 1', fail: true }, 'test 1',
                  // 'test 1', 'test 2',
                ],
              },
            },
          }, { config: { retries: 1 } })
          .then(shouldHaveTestResults(1, 0))
          .then(() => {

            expect(formatEvents(allStubs)).matchSnapshot(eventCleanseMap)
          })
        })

        it('test retry with many hooks', () => {

          createCypress({
            suites: {
              'suite 1': {
                hooks: [
                  'before',
                  'beforeEach',
                  'afterEach',
                  'after',
                ],
                tests: [
                  { name: 'test 1' }, //fn: test1.stub },
                  { name: 'test 2', fail: 1 },
                  { name: 'test 3' },
                // 'test 1', 'test 2',
                ],
              },
            },
          }, { config: { retries: 1 } })
          .then(shouldHaveTestResults(3, 0))
          .then(() => {

          // expect(formatEvents(allStubs).map(([str, { id, title } = {}]) => `${str} - ${id}|${title}`)).to.matchSnapshot([])
            expect(formatEvents(allStubs)).to.matchSnapshot(eventCleanseMap)
          })

        })

        it('retries from [beforeEach]', () => {
          createCypress({
            suites: {
              'suite 1': {
                hooks: [
                  'before',
                  'beforeEach',
                  { type: 'beforeEach', fail: 1 },
                  'beforeEach',
                  'afterEach',
                  'after',
                ],
                tests: [{ name: 'test 1' }],
              },
            },
          }, { config: { retries: 1 } })
          .then(shouldHaveTestResults(1, 0))
          .then(() => {
            cy.contains('Attempt 1').click()
            cy.contains('AssertionError').click()
            cy.get('@console_log').its('lastCall.args').should('contain', 'AssertionError: beforeEach')
          })
          .then(() => {

            expect(formatEvents(allStubs)).to.matchSnapshot(eventCleanseMap)
          })

        })

      })

    })
    describe('save/reload state', () => {

      describe('serialize / load from state', () => {
        const serializeState = () => {
          return getRunState(autCypress)
        }

        describe('hooks', () => {
          let s
          let realState
          const stub1 = sinon.stub()
          const stub2 = sinon.stub()
          const stub3 = sinon.stub().callsFake(() => realState = serializeState())
          let cypressConfig = [
            {
              suites: {
                'suite 1': {
                  hooks: [
                    'before',
                    'beforeEach',
                    'afterEach',
                    'after',
                  ],
                  tests: [{ name: 'test 1', fn: stub1 }],
                },
                'suite 2': {
                  tests: [
                    { name: 'test 1', fn: stub2 },
                    { name: 'test 2', fn: stub3 },
                    'test 3',
                  ],
                },
              },
            }, { config: { retries: 1 } },
          ]

          beforeEach(() => {
            s = {
              currentId: 'r6',
              tests: {
                r3: {
                  id: 'r3',
                  title: 'test 1',
                  state: 'passed',
                  body: 'stub',
                  type: 'test',
                  duration: 1,
                  wallClockStartedAt: '1970-01-01T00:00:00.000Z',
                  wallClockDuration: 1,
                  timings: {
                    lifecycle: 1,
                    'before all': [
                      {
                        hookId: 'h1',
                        fnDuration: 1,
                        afterFnDuration: 1,
                      },
                    ],
                    'before each': [
                      {
                        hookId: 'h2',
                        fnDuration: 1,
                        afterFnDuration: 1,
                      },
                    ],
                    test: {
                      fnDuration: 1,
                      afterFnDuration: 1,
                    },
                    'after each': [
                      {
                        hookId: 'h3',
                        fnDuration: 1,
                        afterFnDuration: 1,
                      },
                    ],
                    'after all': [
                      {
                        hookId: 'h4',
                        fnDuration: 1,
                        afterFnDuration: 1,
                      },
                    ],
                  },
                  _currentRetry: 0,
                  _retries: 1,
                  commands: [
                    {
                      actual: null,
                      expected: undefined,
                      end: true,
                      snapshot: true,
                      name: 'assert',
                      message: 'before',
                      passed: true,
                      selector: undefined,
                      type: 'parent',
                      event: false,
                      id: 1,
                      state: 'passed',
                      instrument: 'command',
                      url: '',
                      hookName: 'before all',
                      testId: 'r3',
                      testCurrentRetry: 0,
                      viewportWidth: 1000,
                      viewportHeight: 660,
                      referencesAlias: undefined,
                      alias: undefined,
                      aliasType: undefined,
                      snapshots: null,
                      ended: true,
                      err: null,
                      consoleProps: {
                        Command: 'assert',
                        actual: null,
                        expected: undefined,
                        Message: 'before',
                      },
                      renderProps: {},
                    },
                    {
                      actual: null,
                      expected: undefined,
                      end: true,
                      snapshot: true,
                      name: 'assert',
                      message: 'beforeEach',
                      passed: true,
                      selector: undefined,
                      type: 'parent',
                      event: false,
                      id: 2,
                      state: 'passed',
                      instrument: 'command',
                      url: '',
                      hookName: 'before each',
                      testId: 'r3',
                      testCurrentRetry: 0,
                      viewportWidth: 1000,
                      viewportHeight: 660,
                      referencesAlias: undefined,
                      alias: undefined,
                      aliasType: undefined,
                      snapshots: null,
                      ended: true,
                      err: null,
                      consoleProps: {
                        Command: 'assert',
                        actual: null,
                        expected: undefined,
                        Message: 'beforeEach',
                      },
                      renderProps: {},
                    },
                    {
                      actual: null,
                      expected: undefined,
                      end: true,
                      snapshot: true,
                      name: 'assert',
                      message: 'afterEach',
                      passed: true,
                      selector: undefined,
                      type: 'parent',
                      event: false,
                      id: 3,
                      state: 'passed',
                      instrument: 'command',
                      url: '',
                      hookName: 'after each',
                      testId: 'r3',
                      testCurrentRetry: 0,
                      viewportWidth: 1000,
                      viewportHeight: 660,
                      referencesAlias: undefined,
                      alias: undefined,
                      aliasType: undefined,
                      snapshots: null,
                      ended: true,
                      err: null,
                      consoleProps: {
                        Command: 'assert',
                        actual: null,
                        expected: undefined,
                        Message: 'afterEach',
                      },
                      renderProps: {},
                    },
                    {
                      actual: null,
                      expected: undefined,
                      end: true,
                      snapshot: true,
                      name: 'assert',
                      message: 'after',
                      passed: true,
                      selector: undefined,
                      type: 'parent',
                      event: false,
                      id: 4,
                      state: 'passed',
                      instrument: 'command',
                      url: '',
                      hookName: 'after all',
                      testId: 'r3',
                      testCurrentRetry: 0,
                      viewportWidth: 1000,
                      viewportHeight: 660,
                      referencesAlias: undefined,
                      alias: undefined,
                      aliasType: undefined,
                      snapshots: null,
                      ended: true,
                      err: null,
                      consoleProps: {
                        Command: 'assert',
                        actual: null,
                        expected: undefined,
                        Message: 'after',
                      },
                      renderProps: {},
                    },
                  ],
                  prevAttempts: [],
                },
                r5: {
                  id: 'r5',
                  title: 'test 1',
                  state: 'passed',
                  body: 'stub',
                  type: 'test',
                  duration: 1,
                  wallClockStartedAt: '1970-01-01T00:00:00.000Z',
                  wallClockDuration: 1,
                  timings: {
                    lifecycle: 1,
                    test: {
                      fnDuration: 1,
                      afterFnDuration: 1,
                    },
                  },
                  _currentRetry: 0,
                  _retries: 1,
                  prevAttempts: [],
                },
              },
              startTime: '1970-01-01T00:00:00.000Z',
              emissions: {
                started: {
                  r1: true,
                  r2: true,
                  r3: true,
                  r4: true,
                  r5: true,
                  r6: true,
                },
                ended: {
                  r3: true,
                  r2: true,
                  r5: true,
                },
              },
              passed: 2,
              failed: 0,
              pending: 0,
              numLogs: 4,
            }
          })

          it('serialize state', () => {
            createCypress(...cypressConfig)
            .then(shouldHaveTestResults(4, 0))
            .then(() => expect(realState).matchDeep(cleanseRunStateMap, s))
          })
          it('load state', () => {
            cypressConfig[1].state = s
            createCypress(...cypressConfig)
            .then(shouldHaveTestResults(4, 0))
            .then(() => {
              expect(stub1).to.calledOnce
              expect(stub2).to.calledOnce
              expect(stub3).to.calledTwice
            })
          })
        })

        describe('retries', () => {
          let s
          let realState

          let runCount = 0
          const failThenSerialize = () => {
            if (!runCount++) {
              assert(false, 'stub 3 fail')
            }

            assert(true, 'stub 3 pass')

            return realState = serializeState()
          }

          let runCount2 = 0
          const failOnce = () => {
            if (!runCount2++) {
              assert(false, 'stub 2 fail')
            }

            assert(true, 'stub 2 pass')
          }

          const stub1 = sinon.stub()
          const stub2 = sinon.stub().callsFake(failOnce)
          const stub3 = sinon.stub().callsFake(failThenSerialize)

          let cypressConfig = [
            {
              suites: {
                'suite 1': {
                  hooks: [
                    'before',
                    'beforeEach',
                    'afterEach',
                    'after',
                  ],
                  tests: [{ name: 'test 1', fn: stub1 }],
                },
                'suite 2': {
                  tests: [
                    { name: 'test 1', fn: stub2 },
                    { name: 'test 2', fn: stub3 },
                    'test 3',
                  ],
                },
              },
            }, { config: { retries: 1 } },
          ]

          beforeEach(() => {
            s = {
              currentId: 'r6',
              tests: {
                r3: {
                  id: 'r3',
                  title: 'test 1',
                  state: 'passed',
                  body: 'stub',
                  type: 'test',
                  duration: 1,
                  wallClockStartedAt: '1970-01-01T00:00:00.000Z',
                  wallClockDuration: 1,
                  timings: {
                    lifecycle: 1,
                    'before all': [
                      {
                        hookId: 'h1',
                        fnDuration: 1,
                        afterFnDuration: 1,
                      },
                    ],
                    'before each': [
                      {
                        hookId: 'h2',
                        fnDuration: 1,
                        afterFnDuration: 1,
                      },
                    ],
                    test: {
                      fnDuration: 1,
                      afterFnDuration: 1,
                    },
                    'after each': [
                      {
                        hookId: 'h3',
                        fnDuration: 1,
                        afterFnDuration: 1,
                      },
                    ],
                    'after all': [
                      {
                        hookId: 'h4',
                        fnDuration: 1,
                        afterFnDuration: 1,
                      },
                    ],
                  },
                  _currentRetry: 0,
                  _retries: 1,
                  commands: [
                    {
                      actual: null,
                      expected: undefined,
                      end: true,
                      snapshot: true,
                      name: 'assert',
                      message: 'before',
                      passed: true,
                      selector: undefined,
                      type: 'parent',
                      event: false,
                      id: 1,
                      state: 'passed',
                      instrument: 'command',
                      url: '',
                      hookName: 'before all',
                      testId: 'r3',
                      testCurrentRetry: 0,
                      viewportWidth: 1000,
                      viewportHeight: 660,
                      referencesAlias: undefined,
                      alias: undefined,
                      aliasType: undefined,
                      snapshots: null,
                      ended: true,
                      err: null,
                      consoleProps: {
                        Command: 'assert',
                        actual: null,
                        expected: undefined,
                        Message: 'before',
                      },
                      renderProps: {},
                    },
                    {
                      actual: null,
                      expected: undefined,
                      end: true,
                      snapshot: true,
                      name: 'assert',
                      message: 'beforeEach',
                      passed: true,
                      selector: undefined,
                      type: 'parent',
                      event: false,
                      id: 2,
                      state: 'passed',
                      instrument: 'command',
                      url: '',
                      hookName: 'before each',
                      testId: 'r3',
                      testCurrentRetry: 0,
                      viewportWidth: 1000,
                      viewportHeight: 660,
                      referencesAlias: undefined,
                      alias: undefined,
                      aliasType: undefined,
                      snapshots: null,
                      ended: true,
                      err: null,
                      consoleProps: {
                        Command: 'assert',
                        actual: null,
                        expected: undefined,
                        Message: 'beforeEach',
                      },
                      renderProps: {},
                    },
                    {
                      actual: null,
                      expected: undefined,
                      end: true,
                      snapshot: true,
                      name: 'assert',
                      message: 'afterEach',
                      passed: true,
                      selector: undefined,
                      type: 'parent',
                      event: false,
                      id: 3,
                      state: 'passed',
                      instrument: 'command',
                      url: '',
                      hookName: 'after each',
                      testId: 'r3',
                      testCurrentRetry: 0,
                      viewportWidth: 1000,
                      viewportHeight: 660,
                      referencesAlias: undefined,
                      alias: undefined,
                      aliasType: undefined,
                      snapshots: null,
                      ended: true,
                      err: null,
                      consoleProps: {
                        Command: 'assert',
                        actual: null,
                        expected: undefined,
                        Message: 'afterEach',
                      },
                      renderProps: {},
                    },
                    {
                      actual: null,
                      expected: undefined,
                      end: true,
                      snapshot: true,
                      name: 'assert',
                      message: 'after',
                      passed: true,
                      selector: undefined,
                      type: 'parent',
                      event: false,
                      id: 4,
                      state: 'passed',
                      instrument: 'command',
                      url: '',
                      hookName: 'after all',
                      testId: 'r3',
                      testCurrentRetry: 0,
                      viewportWidth: 1000,
                      viewportHeight: 660,
                      referencesAlias: undefined,
                      alias: undefined,
                      aliasType: undefined,
                      snapshots: null,
                      ended: true,
                      err: null,
                      consoleProps: {
                        Command: 'assert',
                        actual: null,
                        expected: undefined,
                        Message: 'after',
                      },
                      renderProps: {},
                    },
                  ],
                  prevAttempts: [],
                },
                r5: {
                  id: 'r5',
                  title: 'test 1',
                  state: 'passed',
                  body: 'stub',
                  type: 'test',
                  duration: 1,
                  wallClockStartedAt: '1970-01-01T00:00:00.000Z',
                  wallClockDuration: 1,
                  timings: {
                    lifecycle: 1,
                    test: {
                      fnDuration: 1,
                      afterFnDuration: 1,
                    },
                  },
                  _currentRetry: 1,
                  _retries: 1,
                  prevAttempts: [
                    {
                      id: 'r5',
                      title: 'test 1',
                      err: {
                        message: 'stub 2 fail',
                        name: 'AssertionError',
                        stack: '[err stack]',
                        actual: null,
                        expected: undefined,
                        showDiff: false,
                      },
                      state: 'failed',
                      body: 'stub',
                      type: 'test',
                      duration: 1,
                      wallClockStartedAt: '1970-01-01T00:00:00.000Z',
                      wallClockDuration: 1,
                      timings: {
                        lifecycle: 1,
                        test: {
                          fnDuration: 1,
                          afterFnDuration: 1,
                        },
                      },
                      _currentRetry: 0,
                      _retries: 1,
                    },
                  ],
                },
              },
              startTime: '1970-01-01T00:00:00.000Z',
              emissions: {
                started: {
                  r1: true,
                  r2: true,
                  r3: true,
                  r4: true,
                  r5: true,
                  r6: true,
                },
                ended: {
                  r3: true,
                  r2: true,
                  r5: true,
                },
              },
              passed: 2,
              failed: 0,
              pending: 0,
              numLogs: 4,
            }

          })

          it('serialize state', () => {
            createCypress(...cypressConfig)
            .then(shouldHaveTestResults(4, 0))
            .then(() => expect(realState).matchDeep(cleanseRunStateMap, s))
          })
          it('load state', () => {
            cypressConfig[1].state = s
            createCypress(...cypressConfig)
            .then(shouldHaveTestResults(4, 0))
            .then(() => {
              expect(stub1).to.calledOnce
              expect(stub2).to.calledTwice
              expect(stub3).calledThrice
            })
          })
        })
      })
    })

    describe('other specs', () => {
      it('simple failing hook spec', () => {
        const mochaTests = {
          suites: {
            'simple failing hook spec': {
              suites: {
                'beforeEach hooks': {
                  hooks: [{ type: 'beforeEach', fail: true }],
                  tests: ['never gets here'],
                },
                'pending': {
                  tests: [{ name: 'is pending', pending: true }],
                },
                'afterEach hooks': {
                  hooks: [{ type: 'afterEach', fail: true }],
                  tests: ['fails this', 'does not run this'],
                },
                'after hooks': {
                  hooks: [{ type: 'after', fail: true }]
                  , tests: ['runs this', 'fails on this'],
                },
              },
            },

          },
        }

        createCypress(mochaTests)
        .then(shouldHaveTestResults(1, 3))
        .then(() => {
          cy.contains('.test', 'never gets here').should('have.class', 'runnable-failed')
          cy.contains('.command', 'beforeEach').should('have.class', 'command-state-failed')
          cy.contains('.attempt-error', 'AssertionError: beforeEach').scrollIntoView().should('be.visible')

          cy.contains('.test', 'is pending').should('have.class', 'runnable-pending')

          cy.contains('.test', 'fails this').should('have.class', 'runnable-failed')
          cy.contains('.command', 'afterEach').should('have.class', 'command-state-failed')
          cy.contains('.attempt-error', 'AssertionError: afterEach').should('be.visible')

          cy.contains('.test', 'does not run this').should('have.class', 'runnable-processing')

          cy.contains('.test', 'runs this').should('have.class', 'runnable-passed')

          cy.contains('.test', 'fails on this').should('have.class', 'runnable-failed')
          cy.contains('.command', 'after').should('have.class', 'command-state-failed')
          cy.contains('.attempt-error', 'AssertionError: after').should('be.visible')
        })
      })
    })
    describe('mocha events', () => {
      const mochaEventCleanseMap = {
        ...eventCleanseMap,
        start: match.date,
        end: match.date,
      }

      it('simple single test', () => {

        createCypress(simpleSingleTest, { config: {
          isTextTerminal: true,
        } })
        .then(() => {
          expect(mochaStubs.args).to.matchSnapshot(mochaEventCleanseMap, 'simpleSingleTest')
        })
      })
      it('simple three tests', () => {
        createCypress(threeTestsWithHooks, { config: {
          isTextTerminal: true,
        } })
        .then(() => {
          expect(setRunnablesStub.args).to.matchSnapshot({ ...eventCleanseMap, tests: _.identity }, 'threeTestsWithHooks_set_runnables')
          expect(mochaStubs.args).to.matchSnapshot(mochaEventCleanseMap, 'threeTestsWithHooks_mocha')
        })
      })
      it.only('three tests with retry', () => {
        createCypress(threeTestsWithRetry, { config: {
          isTextTerminal: true,
          retries: 2,
        } })
        .then(() => {
          expect(setRunnablesStub.args).to.matchSnapshot({ ...eventCleanseMap, tests: _.identity }, 'threeTestsWithRetry_set_runnables')
          expect(mochaStubs.args).to.matchSnapshot(mochaEventCleanseMap, 'threeTestsWithRetry_mocha')
        })
      })
    })
  })
})

const getRunState = (Cypress) => {

  // cypress normally accesses `id` via a closure
  const currentRunnable = Cypress.cy.state('runnable')
  // const currentTest = currentRunnable && getTestFromRunnable(currentRunnable)
  // const currentId = currentTest && currentTest.id

  const currentId = currentRunnable && currentRunnable.id

  const s = {
    currentId,
    tests: Cypress.getTestsState(),
    startTime: Cypress.getStartTime(),
    emissions: Cypress.getEmissions(),
  }

  s.passed = Cypress.countByTestState(s.tests, 'passed')
  s.failed = Cypress.countByTestState(s.tests, 'failed')
  s.pending = Cypress.countByTestState(s.tests, 'pending')
  s.numLogs = Cypress.Log.countLogsByTests(s.tests)

  return _.cloneDeep(s)
}

const cleanseRunStateMap = {
  wallClockStartedAt: new Date(0),
  wallClockDuration: 1,
  fnDuration: 1,
  afterFnDuration: 1,
  lifecycle: 1,
  // 'body': '[test body]',
  duration: 1,
  // timings: stringifyShort,
  // commands: stringifyShort,
  startTime: new Date(0),
  'err.stack': '[err stack]',
  // snapshots: JSON.stringify,
}

const formatEvents = (stub) => {
  return _.flatMap(stub.args, (args) => {
    args = args.slice(1)
    if (['mocha', 'automation:request', 'log:changed'].includes(args[0])) {
      return []
    }

    // if (_.isObject(args[1])) {
    //   args[1] = _.omit(_.toPlainObject(args[1]), [
    //     'body',
    //     'timings',
    //     'type',
    //     'wallClockStartedAt',
    //     'duration',
    //     'wallClockDuration',
    //   ])
    //   args[1] = cleanse(args[1], ['err'])
    // }

    let ret = [args[0]]

    if (args[1] != null) {
      ret = ret.concat([args[1]])
    }

    return [ret]
  })
}

const shouldHaveTestResults = (passed, failed) => (exitCode) => {
  expect(exitCode, 'resolve with failure count').eq(exitCode)
  passed = passed || '--'
  failed = failed || '--'
  cy.get('header .passed').should('have.text', `${passed}`)
  cy.get('header .failed').should('have.text', `${failed}`)
}

const spyOn = (obj, prop, fn) => {
  const _fn = obj[prop]

  obj[prop] = function () {

    fn.apply(this, arguments)

    const ret = _fn.apply(this, arguments)

    return ret

  }
}

/* eslint prefer-rest-params: "off", no-console: "off", arrow-body-style: "off"*/

const { $, _ } = Cypress
const helpers = require('../../support/helpers')

const sinon = require('sinon')

/**
 * @type {sinon.SinonMatch}
 */
const match = Cypress.sinon.match
const { stringify } = require('../../support/matchDeep')

// const { defer } = helpers

const backupCy = window.cy
const backupCypress = window.Cypress

backupCy.__original__ = true

/**
   * @type {sinon.SinonStub}
   */
let allStubs

window.lastActual = 'none'

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

    return new Promise((resolve) => {
      const runCypress = () => {
        autCypress.run.restore()

        allStubs = cy.stub().snapshot(false)

        const emit = autCypress.emit
        const emitMap = autCypress.emitMap
        const emitThen = autCypress.emitThen

        cy.stub(autCypress, 'emit').snapshot(false).log(false)
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
          const noCall = _.includes(['window:before:unload'], arguments[0])

          noLog || allStubs.apply(this, ['emit'].concat([].slice.call(arguments)))

          return noCall || emit.apply(this, arguments)
        })

        cy.stub(autCypress, 'emitMap').snapshot(false).log(false)
        .callsFake(function () {
          allStubs.apply(this, ['emitMap'].concat([].slice.call(arguments)))

          return emitMap.apply(this, arguments)
        })

        cy.stub(autCypress, 'emitThen').snapshot(false).log(false)
        .callsFake(function () {
          allStubs.apply(this, ['emitThen'].concat([].slice.call(arguments)))

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

      cy.spy(win.reporterBus, 'emit')
      cy.spy(win.localBus, 'emit')

      cy.stub(win.channel, 'emit').snapshot(false)
      .withArgs('watch:test:file')
      .callsFake(() => {
        autCypress = win.Cypress

        cy.stub(autCypress, 'onSpecWindow').snapshot(false).callsFake((specWindow) => {
          autCypress.onSpecWindow.restore()

          autCypress.onSpecWindow(specWindow)

          helpers.generateMochaTestsForWin(specWindow, mochaTests)

          specWindow.beforeEach = () => {}
          specWindow.describe = () => {}
        })

        cy.stub(autCypress, 'run').snapshot(false).callsFake(runCypress)
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

      // .withArgs('preserve:run:state')
      // .callsFake()

      .withArgs('automation:request')
      .yieldsAsync({ response: {} })

      const c = _.extend(Cypress.config(), opts.config)

      c.state = {}
      // c.state = opts.state

      cy.stub(win.channel, 'on').snapshot(false)

      win.Runner.start(win.document.getElementById('app'), c)
    })
  })
}

describe('src/cypress/runner', () => {
  before(() => {
    $('#snapshot-copy-btn', window.top.document).remove()

    const btn = $('<span id="snapshot-copy-btn"><button><i class="fa fa-copy"></i></button></span>', window.top.document)
    const container = $(
      '.toggle-auto-scrolling.auto-scrolling-enabled',
      window.top.document
    ).closest('.controls')

    container.prepend(btn)

    btn.on('click', () => {
      console.log('%cCopied to clipboard', 'color:grey')
      // console.log(lastActual)
      copyToClipboard(stringify(window.lastActual))
    })

  })

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

          expect(formatEvents(allStubs)).to.matchDeep(eventCleanseMap, [
            ['run:start'],
            [
              'test:before:run',
              {
                id: 'r3',
                title: 'test 1',
                body: '[body]',
                type: 'test',
                wallClockStartedAt: match.date,
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'test:before:run:async',
              {
                id: 'r3',
                title: 'test 1',
                body: '[body]',
                type: 'test',
                wallClockStartedAt: match.date,
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'runnable:after:run:async',
              {
                id: 'r3',
                title: 'test 1',
                body: '[body]',
                type: 'test',
                duration: match.number,
                wallClockStartedAt: match.date,
                timings: {
                  lifecycle: match.number,
                  test: {
                    fnDuration: match.number,
                    afterFnDuration: match.number,
                  },
                },
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'test:after:run',
              {
                id: 'r3',
                title: 'test 1',
                state: 'passed',
                body: '[body]',
                type: 'test',
                duration: match.number,
                wallClockStartedAt: match.date,
                wallClockDuration: match.number,
                timings: {
                  lifecycle: match.number,
                  test: {
                    fnDuration: match.number,
                    afterFnDuration: match.number,
                  },
                },
                attemptIndex: 0,
                final: true,
              },
            ],
            ['run:end'],
          ])
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
          expect(formatEvents(allStubs)).to.matchDeep(eventCleanseMap, [
            ['run:start'],
            [
              'test:before:run',
              {
                id: 'r3',
                title: 'test 1',
                body: '[body]',
                type: 'test',
                wallClockStartedAt: match.date,
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'test:before:run:async',
              {
                id: 'r3',
                title: 'test 1',
                body: '[body]',
                type: 'test',
                wallClockStartedAt: match.date,
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'runnable:after:run:async',
              {
                id: 'r3',
                title: 'test 1',
                body: '[body]',
                type: 'test',
                duration: match.number,
                wallClockStartedAt: match.date,
                timings: {
                  lifecycle: match.number,
                  test: {
                    fnDuration: match.number,
                    afterFnDuration: match.number,
                  },
                },
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'test:after:run',
              {
                id: 'r3',
                title: 'test 1',
                state: 'passed',
                body: '[body]',
                type: 'test',
                duration: match.number,
                wallClockStartedAt: match.date,
                wallClockDuration: match.number,
                timings: {
                  lifecycle: match.number,
                  test: {
                    fnDuration: match.number,
                    afterFnDuration: match.number,
                  },
                },
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'test:before:run',
              {
                id: 'r4',
                title: 'test 2',
                body: '[body]',
                type: 'test',
                wallClockStartedAt: match.date,
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'test:before:run:async',
              {
                id: 'r4',
                title: 'test 2',
                body: '[body]',
                type: 'test',
                wallClockStartedAt: match.date,
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'runnable:after:run:async',
              {
                id: 'r4',
                title: 'test 2',
                body: '[body]',
                type: 'test',
                duration: match.number,
                wallClockStartedAt: match.date,
                timings: {
                  lifecycle: match.number,
                  test: {
                    fnDuration: match.number,
                    afterFnDuration: match.number,
                  },
                },
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'test:after:run',
              {
                id: 'r4',
                title: 'test 2',
                state: 'passed',
                body: '[body]',
                type: 'test',
                duration: match.number,
                wallClockStartedAt: match.date,
                wallClockDuration: match.number,
                timings: {
                  lifecycle: match.number,
                  test: {
                    fnDuration: match.number,
                    afterFnDuration: match.number,
                  },
                },
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'test:before:run',
              {
                id: 'r5',
                title: 'test 3',
                body: '[body]',
                type: 'test',
                wallClockStartedAt: match.date,
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'test:before:run:async',
              {
                id: 'r5',
                title: 'test 3',
                body: '[body]',
                type: 'test',
                wallClockStartedAt: match.date,
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'runnable:after:run:async',
              {
                id: 'r5',
                title: 'test 3',
                body: '[body]',
                type: 'test',
                duration: match.number,
                wallClockStartedAt: match.date,
                timings: {
                  lifecycle: match.number,
                  test: {
                    fnDuration: match.number,
                    afterFnDuration: match.number,
                  },
                },
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'test:after:run',
              {
                id: 'r5',
                title: 'test 3',
                state: 'passed',
                body: '[body]',
                type: 'test',
                duration: match.number,
                wallClockStartedAt: match.date,
                wallClockDuration: match.number,
                timings: {
                  lifecycle: match.number,
                  test: {
                    fnDuration: match.number,
                    afterFnDuration: match.number,
                  },
                },
                attemptIndex: 0,
                final: true,
              },
            ],
            ['run:end'],
          ])
        })
      })

      it.only('simple fail', function () {
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
          expect(formatEvents(allStubs)).to.matchDeep(eventCleanseMap, [
            ['run:start'],
            [
              'test:before:run',
              {
                id: 'r3',
                title: 'test 1',
                body: '[body]',
                type: 'test',
                wallClockStartedAt: match.date,
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'test:before:run:async',
              {
                id: 'r3',
                title: 'test 1',
                body: '[body]',
                type: 'test',
                wallClockStartedAt: match.date,
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'fail',
              {
                name: 'AssertionError',
                message: '[error message]',
                showDiff: false,
                actual: null,
                expected: undefined,
                onFail: '[Function]',
                stack: match.string,
              },
            ],
            [
              'runnable:after:run:async',
              {
                id: 'r3',
                title: 'test 1',
                err: '{Object 6}',
                body: '[body]',
                type: 'test',
                duration: match.number,
                wallClockStartedAt: match.date,
                timings: {
                  lifecycle: match.number,
                  test: {
                    fnDuration: match.number,
                    afterFnDuration: match.number,
                  },
                },
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'test:after:run',
              {
                id: 'r3',
                title: 'test 1',
                err: '{Object 6}',
                state: 'failed',
                body: '[body]',
                type: 'test',
                duration: match.number,
                wallClockStartedAt: match.date,
                wallClockDuration: match.number,
                timings: {
                  lifecycle: match.number,
                  test: {
                    fnDuration: match.number,
                    afterFnDuration: match.number,
                  },
                },
                attemptIndex: 0,
                final: true,
              },
            ],
            ['run:end'],
          ])
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

          expect(formatEvents(allStubs)).to.matchDeep(eventCleanseMap, [
            ['run:start'],
            [
              'test:before:run',
              {
                id: 'r3',
                title: 'test 1',
                body: '[body]',
                type: 'test',
                wallClockStartedAt: match.date,
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'test:before:run:async',
              {
                id: 'r3',
                title: 'test 1',
                body: '[body]',
                type: 'test',
                wallClockStartedAt: match.date,
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'runnable:after:run:async',
              {
                id: 'r3',
                title: 'test 1',
                body: '[body]',
                type: 'test',
                duration: match.number,
                wallClockStartedAt: match.date,
                timings: {
                  lifecycle: match.number,
                  test: {
                    fnDuration: match.number,
                    afterFnDuration: match.number,
                  },
                },
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'test:after:run',
              {
                id: 'r3',
                title: 'test 1',
                state: 'passed',
                body: '[body]',
                type: 'test',
                duration: match.number,
                wallClockStartedAt: match.date,
                wallClockDuration: match.number,
                timings: {
                  lifecycle: match.number,
                  test: {
                    fnDuration: match.number,
                    afterFnDuration: match.number,
                  },
                },
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'test:before:run',
              {
                id: 'r4',
                title: 'test 2',
                body: '[body]',
                type: 'test',
                wallClockStartedAt: match.date,
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'test:before:run:async',
              {
                id: 'r4',
                title: 'test 2',
                body: '[body]',
                type: 'test',
                wallClockStartedAt: match.date,
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'fail',
              {
                name: 'AssertionError',
                message: '[error message]',
                showDiff: false,
                actual: null,
                expected: undefined,
                onFail: '[Function]',
                stack: match.string,
              },
            ],
            [
              'runnable:after:run:async',
              {
                id: 'r4',
                title: 'test 2',
                err: '{Object 6}',
                body: '[body]',
                type: 'test',
                duration: match.number,
                wallClockStartedAt: match.date,
                timings: {
                  lifecycle: match.number,
                  test: {
                    fnDuration: match.number,
                    afterFnDuration: match.number,
                  },
                },
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'test:after:run',
              {
                id: 'r4',
                title: 'test 2',
                err: '{Object 6}',
                state: 'failed',
                body: '[body]',
                type: 'test',
                duration: match.number,
                wallClockStartedAt: match.date,
                wallClockDuration: match.number,
                timings: {
                  lifecycle: match.number,
                  test: {
                    fnDuration: match.number,
                    afterFnDuration: match.number,
                  },
                },
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'test:before:run',
              {
                id: 'r6',
                title: 'test 1',
                body: '[body]',
                type: 'test',
                wallClockStartedAt: match.date,
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'test:before:run:async',
              {
                id: 'r6',
                title: 'test 1',
                body: '[body]',
                type: 'test',
                wallClockStartedAt: match.date,
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'runnable:after:run:async',
              {
                id: 'r6',
                title: 'test 1',
                body: '[body]',
                type: 'test',
                duration: match.number,
                wallClockStartedAt: match.date,
                timings: {
                  lifecycle: match.number,
                  test: {
                    fnDuration: match.number,
                    afterFnDuration: match.number,
                  },
                },
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'test:after:run',
              {
                id: 'r6',
                title: 'test 1',
                state: 'passed',
                body: '[body]',
                type: 'test',
                duration: match.number,
                wallClockStartedAt: match.date,
                wallClockDuration: match.number,
                timings: {
                  lifecycle: match.number,
                  test: {
                    fnDuration: match.number,
                    afterFnDuration: match.number,
                  },
                },
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'test:before:run',
              {
                id: 'r7',
                title: 'test 2',
                body: '[body]',
                type: 'test',
                wallClockStartedAt: match.date,
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'test:before:run:async',
              {
                id: 'r7',
                title: 'test 2',
                body: '[body]',
                type: 'test',
                wallClockStartedAt: match.date,
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'fail',
              {
                name: 'AssertionError',
                message: '[error message]',
                showDiff: false,
                actual: null,
                expected: undefined,
                onFail: '[Function]',
                stack: match.string,
              },
            ],
            [
              'runnable:after:run:async',
              {
                id: 'r7',
                title: 'test 2',
                err: '{Object 6}',
                body: '[body]',
                type: 'test',
                duration: match.number,
                wallClockStartedAt: match.date,
                timings: {
                  lifecycle: match.number,
                  test: {
                    fnDuration: match.number,
                    afterFnDuration: match.number,
                  },
                },
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'test:after:run',
              {
                id: 'r7',
                title: 'test 2',
                err: '{Object 6}',
                state: 'failed',
                body: '[body]',
                type: 'test',
                duration: match.number,
                wallClockStartedAt: match.date,
                wallClockDuration: match.number,
                timings: {
                  lifecycle: match.number,
                  test: {
                    fnDuration: match.number,
                    afterFnDuration: match.number,
                  },
                },
                attemptIndex: 0,
                final: true,
              },
            ],
            ['run:end'],
          ])
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
          expect(formatEvents(allStubs)).to.matchDeep(eventCleanseMap, [
            ['run:start'],
            [
              'test:before:run',
              {
                id: 'r3',
                title: 'test 1',
                body: '[body]',
                type: 'test',
                wallClockStartedAt: match.date,
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'test:before:run:async',
              {
                id: 'r3',
                title: 'test 1',
                body: '[body]',
                type: 'test',
                wallClockStartedAt: match.date,
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'fail',
              {
                name: 'AssertionError',
                message: '[error message]',
                showDiff: false,
                actual: null,
                expected: undefined,
                onFail: '[Function]',
                stack: match.string,
              },
            ],
            [
              'runnable:after:run:async',
              {
                id: 'r3',
                title: 'test 1',
                err: '{Object 6}',
                body: '[body]',
                type: 'test',
                duration: match.number,
                wallClockStartedAt: match.date,
                timings: {
                  lifecycle: match.number,
                  test: {
                    fnDuration: match.number,
                    afterFnDuration: match.number,
                  },
                },
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'test:after:run',
              {
                id: 'r3',
                title: 'test 1',
                err: '{Object 6}',
                state: 'failed',
                body: '[body]',
                type: 'test',
                duration: match.number,
                wallClockStartedAt: match.date,
                wallClockDuration: match.number,
                timings: {
                  lifecycle: match.number,
                  test: {
                    fnDuration: match.number,
                    afterFnDuration: match.number,
                  },
                },
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'test:before:run',
              {
                id: 'r4',
                title: 'test 2',
                body: '[body]',
                type: 'test',
                wallClockStartedAt: match.date,
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'test:before:run:async',
              {
                id: 'r4',
                title: 'test 2',
                body: '[body]',
                type: 'test',
                wallClockStartedAt: match.date,
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'runnable:after:run:async',
              {
                id: 'r4',
                title: 'test 2',
                body: '[body]',
                type: 'test',
                duration: match.number,
                wallClockStartedAt: match.date,
                timings: {
                  lifecycle: match.number,
                  test: {
                    fnDuration: match.number,
                    afterFnDuration: match.number,
                  },
                },
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'test:after:run',
              {
                id: 'r4',
                title: 'test 2',
                state: 'passed',
                body: '[body]',
                type: 'test',
                duration: match.number,
                wallClockStartedAt: match.date,
                wallClockDuration: match.number,
                timings: {
                  lifecycle: match.number,
                  test: {
                    fnDuration: match.number,
                    afterFnDuration: match.number,
                  },
                },
                attemptIndex: 0,
                final: true,
              },
            ],
            ['run:end'],
          ])
        })
      })

      it('no tests', function () {
        createCypress({})
        .then(shouldHaveTestResults(0, 0))
        .then(() => {
          expect(formatEvents(allStubs)).to.matchDeep([['run:start'], ['run:end']])
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
          expect(formatEvents(allStubs)).to.matchDeep(eventCleanseMap, [
            ['run:start'],
            [
              'test:before:run',
              {
                id: 'r3',
                title: 'test 1',
                body: '[body]',
                type: 'test',
                wallClockStartedAt: match.date,
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'test:before:run:async',
              {
                id: 'r3',
                title: 'test 1',
                body: '[body]',
                type: 'test',
                wallClockStartedAt: match.date,
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'fail',
              {
                name: 'AssertionError',
                message: '[error message]',
                showDiff: false,
                actual: false,
                expected: undefined,
                onFail: '[Function]',
                stack: match.string,
              },
            ],
            [
              'runnable:after:run:async',
              {
                id: 'r3',
                title: 'test 1',
                body: '[body]',
                type: 'test',
                duration: match.number,
                wallClockStartedAt: match.date,
                timings: {
                  lifecycle: match.number,
                  test: {
                    fnDuration: match.number,
                    afterFnDuration: match.number,
                  },
                },
                attemptIndex: 0,
                final: true,
              },
            ],
            [
              'test:after:run',
              {
                id: 'r3',
                title: 'test 1',
                state: 'passed',
                body: '[body]',
                type: 'test',
                duration: match.number,
                wallClockStartedAt: match.date,
                wallClockDuration: match.number,
                timings: {
                  lifecycle: match.number,
                  test: {
                    fnDuration: match.number,
                    afterFnDuration: match.number,
                  },
                },
                attemptIndex: 0,
                final: true,
              },
            ],
            ['run:end'],
          ])
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
            expect(formatEvents(allStubs)).to.matchDeep(eventCleanseMap, [
              ['run:start'],
              [
                'test:before:run',
                {
                  id: 'r3',
                  title: 'test 1',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 0,
                  final: true,
                },
              ],
              [
                'test:before:run:async',
                {
                  id: 'r3',
                  title: 'test 1',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 0,
                  final: true,
                },
              ],
              [
                'fail',
                {
                  name: 'AssertionError',
                  message: '[error message]',
                  showDiff: false,
                  actual: null,
                  expected: undefined,
                  onFail: '[Function]',
                  stack: match.string,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: '"before all" hook',
                  hookName: 'before all',
                  hookId: 'h1',
                  err: '{Object 6}',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'test:after:run',
                {
                  id: 'r3',
                  title: 'test 1',
                  hookName: 'before all',
                  err: '{Object 6}',
                  state: 'failed',
                  failedFromHookId: 'h1',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  wallClockDuration: match.number,
                  timings: {
                    lifecycle: match.number,
                    'before all': [
                      {
                        hookId: 'h1',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                  },
                  attemptIndex: 0,
                  final: true,
                },
              ],
              ['run:end'],
            ])
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
            expect(formatEvents(allStubs)).to.matchDeep(eventCleanseMap, [
              ['run:start'],
              [
                'test:before:run',
                {
                  id: 'r3',
                  title: 'test 1',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 0,
                  final: true,
                },
              ],
              [
                'test:before:run:async',
                {
                  id: 'r3',
                  title: 'test 1',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 0,
                  final: true,
                },
              ],
              [
                'fail',
                {
                  name: 'AssertionError',
                  message: '[error message]',
                  showDiff: false,
                  actual: null,
                  expected: undefined,
                  onFail: '[Function]',
                  stack: match.string,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: '"before each" hook',
                  hookName: 'before each',
                  hookId: 'h1',
                  err: '{Object 6}',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'test:after:run',
                {
                  id: 'r3',
                  title: 'test 1',
                  hookName: 'before each',
                  err: '{Object 6}',
                  state: 'failed',
                  failedFromHookId: 'h1',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  wallClockDuration: match.number,
                  timings: {
                    lifecycle: match.number,
                    'before each': [
                      {
                        hookId: 'h1',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                  },
                  attemptIndex: 0,
                  final: true,
                },
              ],
              ['run:end'],
            ])
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
            expect(formatEvents(allStubs)).to.matchDeep(eventCleanseMap, [
              ['run:start'],
              [
                'test:before:run',
                {
                  id: 'r3',
                  title: 'test 1',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 0,
                  final: true,
                },
              ],
              [
                'test:before:run:async',
                {
                  id: 'r3',
                  title: 'test 1',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 0,
                  final: true,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: 'test 1',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  timings: {
                    lifecycle: match.number,
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                    'after each': [
                      {
                        hookId: 'h1',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                  },
                  attemptIndex: 0,
                  final: true,
                },
              ],
              [
                'fail',
                {
                  name: 'AssertionError',
                  message: '[error message]',
                  showDiff: false,
                  actual: null,
                  expected: undefined,
                  onFail: '[Function]',
                  stack: match.string,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: '"after each" hook',
                  hookName: 'after each',
                  hookId: 'h1',
                  err: '{Object 6}',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'test:after:run',
                {
                  id: 'r3',
                  title: 'test 1',
                  hookName: 'after each',
                  err: '{Object 6}',
                  state: 'failed',
                  failedFromHookId: 'h1',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  wallClockDuration: match.number,
                  timings: {
                    lifecycle: match.number,
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                    'after each': [
                      {
                        hookId: 'h1',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                  },
                  attemptIndex: 0,
                  final: true,
                },
              ],
              ['run:end'],
            ])
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
            expect(formatEvents(allStubs)).to.matchDeep(eventCleanseMap, [
              ['run:start'],
              [
                'test:before:run',
                {
                  id: 'r3',
                  title: 'test 1',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 0,
                  final: true,
                },
              ],
              [
                'test:before:run:async',
                {
                  id: 'r3',
                  title: 'test 1',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 0,
                  final: true,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: 'test 1',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  timings: {
                    lifecycle: match.number,
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                  },
                  attemptIndex: 0,
                  final: true,
                },
              ],
              [
                'test:after:run',
                {
                  id: 'r3',
                  title: 'test 1',
                  state: 'passed',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  wallClockDuration: match.number,
                  timings: {
                    lifecycle: match.number,
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                  },
                  attemptIndex: 0,
                  final: true,
                },
              ],
              [
                'test:before:run',
                {
                  id: 'r4',
                  title: 'test 2',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 0,
                  final: true,
                },
              ],
              [
                'test:before:run:async',
                {
                  id: 'r4',
                  title: 'test 2',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 0,
                  final: true,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r4',
                  title: 'test 2',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  timings: {
                    lifecycle: match.number,
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                    'after all': [
                      {
                        hookId: 'h1',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                  },
                  attemptIndex: 0,
                  final: true,
                },
              ],
              [
                'fail',
                {
                  name: 'AssertionError',
                  message: '[error message]',
                  showDiff: false,
                  actual: null,
                  expected: undefined,
                  onFail: '[Function]',
                  stack: match.string,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r4',
                  title: '"after all" hook',
                  hookName: 'after all',
                  hookId: 'h1',
                  err: '{Object 6}',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'test:after:run',
                {
                  id: 'r4',
                  title: 'test 2',
                  hookName: 'after all',
                  err: '{Object 6}',
                  state: 'failed',
                  failedFromHookId: 'h1',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  wallClockDuration: match.number,
                  timings: {
                    lifecycle: match.number,
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                    'after all': [
                      {
                        hookId: 'h1',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                  },
                  attemptIndex: 0,
                  final: true,
                },
              ],
              ['run:end'],
            ])
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
            expect(formatEvents(allStubs)).to.matchDeep(eventCleanseMap, [
              ['run:start'],
              [
                'test:before:run',
                {
                  id: 'r3',
                  title: 'test 1',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 0,
                  final: true,
                },
              ],
              [
                'test:before:run:async',
                {
                  id: 'r3',
                  title: 'test 1',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 0,
                  final: true,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: '"before all" hook',
                  hookName: 'before all',
                  hookId: 'h1',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'fail',
                {
                  name: 'AssertionError',
                  message: '[error message]',
                  showDiff: false,
                  actual: null,
                  expected: undefined,
                  onFail: '[Function]',
                  stack: match.string,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: 'test 1',
                  err: '{Object 6}',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  timings: {
                    lifecycle: match.number,
                    'before all': [
                      {
                        hookId: 'h1',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                  },
                  attemptIndex: 0,
                  final: true,
                },
              ],
              [
                'test:after:run',
                {
                  id: 'r3',
                  title: 'test 1',
                  err: '{Object 6}',
                  state: 'failed',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  wallClockDuration: match.number,
                  timings: {
                    lifecycle: match.number,
                    'before all': [
                      {
                        hookId: 'h1',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                  },
                  attemptIndex: 0,
                  final: true,
                },
              ],
              [
                'test:before:run',
                {
                  id: 'r4',
                  title: 'test 2',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 0,
                  final: true,
                },
              ],
              [
                'test:before:run:async',
                {
                  id: 'r4',
                  title: 'test 2',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 0,
                  final: true,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r4',
                  title: 'test 2',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  timings: {
                    lifecycle: match.number,
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                  },
                  attemptIndex: 0,
                  final: true,
                },
              ],
              [
                'test:after:run',
                {
                  id: 'r4',
                  title: 'test 2',
                  state: 'passed',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  wallClockDuration: match.number,
                  timings: {
                    lifecycle: match.number,
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                  },
                  attemptIndex: 0,
                  final: true,
                },
              ],
              ['run:end'],
            ])
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
            expect(formatEvents(allStubs)).to.matchDeep(eventCleanseMap, [
              ['run:start'],
              [
                'test:before:run',
                {
                  id: 'r3',
                  title: 'test 1',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 0,
                  final: true,
                },
              ],
              [
                'test:before:run:async',
                {
                  id: 'r3',
                  title: 'test 1',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 0,
                  final: true,
                },
              ],
              [
                'fail',
                {
                  name: 'AssertionError',
                  message: '[error message]',
                  showDiff: false,
                  actual: null,
                  expected: undefined,
                  onFail: '[Function]',
                  stack: match.string,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: 'test 1',
                  err: '{Object 6}',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  timings: {
                    lifecycle: match.number,
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                  },
                  attemptIndex: 0,
                  final: true,
                },
              ],
              [
                'test:after:run',
                {
                  id: 'r3',
                  title: 'test 1',
                  err: '{Object 6}',
                  state: 'failed',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  wallClockDuration: match.number,
                  timings: {
                    lifecycle: match.number,
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                  },
                  attemptIndex: 0,
                  final: true,
                },
              ],
              [
                'test:before:run',
                {
                  id: 'r4',
                  title: 'test 2',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 0,
                  final: true,
                },
              ],
              [
                'test:before:run:async',
                {
                  id: 'r4',
                  title: 'test 2',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 0,
                  final: true,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r4',
                  title: 'test 2',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  timings: {
                    lifecycle: match.number,
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                    'after all': [
                      {
                        hookId: 'h1',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                  },
                  attemptIndex: 0,
                  final: true,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r4',
                  title: '"after all" hook',
                  hookName: 'after all',
                  hookId: 'h1',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'test:after:run',
                {
                  id: 'r4',
                  title: 'test 2',
                  state: 'passed',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  wallClockDuration: match.number,
                  timings: {
                    lifecycle: match.number,
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                    'after all': [
                      {
                        hookId: 'h1',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                  },
                  attemptIndex: 0,
                  final: true,
                },
              ],
              ['run:end'],
            ])
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
            expect(formatEvents(allStubs)).to.matchDeep(eventCleanseMap, [
              ['run:start'],
              [
                'test:before:run',
                {
                  id: 'r3',
                  title: 'test 1',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 0,
                  final: true,
                },
              ],
              [
                'test:before:run:async',
                {
                  id: 'r3',
                  title: 'test 1',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 0,
                  final: true,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: '"before all" hook',
                  hookName: 'before all',
                  hookId: 'h1',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: '"before each" hook',
                  hookName: 'before each',
                  hookId: 'h2',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'fail',
                {
                  name: 'AssertionError',
                  message: '[error message]',
                  showDiff: false,
                  actual: null,
                  expected: undefined,
                  onFail: '[Function]',
                  stack: match.string,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: 'test 1',
                  err: '{Object 6}',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  timings: {
                    lifecycle: match.number,
                    'before all': [
                      {
                        hookId: 'h1',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    'before each': [
                      {
                        hookId: 'h2',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                    'after each': [
                      {
                        hookId: 'h3',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    'after all': [
                      {
                        hookId: 'h4',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                  },
                  attemptIndex: 0,
                  final: true,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: '"after each" hook',
                  hookName: 'after each',
                  hookId: 'h3',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: '"after all" hook',
                  hookName: 'after all',
                  hookId: 'h4',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'test:after:run',
                {
                  id: 'r3',
                  title: 'test 1',
                  err: '{Object 6}',
                  state: 'failed',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  wallClockDuration: match.number,
                  timings: {
                    lifecycle: match.number,
                    'before all': [
                      {
                        hookId: 'h1',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    'before each': [
                      {
                        hookId: 'h2',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                    'after each': [
                      {
                        hookId: 'h3',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    'after all': [
                      {
                        hookId: 'h4',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                  },
                  attemptIndex: 0,
                  final: true,
                },
              ],
              ['run:end'],
            ])
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
            expect(formatEvents(allStubs)).to.matchDeep(eventCleanseMap, [
              ['run:start'],
              [
                'test:before:run',
                {
                  id: 'r3',
                  title: 'test 2',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 0,
                  final: true,
                },
              ],
              [
                'test:before:run:async',
                {
                  id: 'r3',
                  title: 'test 2',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 0,
                  final: true,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: '"before all" hook',
                  hookName: 'before all',
                  hookId: 'h1',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: '"before each" hook',
                  hookName: 'before each',
                  hookId: 'h2',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'fail',
                {
                  name: 'AssertionError',
                  message: '[error message]',
                  showDiff: false,
                  actual: null,
                  expected: undefined,
                  onFail: '[Function]',
                  stack: match.string,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: 'test 2',
                  err: '{Object 6}',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  timings: {
                    lifecycle: match.number,
                    'before all': [
                      {
                        hookId: 'h1',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    'before each': [
                      {
                        hookId: 'h2',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                    'after each': [
                      {
                        hookId: 'h3',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    'after all': [
                      {
                        hookId: 'h4',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                  },
                  attemptIndex: 0,
                  final: true,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: '"after each" hook',
                  hookName: 'after each',
                  hookId: 'h3',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: '"after all" hook',
                  hookName: 'after all',
                  hookId: 'h4',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'test:after:run',
                {
                  id: 'r3',
                  title: 'test 2',
                  err: '{Object 6}',
                  state: 'failed',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  wallClockDuration: match.number,
                  timings: {
                    lifecycle: match.number,
                    'before all': [
                      {
                        hookId: 'h1',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    'before each': [
                      {
                        hookId: 'h2',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                    'after each': [
                      {
                        hookId: 'h3',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    'after all': [
                      {
                        hookId: 'h4',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                  },
                  attemptIndex: 0,
                  final: true,
                },
              ],
              ['run:end'],
            ])
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
            expect(formatEvents(allStubs)).to.matchDeep(eventCleanseMap, [
              ['run:start'],
              [
                'test:before:run',
                {
                  id: 'r3',
                  title: 'test 2',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 0,
                  final: true,
                },
              ],
              [
                'test:before:run:async',
                {
                  id: 'r3',
                  title: 'test 2',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 0,
                  final: true,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: '"before all" hook',
                  hookName: 'before all',
                  hookId: 'h1',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: '"before each" hook',
                  hookName: 'before each',
                  hookId: 'h2',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: 'test 2',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  timings: {
                    lifecycle: match.number,
                    'before all': [
                      {
                        hookId: 'h1',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    'before each': [
                      {
                        hookId: 'h2',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                    'after each': [
                      {
                        hookId: 'h3',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    'after all': [
                      {
                        hookId: 'h4',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                  },
                  attemptIndex: 0,
                  final: true,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: '"after each" hook',
                  hookName: 'after each',
                  hookId: 'h3',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: '"after all" hook',
                  hookName: 'after all',
                  hookId: 'h4',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'test:after:run',
                {
                  id: 'r3',
                  title: 'test 2',
                  state: 'passed',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  wallClockDuration: match.number,
                  timings: {
                    lifecycle: match.number,
                    'before all': [
                      {
                        hookId: 'h1',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    'before each': [
                      {
                        hookId: 'h2',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                    'after each': [
                      {
                        hookId: 'h3',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    'after all': [
                      {
                        hookId: 'h4',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                  },
                  attemptIndex: 0,
                  final: true,
                },
              ],
              ['run:end'],
            ])
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

            expect(formatEvents(allStubs)).matchDeep(eventCleanseMap, [
              ['run:start'],
              [
                'test:before:run',
                {
                  id: 'r3',
                  title: 'test 1',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 0,
                },
              ],
              [
                'test:before:run:async',
                {
                  id: 'r3',
                  title: 'test 1',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 0,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: '"before all" hook',
                  hookName: 'before all',
                  hookId: 'h1',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: '"before each" hook',
                  hookName: 'before each',
                  hookId: 'h2',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'fail',
                {
                  name: 'AssertionError',
                  message: '[error message]',
                  showDiff: false,
                  actual: null,
                  expected: undefined,
                  onFail: '[Function]',
                  stack: match.string,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: 'test 1',
                  err: '{Object 6}',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  timings: {
                    lifecycle: match.number,
                    'before all': [
                      {
                        hookId: 'h1',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    'before each': [
                      {
                        hookId: 'h2',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                    'after each': [
                      {
                        hookId: 'h3',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                  },
                  attemptIndex: 0,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: '"after each" hook',
                  hookName: 'after each',
                  hookId: 'h3',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'test:after:run',
                {
                  id: 'r3',
                  title: 'test 1',
                  err: '{Object 6}',
                  state: 'failed',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  wallClockDuration: match.number,
                  timings: {
                    lifecycle: match.number,
                    'before all': [
                      {
                        hookId: 'h1',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    'before each': [
                      {
                        hookId: 'h2',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                    'after each': [
                      {
                        hookId: 'h3',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                  },
                  attemptIndex: 0,
                },
              ],
              [
                'test:before:run',
                {
                  id: 'r3',
                  title: 'test 1',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 1,
                  final: true,
                },
              ],
              [
                'test:before:run:async',
                {
                  id: 'r3',
                  title: 'test 1',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 1,
                  final: true,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: '"before each" hook',
                  hookName: 'before each',
                  hookId: 'h2',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: 'test 1',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  timings: {
                    lifecycle: match.number,
                    'before each': [
                      {
                        hookId: 'h2',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                    'after each': [
                      {
                        hookId: 'h3',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    'after all': [
                      {
                        hookId: 'h4',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                  },
                  attemptIndex: 1,
                  final: true,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: '"after each" hook',
                  hookName: 'after each',
                  hookId: 'h3',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: '"after all" hook',
                  hookName: 'after all',
                  hookId: 'h4',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'test:after:run',
                {
                  id: 'r3',
                  title: 'test 1',
                  state: 'passed',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  wallClockDuration: match.number,
                  timings: {
                    lifecycle: match.number,
                    'before each': [
                      {
                        hookId: 'h2',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                    'after each': [
                      {
                        hookId: 'h3',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    'after all': [
                      {
                        hookId: 'h4',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                  },
                  attemptIndex: 1,
                  final: true,
                },
              ],
              ['run:end'],
            ])

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

            expect(formatEvents(allStubs)).matchDeep(eventCleanseMap, [
              ['run:start'],
              [
                'test:before:run',
                {
                  id: 'r3',
                  title: 'test 2',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 0,
                },
              ],
              [
                'test:before:run:async',
                {
                  id: 'r3',
                  title: 'test 2',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 0,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: '"before all" hook',
                  hookName: 'before all',
                  hookId: 'h1',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: '"before each" hook',
                  hookName: 'before each',
                  hookId: 'h2',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'fail',
                {
                  name: 'AssertionError',
                  message: '[error message]',
                  showDiff: false,
                  actual: null,
                  expected: undefined,
                  onFail: '[Function]',
                  stack: match.string,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: 'test 2',
                  err: '{Object 6}',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  timings: {
                    lifecycle: match.number,
                    'before all': [
                      {
                        hookId: 'h1',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    'before each': [
                      {
                        hookId: 'h2',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                    'after each': [
                      {
                        hookId: 'h3',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                  },
                  attemptIndex: 0,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: '"after each" hook',
                  hookName: 'after each',
                  hookId: 'h3',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'test:after:run',
                {
                  id: 'r3',
                  title: 'test 2',
                  err: '{Object 6}',
                  state: 'failed',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  wallClockDuration: match.number,
                  timings: {
                    lifecycle: match.number,
                    'before all': [
                      {
                        hookId: 'h1',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    'before each': [
                      {
                        hookId: 'h2',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                    'after each': [
                      {
                        hookId: 'h3',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                  },
                  attemptIndex: 0,
                },
              ],
              [
                'test:before:run',
                {
                  id: 'r3',
                  title: 'test 2',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 1,
                  final: true,
                },
              ],
              [
                'test:before:run:async',
                {
                  id: 'r3',
                  title: 'test 2',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 1,
                  final: true,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: '"before each" hook',
                  hookName: 'before each',
                  hookId: 'h2',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: 'test 2',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  timings: {
                    lifecycle: match.number,
                    'before each': [
                      {
                        hookId: 'h2',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                    'after each': [
                      {
                        hookId: 'h3',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    'after all': [
                      {
                        hookId: 'h4',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                  },
                  attemptIndex: 1,
                  final: true,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: '"after each" hook',
                  hookName: 'after each',
                  hookId: 'h3',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: '"after all" hook',
                  hookName: 'after all',
                  hookId: 'h4',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'test:after:run',
                {
                  id: 'r3',
                  title: 'test 2',
                  state: 'passed',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  wallClockDuration: match.number,
                  timings: {
                    lifecycle: match.number,
                    'before each': [
                      {
                        hookId: 'h2',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                    'after each': [
                      {
                        hookId: 'h3',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    'after all': [
                      {
                        hookId: 'h4',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                  },
                  attemptIndex: 1,
                  final: true,
                },
              ],
              ['run:end'],
            ])
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

          // expect(formatEvents(allStubs).map(([str, { id, title } = {}]) => `${str} - ${id}|${title}`)).to.matchDeep([])
            expect(formatEvents(allStubs)).to.matchDeep(eventCleanseMap, [
              ['run:start'],
              [
                'test:before:run',
                {
                  id: 'r3',
                  title: 'test 1',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 0,
                },
              ],
              [
                'test:before:run:async',
                {
                  id: 'r3',
                  title: 'test 1',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 0,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: '"before all" hook',
                  hookName: 'before all',
                  hookId: 'h1',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: '"before each" hook',
                  hookName: 'before each',
                  hookId: 'h2',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: 'test 1',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  timings: {
                    lifecycle: match.number,
                    'before all': [
                      {
                        hookId: 'h1',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    'before each': [
                      {
                        hookId: 'h2',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                    'after each': [
                      {
                        hookId: 'h3',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                  },
                  attemptIndex: 0,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: '"after each" hook',
                  hookName: 'after each',
                  hookId: 'h3',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'test:after:run',
                {
                  id: 'r3',
                  title: 'test 1',
                  state: 'passed',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  wallClockDuration: match.number,
                  timings: {
                    lifecycle: match.number,
                    'before all': [
                      {
                        hookId: 'h1',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    'before each': [
                      {
                        hookId: 'h2',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                    'after each': [
                      {
                        hookId: 'h3',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                  },
                  attemptIndex: 0,
                },
              ],
              [
                'test:before:run',
                {
                  id: 'r4',
                  title: 'test 2',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 0,
                },
              ],
              [
                'test:before:run:async',
                {
                  id: 'r4',
                  title: 'test 2',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 0,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r4',
                  title: '"before each" hook',
                  hookName: 'before each',
                  hookId: 'h2',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'fail',
                {
                  name: 'AssertionError',
                  message: '[error message]',
                  showDiff: false,
                  actual: null,
                  expected: undefined,
                  onFail: '[Function]',
                  stack: match.string,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r4',
                  title: 'test 2',
                  err: '{Object 6}',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  timings: {
                    lifecycle: match.number,
                    'before each': [
                      {
                        hookId: 'h2',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                    'after each': [
                      {
                        hookId: 'h3',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                  },
                  attemptIndex: 0,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r4',
                  title: '"after each" hook',
                  hookName: 'after each',
                  hookId: 'h3',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'test:after:run',
                {
                  id: 'r4',
                  title: 'test 2',
                  err: '{Object 6}',
                  state: 'failed',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  wallClockDuration: match.number,
                  timings: {
                    lifecycle: match.number,
                    'before each': [
                      {
                        hookId: 'h2',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                    'after each': [
                      {
                        hookId: 'h3',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                  },
                  attemptIndex: 0,
                },
              ],
              [
                'test:before:run',
                {
                  id: 'r4',
                  title: 'test 2',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 1,
                  final: true,
                },
              ],
              [
                'test:before:run:async',
                {
                  id: 'r4',
                  title: 'test 2',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 1,
                  final: true,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r4',
                  title: '"before each" hook',
                  hookName: 'before each',
                  hookId: 'h2',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r4',
                  title: 'test 2',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  timings: {
                    lifecycle: match.number,
                    'before each': [
                      {
                        hookId: 'h2',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                    'after each': [
                      {
                        hookId: 'h3',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                  },
                  attemptIndex: 1,
                  final: true,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r4',
                  title: '"after each" hook',
                  hookName: 'after each',
                  hookId: 'h3',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'test:after:run',
                {
                  id: 'r4',
                  title: 'test 2',
                  state: 'passed',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  wallClockDuration: match.number,
                  timings: {
                    lifecycle: match.number,
                    'before each': [
                      {
                        hookId: 'h2',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                    'after each': [
                      {
                        hookId: 'h3',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                  },
                  attemptIndex: 1,
                  final: true,
                },
              ],
              [
                'test:before:run',
                {
                  id: 'r5',
                  title: 'test 3',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 0,
                },
              ],
              [
                'test:before:run:async',
                {
                  id: 'r5',
                  title: 'test 3',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 0,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r5',
                  title: '"before each" hook',
                  hookName: 'before each',
                  hookId: 'h2',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r5',
                  title: 'test 3',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  timings: {
                    lifecycle: match.number,
                    'before each': [
                      {
                        hookId: 'h2',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                    'after each': [
                      {
                        hookId: 'h3',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    'after all': [
                      {
                        hookId: 'h4',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                  },
                  attemptIndex: 0,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r5',
                  title: '"after each" hook',
                  hookName: 'after each',
                  hookId: 'h3',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r5',
                  title: '"after all" hook',
                  hookName: 'after all',
                  hookId: 'h4',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'test:after:run',
                {
                  id: 'r5',
                  title: 'test 3',
                  state: 'passed',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  wallClockDuration: match.number,
                  timings: {
                    lifecycle: match.number,
                    'before each': [
                      {
                        hookId: 'h2',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                    'after each': [
                      {
                        hookId: 'h3',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    'after all': [
                      {
                        hookId: 'h4',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                  },
                  attemptIndex: 0,
                },
              ],
              ['run:end'],
            ])
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

            expect(formatEvents(allStubs)).to.matchDeep(eventCleanseMap, [
              ['run:start'],
              [
                'test:before:run',
                {
                  id: 'r3',
                  title: 'test 1',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 0,
                },
              ],
              [
                'test:before:run:async',
                {
                  id: 'r3',
                  title: 'test 1',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 0,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: '"before all" hook',
                  hookName: 'before all',
                  hookId: 'h1',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: '"before each" hook',
                  hookName: 'before each',
                  hookId: 'h2',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'fail',
                {
                  name: 'AssertionError',
                  message: '[error message]',
                  showDiff: false,
                  actual: null,
                  expected: undefined,
                  onFail: '[Function]',
                  stack: match.string,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: '"before each" hook',
                  hookName: 'before each',
                  hookId: 'h3',
                  err: '{Object 6}',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'fail',
                {
                  name: 'AssertionError',
                  message: '[error message]',
                  showDiff: false,
                  actual: null,
                  expected: undefined,
                  onFail: '[Function]',
                  stack: match.string,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: 'test 1',
                  err: '{Object 6}',
                  state: 'failed',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  timings: {
                    lifecycle: match.number,
                    'before all': [
                      {
                        hookId: 'h1',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    'before each': [
                      {
                        hookId: 'h2',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                      {
                        hookId: 'h3',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                  },
                  attemptIndex: 0,
                },
              ],
              [
                'test:after:run',
                {
                  id: 'r3',
                  title: 'test 1',
                  err: '{Object 6}',
                  state: 'failed',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  wallClockDuration: match.number,
                  timings: {
                    lifecycle: match.number,
                    'before all': [
                      {
                        hookId: 'h1',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    'before each': [
                      {
                        hookId: 'h2',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                      {
                        hookId: 'h3',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                  },
                  attemptIndex: 0,
                },
              ],
              [
                'test:before:run',
                {
                  id: 'r3',
                  title: 'test 1',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 1,
                  final: true,
                },
              ],
              [
                'test:before:run:async',
                {
                  id: 'r3',
                  title: 'test 1',
                  body: '[body]',
                  type: 'test',
                  wallClockStartedAt: match.date,
                  attemptIndex: 1,
                  final: true,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: '"before each" hook',
                  hookName: 'before each',
                  hookId: 'h2',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: '"before each" hook',
                  hookName: 'before each',
                  hookId: 'h3',
                  err: '{Object 6}',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: '"before each" hook',
                  hookName: 'before each',
                  hookId: 'h4',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: 'test 1',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  timings: {
                    lifecycle: match.number,
                    'before each': [
                      {
                        hookId: 'h2',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                      {
                        hookId: 'h3',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                      {
                        hookId: 'h4',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                    'after each': [
                      {
                        hookId: 'h5',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    'after all': [
                      {
                        hookId: 'h6',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                  },
                  attemptIndex: 1,
                  final: true,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: '"after each" hook',
                  hookName: 'after each',
                  hookId: 'h5',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'runnable:after:run:async',
                {
                  id: 'r3',
                  title: '"after all" hook',
                  hookName: 'after all',
                  hookId: 'h6',
                  body: '[body]',
                  type: 'hook',
                  duration: match.number,
                },
              ],
              [
                'test:after:run',
                {
                  id: 'r3',
                  title: 'test 1',
                  state: 'passed',
                  body: '[body]',
                  type: 'test',
                  duration: match.number,
                  wallClockStartedAt: match.date,
                  wallClockDuration: match.number,
                  timings: {
                    lifecycle: match.number,
                    'before each': [
                      {
                        hookId: 'h2',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                      {
                        hookId: 'h3',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                      {
                        hookId: 'h4',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    test: {
                      fnDuration: match.number,
                      afterFnDuration: match.number,
                    },
                    'after each': [
                      {
                        hookId: 'h5',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                    'after all': [
                      {
                        hookId: 'h6',
                        fnDuration: match.number,
                        afterFnDuration: match.number,
                      },
                    ],
                  },
                  attemptIndex: 1,
                  final: true,
                },
              ],
              ['run:end'],
            ])
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
                  attemptIndex: 0,
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
                      testAttemptIndex: 0,
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
                      testAttemptIndex: 0,
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
                      testAttemptIndex: 0,
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
                      testAttemptIndex: 0,
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
                  attemptIndex: 0,
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
                  attemptIndex: 0,
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
                      testAttemptIndex: 0,
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
                      testAttemptIndex: 0,
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
                      testAttemptIndex: 0,
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
                      testAttemptIndex: 0,
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
                  attemptIndex: 1,
                  final: true,
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
                      attemptIndex: 0,
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

function copyToClipboard (text) {
  let el = document.createElement('textarea')

  document.body.appendChild(el)
  el.value = text
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
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

const runState2 = {
  currentId: 'r5',
  tests: {
    r3: {
      id: 'r3',
      title: 'test 1',
      state: 'passed',
      body: 'function () {\n      debug("test pass: ".concat(name));\n      win.assert(true, name);\n    }',
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
      },
      attemptIndex: 0,
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
          attemptIndex: 0,
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
          attemptIndex: 0,
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
          message: 'test 1',
          passed: true,
          selector: undefined,
          type: 'parent',
          event: false,
          id: 3,
          state: 'passed',
          instrument: 'command',
          url: '',
          hookName: 'test',
          testId: 'r3',
          attemptIndex: 0,
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
            Message: 'test 1',
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
          id: 4,
          state: 'passed',
          instrument: 'command',
          url: '',
          hookName: 'after each',
          testId: 'r3',
          attemptIndex: 0,
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
      ],
      prevAttempts: [],
    },
    r4: {
      id: 'r4',
      title: 'test 2',
      state: 'passed',
      body: 'function () {\n      debug("test pass: ".concat(name));\n      win.assert(true, name);\n    }',
      type: 'test',
      duration: 1,
      wallClockStartedAt: '1970-01-01T00:00:00.000Z',
      wallClockDuration: 1,
      timings: {
        lifecycle: 1,
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
      },
      attemptIndex: 0,
      commands: [
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
          id: 5,
          state: 'passed',
          instrument: 'command',
          url: '',
          hookName: 'before each',
          testId: 'r4',
          attemptIndex: 0,
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
          message: 'test 2',
          passed: true,
          selector: undefined,
          type: 'parent',
          event: false,
          id: 6,
          state: 'passed',
          instrument: 'command',
          url: '',
          hookName: 'test',
          testId: 'r4',
          attemptIndex: 0,
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
            Message: 'test 2',
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
          id: 7,
          state: 'passed',
          instrument: 'command',
          url: '',
          hookName: 'after each',
          testId: 'r4',
          attemptIndex: 0,
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
      ],
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
    },
    ended: {
      r3: true,
      r4: true,
    },
  },
  passed: 2,
  failed: 0,
  pending: 0,
  numLogs: 7,
}

const runState1 = {
  currentId: 'r5',
  tests: {
    r3: {
      id: 'r3',
      title: 'test 1',
      state: 'passed',
      body: 'function () {\n      debug("test pass: ".concat(name));\n      win.assert(true, name);\n    }',
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
      },
      attemptIndex: 0,
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
          attemptIndex: 0,
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
          attemptIndex: 0,
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
          message: 'test 1',
          passed: true,
          selector: undefined,
          type: 'parent',
          event: false,
          id: 3,
          state: 'passed',
          instrument: 'command',
          url: '',
          hookName: 'test',
          testId: 'r3',
          attemptIndex: 0,
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
            Message: 'test 1',
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
          id: 4,
          state: 'passed',
          instrument: 'command',
          url: '',
          hookName: 'after each',
          testId: 'r3',
          attemptIndex: 0,
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
      ],
      prevAttempts: [],
    },
    r4: {
      id: 'r4',
      title: 'test 2',
      state: 'passed',
      body: 'function () {\n        if (_.isNumber(fail) && fail-- === 0) {\n          debug("test pass after retry: ".concat(name));\n          win.assert(true, name);\n          return;\n        }\n\n        debug("test fail: ".concat(name));\n        win.assert(false, name);\n        throw new Error("test fail: ".concat(name));\n      }',
      type: 'test',
      duration: 1,
      wallClockStartedAt: '1970-01-01T00:00:00.000Z',
      timings: {
        lifecycle: 1,
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
      },
      attemptIndex: 1,
      final: true,
      commands: [
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
          id: 8,
          state: 'passed',
          instrument: 'command',
          url: '',
          hookName: 'before each',
          testId: 'r4',
          attemptIndex: 1,
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
          message: 'test 2',
          passed: true,
          selector: undefined,
          type: 'parent',
          event: false,
          id: 9,
          state: 'passed',
          instrument: 'command',
          url: '',
          hookName: 'test',
          testId: 'r4',
          attemptIndex: 1,
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
            Message: 'test 2',
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
          id: 10,
          state: 'passed',
          instrument: 'command',
          url: '',
          hookName: 'after each',
          testId: 'r4',
          attemptIndex: 1,
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
      ],
      prevAttempts: [
        {
          id: 'r4',
          title: 'test 2',
          err: {
            message: 'test 2',
            name: 'AssertionError',
            stack: '[err stack]',
            actual: null,
            expected: undefined,
            showDiff: false,
          },
          state: 'failed',
          body: 'function () {\n        if (_.isNumber(fail) && fail-- === 0) {\n          debug("test pass after retry: ".concat(name));\n          win.assert(true, name);\n          return;\n        }\n\n        debug("test fail: ".concat(name));\n        win.assert(false, name);\n        throw new Error("test fail: ".concat(name));\n      }',
          type: 'test',
          duration: 1,
          wallClockStartedAt: '1970-01-01T00:00:00.000Z',
          wallClockDuration: 1,
          timings: {
            lifecycle: 1,
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
          },
          attemptIndex: 0,
          commands: [
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
              id: 5,
              state: 'passed',
              instrument: 'command',
              url: '',
              hookName: 'before each',
              testId: 'r4',
              attemptIndex: 0,
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
              message: 'test 2',
              passed: false,
              selector: undefined,
              type: 'parent',
              event: false,
              id: 6,
              state: 'failed',
              instrument: 'command',
              url: '',
              hookName: 'test',
              testId: 'r4',
              attemptIndex: 0,
              viewportWidth: 1000,
              viewportHeight: 660,
              referencesAlias: undefined,
              alias: undefined,
              aliasType: undefined,
              snapshots: null,
              ended: true,
              err: {
                message: 'test 2',
                name: 'AssertionError',
                stack: '[err stack]',
                actual: null,
                expected: undefined,
                showDiff: false,
              },
              consoleProps: {
                Command: 'assert',
                actual: null,
                expected: undefined,
                Message: 'test 2',
                Error: 'AssertionError: test 2',
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
              id: 7,
              state: 'passed',
              instrument: 'command',
              url: '',
              hookName: 'after each',
              testId: 'r4',
              attemptIndex: 0,
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
          ],
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
    },
    ended: {
      r3: true,
      r4: true,
    },
  },
  passed: 2,
  failed: 0,
  pending: 0,
  numLogs: 10,
}

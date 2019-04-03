const { matchDeep } = require('../../driver/test/cypress/support/matchDeep')
const { Snapshot } = require('../../driver/test/cypress/plugins/snapshot')
const chai = require('chai')
const _ = require('lodash')

/** @type {Mocha.ITest} */
let currentTest

const registerInMocha = () => {

  const { getSnapshot, saveSnapshot, snapshotRestore } = new Snapshot()

  global.beforeEach(function () {
    snapshotRestore()
    if (this.currentTest) {
      currentTest = this.currentTest
    }
  })

  const matchSnapshot = function (m, snapshotName) {
    const ctx = this
    const specName = currentTest.fullTitle()
    const file = currentTest.file
    const exactSpecName = snapshotName

    const exp = getSnapshot({
      file,
      specName,
      exactSpecName,
    })

    try {
      matchDeep.call(ctx, m, exp, { message: 'to match snapshot', chai, setGlobalSnapshot: _.noop })
    } catch (e) {
      if (_.has(e, 'act')) {
        console.log('got act')
        if (process.env['SNAPSHOT_UPDATE']) {

          saveSnapshot({
            file,
            specName,
            exactSpecName,
            what: e.act,
          })

          return
        }
      }

      throw e
    }
  }

  chai.Assertion.addMethod('matchSnapshot', matchSnapshot)
}

module.exports = {
  registerInMocha,
}

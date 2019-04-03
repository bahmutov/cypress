let _ = require('lodash')
let { match } = require('sinon')
let $ = require('jquery')
const jestDiff = require('jest-diff')
const debug = require('debug')('plugin:snapshot')

// window.localStorage.debug = 'spec* plugin:snapshot'

const registerInCypress = () => {
  _ = Cypress._
  $ = Cypress.$
  match = Cypress.sinon.match

  const matchDeepCypress = function (...args) {
    matchDeep.apply(this, [...args, { Cypress }])
  }

  const matchSnapshotCypress = function (m, snapshotName) {
    const ctx = this
    const specName = Cypress.mocha.getRunner().test.fullTitle()
    const file = Cypress.spec.name
    const exactSpecName = snapshotName

    cy.task('getSnapshot', {
      file,
      specName,
      exactSpecName,
    }, { log: false }).then((exp) => {
      try {
        matchDeep.bind(ctx)(m, exp, { message: 'to match snapshot', Cypress })
      } catch (e) {
        if (Cypress.env('SNAPSHOT_UPDATE')) {
          return e.act
        }

        throw e
      }

    })
    .then((act) => {
      cy.task('saveSnapshot', {
        file,
        specName,
        exactSpecName,
        what: act,
      }, { log: false })

    })
  }

  chai.Assertion.addMethod('matchDeep', matchDeepCypress)
  chai.Assertion.addMethod('matchSnapshot', matchSnapshotCypress)

  window.lastActual = 'none'

  before(() => {

    addButton('snapshot-copy-btn', 'fa-copy', () => {
    // eslint-disable-next-line
    console.log('%cCopied to clipboard', 'color:grey')
      // debug(window.lastActual)
      copyToClipboard(stringify(window.lastActual))
    })

    const btn = addButton('toggle-snapshot-update', 'fa-camera', () => {
      const prev = Cypress.env('SNAPSHOT_UPDATE')

      Cypress.env('SNAPSHOT_UPDATE', !prev)

      updateText()
    })

    const btnIcon = btn.children().first()

    const updateText = () => {
      return btnIcon.text(Cypress.env('SNAPSHOT_UPDATE') ? 'snapshot\nupdate\non' : 'snapshot\nupdate\noff')
      .css({ 'font-size': '10px', 'line-height': '0.9' })
      .html(btnIcon.html().replace(/\n/g, '<br/>'))
    }

    updateText()

  })

  after(() => {
    cy.task('snapshotRestore', null, { log: false })
  })

  function copyToClipboard (text) {
    let el = document.createElement('textarea')

    document.body.appendChild(el)
    el.value = text
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }

  const addButton = (name, faClass, fn) => {
    $(`#${name}`, window.top.document).remove()

    const btn = $(`<span id="${name}"><button><i class="fa ${faClass}"></i></button></span>`, window.top.document)
    const container = $(
      '.toggle-auto-scrolling.auto-scrolling-enabled',
      window.top.document
    ).closest('.controls')

    container.prepend(btn)

    btn.on('click', fn)

    return btn
  }

}

const getDiffString = (exp, act) => {
  return jestDiff(exp, act, { callToJSON: true })
  .replace(/Array \[/g, '[')
  .replace(/Object \{/g, '{')
}

const getReplacementFor = (path = [], m) => {
  let found

  path = _.cloneDeep(path)

  _.each(m, (val) => {

    // debug(val[0].join('.'))

    const wildCards = _.keys(_.pickBy(val[0], (value) => {
      return value === '*'
    }))

    path = _.map(path, (value, key) => {
      if (_.includes(wildCards, `${key}`)) {
        return '*'
      }

      return value
    })

    const matched = path.join('.').endsWith(val[0].join('.'))

    // (_.last(path) === _.last(val[0]))
    //    && _.isEqual(_.intersection(path, val[0]), val[0])

    if (matched) {
      found = val[1]
    }
  })

  return found
}

const matchDeep = function (matchers, exp, opts = {}) {
  let m = matchers

  if (exp === undefined) {
    exp = m
    m = {}
  }

  opts = _.defaults(opts, {
    message: 'to match',
    Cypress: false,
    setGlobalSnapshot: (val) => {
      return window.lastActual = val
    },
    diff: true,
  })

  if (!opts.chai) {
    opts.chai = window.chai
  }

  const chai = opts.chai

  const act = this._obj

  m = _.map(m, (val, key) => {
    return [key.split('.'), val]
  })

  const getType = (obj) => {
    return Object.prototype.toString.call(obj).split('[object ').join('').slice(0, -1)
  }

  const formatPath = (path = []) => {
    return `{ ${path.join(' > ')} }`
  }

  const genError = (_path, _exp, _act) => {
    return `${_path ? formatPath(_path) : ''}:\n\texpected ${_exp},\n\tbut was   ${_act}\n`
  }

  const matcherStringToObj = (mes) => {
    const res = mes.replace(/typeOf\("(\w+)"\)/, '$1')

    const ret = {}

    ret.toString = () => {
      return `${res}`
    }

    ret.toJSON = () => {
      return `match.${res}`
    }

    return ret
  }

  const isMatcher = (obj) => {
    if (match.isMatcher(obj)) {
      return obj
    }

    let parseObj = (_.isString(obj) && obj) || (obj && obj.toJSON && obj.toJSON())

    if (parseObj) {
      const parsed = /match\.(.*)/.exec(parseObj)

      if (parsed) {
        // debug('parsed matcher from string:', parsed[1])

        return match[parsed[1]]

      }

      return obj
    }

    return obj
  }

  const errs = []

  let noDiff = false

  const recurse = (_exp, _act, _path = []) => {

    return _.map(_.extend({}, _exp, _act), (_value, key) => {

      const newPath = _path.concat([key])

      if (_path.length > 15) {
        throw new Error(`objects exceed maximum diff depth
          last paths: ${formatPath(newPath)}
          `)
      }

      const setValue = (obj, key, val) => {
        if (_.isObjectLike(obj) && _.hasIn(obj, key)) {

          let setFn = () => {
            return val
          }

          if (_.isFunction(val)) {
            setFn = val
          }

          obj[key] = setFn(obj[key])
        }
      }

      const testValue = (matcher, value) => {

        if (match.isMatcher(value)) {
          if (value.toString() === matcher.toString()) {
            return matcher.toString()
          }
        }

        if (matcher.test(value)) {
          return matcher.toString()
        }

        errs.push(new Error(`replace matcher failed: ${genError(newPath, matcher.toString(), value)}`))

        return false
      }

      let _actValue = _.get(_act, key)
      let _expValue = _.get(_exp, key)
      let passed = true

      // debug('compare:', _actValue, _expValue)

      _expValue = isMatcher(_expValue)
      _actValue = isMatcher(_actValue)

      const replacementVal = getReplacementFor(newPath, m)

      if (newPath.includes('attempts')) debug(newPath)

      if (replacementVal) {
        debug(newPath, m, replacementVal)

        // if (shouldCleanse) {
        //   setValue(_exp, key, replacementVal)
        //   _expValue = _.get(_exp, key)
        // }

        if (match.isMatcher(replacementVal)) {
          passed = !!testValue(replacementVal, _actValue)
          // debug('passed?', !!passed)
        }

        if (passed) {
          setValue(_act, key, replacementVal)
          _actValue = _.get(_act, key)
        }

      }

      if (_expValue && _expValue.toJSON && !match.isMatcher(_expValue)) {
        setValue(_exp, key, _expValue.toJSON())
        _expValue = _.get(_exp, key)
      }

      if (_actValue && _actValue.toJSON && !match.isMatcher(_actValue)) {
        setValue(_act, key, _actValue.toJSON())
        _actValue = _.get(_act, key)
      }

      if (match.isMatcher(_actValue)) {
        setValue(_act, key, matcherStringToObj(_actValue.message))
      }

      if (match.isMatcher(_expValue)) {
        setValue(_exp, key, matcherStringToObj(_expValue.message))
      }

      if (match.isMatcher(_actValue)) {
        if (match.isMatcher(_expValue)) {
          if (_actValue.toString() === _expValue.toString()) {

            return true
          }

          errs.push(new Error(`matchers are not equivalent, ${genError(newPath), _expValue.toString(), _actValue.toString()}`))

          return false
        }

        errs.push(new Error(`strange: expected value was not a matcher, ${genError(newPath, _actValue.toString(), _expValue)}`))

        return _actValue.toString()
      }

      if (match.isMatcher(_expValue)) {
        passed = testValue(_expValue, _actValue)

        return passed
      }

      if (getType(_expValue) === 'Error') {
        setValue(_exp, key, _expValue.toString())
        _expValue = _.get(_exp, key)
      }

      if (getType(_actValue) === 'Error') {
        setValue(_act, key, _actValue.toString())
        _actValue = _.get(_act, key)
      }

      if (getType(_actValue) === 'Function') {
        setValue(_act, key, '[Function]')
        _actValue = _.get(_act, key)
      }

      if (getType(_expValue) !== getType(_actValue)) {
        errs.push(new Error(`no type match, ${genError(newPath, getType(_expValue), getType(_actValue))}`))
      }

      if (_.isObjectLike(_expValue) || _.isObjectLike(_actValue)) {
        return recurse(_expValue, _actValue, newPath)
      }

      if (_.isEqual(_expValue, _actValue)) {
        return true
      }

      errs.push(new Error(`not equal values for ${genError(newPath, _expValue, _actValue)}`))

      // throw new Error('this should never happen')

    })
  }

  if (getType(act) !== getType(exp)) {
    errs.push(new Error(`Objects are not of same type${genError(false, getType(exp), getType(act))}`))
  }

  recurse(exp, act, ['^'])

  const displayMessage = `expected **${chai.util.objDisplay(exp)}** ${opts.message} **${chai.util.objDisplay(act)}**`

  if (errs.length) {

    const omitIndividualErrors = errs.length > 5

    let message = ''

    if (!omitIndividualErrors) {
      const errStrings = errs.join('\n')

      message += errStrings
    }

    if (!noDiff && opts.diff) {
      try {
        message += `\n\n${getDiffString(exp, act)}`
      } catch (e) {
        message += e.message
      }
    }

    opts.setGlobalSnapshot(act)

    const errToThrow = new Error()

    errToThrow.message = message
    errToThrow.act = act

    if (opts.Cypress) {

      opts.Cypress.log({
        name: 'assert',
        message: displayMessage,
        state: 'failed',
        // error: errToThrow,
        consoleProps: () => {
          return {
            Expected: exp,
            Actual: act,
          }
        },
      })
    }

    // try {
    //   this.assert(false, message)
    // } catch (errToThrow)
    //  {

    throw errToThrow
    // }

  }

  this.assert(true, displayMessage)

}

// const MATCHER_STR = '[MATCHES] '

const stringify = (obj_from_json, ind = 0) => {
  ind++

  if (obj_from_json === undefined) {
    return 'undefined'
  }

  if (obj_from_json === null) {
    return 'null'
  }

  if (typeof obj_from_json !== 'object') {
    // not an object, stringify using native function
    // const isObj = _.isString(obj_from_json) && obj_from_json.startsWith(MATCHER_STR)

    // if (_.isString(obj_from_json)) {
    // }

    // if (isObj) {
    //   obj_from_json = obj_from_json.slice(MATCHER_STR.length)

    // }

    let ret = JSON.stringify(obj_from_json)

    // if (isObj) {

    //   ret = `match.${ret.slice(1, -1)}`
    // }

    return ret // `${' '.repeat(ind)}${ret}`

  }

  if (_.isDate(obj_from_json)) {
    return `${JSON.stringify(obj_from_json)}`
  }

  if (obj_from_json.toJSON) {
    return obj_from_json.toJSON()
  }

  if (_.isRegExp(obj_from_json)) {
    return obj_from_json.toString()
  }

  if (_.isArray(obj_from_json)) {
    const props = _.map(obj_from_json,
      (value) => {
        return stringify(value, ind)
      })
    .map((item) => {
      return ' '.repeat(ind) + item
    })
    .join(',\n')

    return `[\n${props}\n${' '.repeat(ind)}]`
  }

  // Implements recursive object serialization according to JSON spec
  // but without quotes around the keys.
  let props = Object
  .keys(obj_from_json)
  .map((key) => {
    const validIdentifier = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/u

    let keyStr = key

    if (!validIdentifier.test(key)) {
      keyStr = `'${key}'`
    }

    return `${keyStr}:${stringify(obj_from_json[key], ind)}`
  })
  .map((item) => {
    return ' '.repeat(ind) + item
  })

  if (props.length) {
    return `{\n${props.join(',\n')}\n${' '.repeat(ind)}}`
  }

  return '{}'

}

module.exports = {
  stringify,
  registerInCypress,
  matchDeep,

}

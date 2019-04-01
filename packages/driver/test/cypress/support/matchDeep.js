const { _ } = Cypress
const { match } = Cypress.sinon
const jestDiff = require('jest-diff')

const getDiffString = (exp, act) => {
  return jestDiff(exp, act, { callToJSON: true })
  .replace(/Array \[/g, '[')
  .replace(/Object \{/g, '{')
}

const getReplacementFor = (path, opts) => {
  let found

  _.each(opts, (val) => {
    const matched = (_.last(path) === _.last(val[0]))
       && _.isEqual(_.intersection(path, val[0]), val[0])

    if (matched) {
      found = val[1]
    }
  })

  return found
}

chai.Assertion.addMethod('matchDeep', function (opts, exp) {
  if (exp === undefined) {
    exp = opts
    opts = {}
  }

  const shouldCleanse = opts.shouldCleanse

  // console.log('shouldcleanse?', shouldCleanse)

  opts = _.omit(opts, 'shouldCleanse')

  opts = _.map(opts, (val, key) => {
    return [key.split('.'), val]
  })

  const act = this._obj

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

  // const replaceVals = (obj, opts) => {
  // console.log('try replace:', obj)
  //   _.each(opts, (val, key) => {
  //     if (_.has(obj, key)) {
  //       let setFn = _.identity

  //       if (_.isFunction(val)) {
  //         setFn = val
  //       }

  // console.log('set val:', key, val)

  //       return _.set(obj, key, setFn(val))
  //     }
  //   })

  //   return obj
  // }

  const errs = []

  let noDiff = false

  const recurse = (_exp, _act, _path = []) => {

    return _.map(_.extend({}, _exp, _act), (_value, key) => {

      const newPath = _path.concat([key])

      // if (_.includes(newPath, 'err')) {
      //   debugger
      // }

      if (_path.length > 8) {
        throw new Error(`objects exceed maximum diff depth
        last paths: ${formatPath(newPath)}
        `)
      }

      // console.log(newPath)

      // if (errs.length > 20) {
      //   noDiff = true

      //   return
      // }

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

      let _actValue = _.get(_act, key)
      let _expValue = _.get(_exp, key)

      const replacementVal = getReplacementFor(newPath, opts)

      // if (newPath.includes('attempts')) console.log(newPath)

      if (replacementVal) {
        // console.log(newPath, opts, replacementVal)

        if (shouldCleanse) {
          setValue(_exp, key, replacementVal)
          _expValue = _.get(_exp, key)
        }

        setValue(_act, key, replacementVal)
        _actValue = _.get(_act, key)
      }

      if (_expValue && _expValue.toJSON && !match.isMatcher(_expValue)) {
        setValue(_exp, key, _expValue.toJSON())
        _expValue = _.get(_exp, key)
      }

      if (_actValue && _actValue.toJSON && !match.isMatcher(_actValue)) {
        setValue(_act, key, _actValue.toJSON())
        _actValue = _.get(_act, key)
      }

      // const replacementKey = getReplacementFor(newPath, opts)

      // if (replacementKey !== undefined) {
      //   _actValue = replacementKey
      //   _act[key] = replacementKey

      if (match.isMatcher(_actValue)) {
        setValue(_act, key, matcherStringToObj(_actValue.message))
        // _act[key] = matcherStringToObj(_actValue.message)
      }
      // }

      if (match.isMatcher(_expValue)) {
        setValue(_exp, key, matcherStringToObj(_expValue.message))
        // _exp[key] = matcherStringToObj(_expValue.message)
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
        if (_expValue.test(_actValue)) {
          return _expValue.toString()
        }

        errs.push(new Error(`matcher failed: ${genError(newPath, _expValue.toString(), _actValue)}`))

        return
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

  if (errs.length) {

    const omitIndividualErrors = errs.length > 4

    let message = ''

    if (!omitIndividualErrors) {
      const errStrings = errs.join('\n')

      message += errStrings
    }

    if (!noDiff) {
      message += `\n\n${getDiffString(exp, act)}`
    }

    window.lastActual = act

    this.assert(false, message)
    // throw errToThrow

  }

  this.assert(true, `expected **${chai.util.objDisplay(exp)}** to match **${chai.util.objDisplay(act)}**`)

})
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

}

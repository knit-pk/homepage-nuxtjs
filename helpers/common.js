import _ from 'lodash'
import qs from 'qs'

/**
 * Removes all falsy props
 * @param {Object} obj
 * @returns {Object}
 */
function removeFalsyProps (obj) {
  return _.pickBy(obj, _.identity)
}

/**
 * Converts object containing resources to array
 * @param {Object} resource
 * @returns {Array<Object>}
 */
function resourceObjToArr (resource, codes) {
  return _.reduce(codes, (acc, code) => (resource[code] ? [...acc, resource[code]] : acc), [])
}

/**
 * Converts resource array to object with { code: resourceItem }
 * @param {Array<Object>} resourceArr
 * @returns {Object}
 */
function resourceArrToObj (resourceArr) {
  return _.reduce(resourceArr, (acc, resource) => _.assign(acc, { [ resource.code ]: resource }), {})
}

/**
 * Returns only specified props
 * and deletes falsy props if corresponding
 * flag is set (one level deep)
 * @param {Array} coll
 * @param {Array} props
 * @param {Boolean} deleteFalsyProps
 * @returns {Array}
 */
function pickItemsProps (coll, props, deleteFalsyProps = false, customPicker = o => o) {
  const reducer = deleteFalsyProps ?
    (acc, item) => [...acc, customPicker(removeFalsyProps(_.pick(item, props)))] :
    (acc, item) => [...acc, customPicker(_.pick(item, props))]

  return _.reduce(coll, reducer, [])
}

/**
 * Stringifies queryObject to queryString
 * @param {Object} [qsObject={}]
 * @returns {String}
 */
function getKnitQs (qsObject = {}) {
  return qs.stringify(qsObject, { arrayFormat: 'brackets' })
}

/**
 * Returns boolean which tells whether env is prod
 * @returns {Boolean}
 */
function isProd () {
  return (process.env.NODE_ENV === 'production')
}

/**
 * Returns name of a current env
 * @returns {String}
 */
function getEnv () {
  return process.env.NODE_ENV
}

export default {
  resourceObjToArr,
  resourceArrToObj,
  pickItemsProps,
  getKnitQs,
  isProd,
  getEnv
}

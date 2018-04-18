import _ from 'lodash'
import qs from 'qs'

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
    (acc, item) => [...acc, customPicker(_.pickBy(_.pick(item, props), _.identity))] :
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
  pickItemsProps,
  getKnitQs,
  isProd,
  getEnv,
}

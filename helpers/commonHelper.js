import _ from 'lodash'
import qs from 'qs'

const commonFilters = {
  propsKeysWithoutExceptionsFilter (exceptions = []) {
    return prop => !_.includes(exceptions, prop)
  }
}

export default {
  /**
   * Checks if uuid passed is valid
   * @param {String} [uuid='']
   * @returns {Boolean}
   */
  isValidUuid (uuid = '') {
    return /[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}/.test(uuid)
  },

  /**
   * Checks if props passed are empty
   * props specified as a second argument are exceptions
   * if actual prop is exception and it's empty function will
   * omit actual prop
   * @param {Object} [propsObject={}]
   * @param {Array<String>} [propsObjectKeysExceptions=[]]
   * @returns
   */
  arePropsEmpty (propsObject = {}, propsObjectKeysExceptions = []) {
    const propsObjectKeys = _.keys(propsObject)
    const propsObjectKeysFiltered = _.filter(propsObjectKeys, commonFilters.propsKeysWithoutExceptionsFilter(propsObjectKeysExceptions))
    const filteredPropsObject = _.pick(propsObject, propsObjectKeysFiltered)
    const filteredProps = _.values(filteredPropsObject)

    return !_.isEmpty(filteredProps) && _.some(filteredProps, _.isEmpty)
  },

  /**
   * Removes all falsy props
   * @param {Object} [object={}]
   * @returns
   */
  removeFalsyProps (object = {}) {
    return _.pickBy(object, _.identity)
  },

  /**
   * Returns only specified props
   * and deletes falsy props if corresponding
   * flag is set (one level deep)
   * @param {any} [collection=[]]
   * @param {any} [props=[]]
   * @param {boolean} [deleteFalsyProps=false]
   * @returns
   */
  pickItemsProps (collection = [], props = [], deleteFalsyProps = false) {
    const reducer = deleteFalsyProps ?
      (coll, item) => [...coll, this.removeFalsyProps(_.pick(item, props))] :
      (coll, item) => [...coll, _.pick(item, props)]

    return _.reduce(collection, reducer, [])
  },

  /**
   * Stringifies queryObject to queryString
   * @param {any} [qsObject={}]
   * @returns
   */
  getKnitQs (qsObject = {}) {
    return qs.stringify(qsObject, { arrayFormat: 'brackets' })
  }
}

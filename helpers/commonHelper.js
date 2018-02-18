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
   * @returns {Object}
   */
  removeFalsyProps (object = {}) {
    return _.pickBy(object, _.identity)
  },

  /**
   * Returns only specified props
   * and deletes falsy props if corresponding
   * flag is set (one level deep)
   * @param {Array} [collection=[]]
   * @param {Array} [props=[]]
   * @param {Boolean} [deleteFalsyProps=false]
   * @returns {Array}
   */
  pickItemsProps (collection = [], props = [], deleteFalsyProps = false, customPicker = o => o) {
    const reducer = deleteFalsyProps ?
      (coll, item) => [...coll, customPicker(this.removeFalsyProps(_.pick(item, props)))] :
      (coll, item) => [...coll, customPicker(_.pick(item, props))]

    return _.reduce(collection, reducer, [])
  },

  /**
   * Returns function which adds beautifier
   * string to all occurences of regex
   * e.g. Add a class to a tag which match the regex
   * @param {Regex} [regex=new RegExp()]
   * @param {String} [beautifier='']
   * @returns {Function}
   */
  beautifyMd (regex = new RegExp(), beautifier = '') {
    return content => _.replace(content, regex, string => `${string} ${beautifier}`)
  },

  /**
   * Stringifies queryObject to queryString
   * @param {Object} [qsObject={}]
   * @returns {String}
   */
  getKnitQs (qsObject = {}) {
    return qs.stringify(qsObject, { arrayFormat: 'brackets' })
  },

  /**
   * Returns boolean which tells whether env is prod
   * @returns {Boolean}
   */
  isProd () {
    return (process.env.ENV === 'prod')
  },

  /**
   * Returns name of a current env
   * @returns {String}
   */
  getEnv () {
    return process.env.ENV
  },

  /**
  * Toggles multiple css classes in multiple css elements
  * @param {Array<HtmlElement>} [elements=[]] - array of html elements
  * @param {Array<String>} [classes=[]] - array of class name strings
  */
  toggleElementsClasses (elements = [], classes = []) {
    _.each(elements, element => { element && element.classList.toggle(...classes) })
  }
}

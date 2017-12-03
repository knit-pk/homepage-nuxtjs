import _ from 'lodash'

const templateReducers = {
  arrayToStrReducer (str, item) {
    return `${str}, ${item}`
  }
}

const urlIdentifiers = ['http', 'https', '/', '.']

export default {
  methods: {
    /**
     * Creates list of comma separated values
     * @param {Array<String>} [array=[]]
     * @returns {String}
     */
    arrayToStringList (array = []) {
      return _.reduce(array, templateReducers.arrayToStrReducer)
    },

    /**
     * Returns string with dots if
     * length of a string is too big
     * @param {String} [string='']
     * @param {Number} [length=3]
     * @returns {String}
     */
    trimString (string = '', length = 3) {
      return (length - 3) >= string.length ? string : `${string.slice(0, length - 3)}...`
    },

    /**
     * Checks if string is url
     * @param {String} [string='']
     * @returns {Boolean}
     */
    isUrl (string = '') {
      return _.isEmpty(string) && _.some(urlIdentifiers, urlIdentifier => _.includes(string, urlIdentifier))
    },

    /**
     * Creates default css Postfix if vueProperty is defined
     * @param {String} [vueProperty='']
     * @param {String} [postfix='']
     * @returns {String}
     */
    defaultCssPostfix (vueProperty = '', postfix = '') {
      return vueProperty ? `--${vueProperty}` : postfix
    },

    /**
     * Formats date specified to localString
     * @param {Date|String} [date=new Date()]
     * @param {String} [locale='pl']
     * @param {String} [format={ month: 'long', day: '2-digit', year: 'numeric' }]
     * @returns {String}
     */
    formatDateToLocalString (date = new Date(), locale = 'pl', format = { month: 'long', day: '2-digit', year: 'numeric' }) {
      if (typeof date === 'string') {
        date = new Date(date)
      }

      return date.toLocaleString(locale, format)
    },
    capitalize: _.capitalize,
    upper: _.toUpper,
    pick: _.pick,
    flow: _.flow,
    every: _.every,
    isEmpty: _.isEmpty,
    isNotEmpty: _.negate(_.isEmpty)
  }
}

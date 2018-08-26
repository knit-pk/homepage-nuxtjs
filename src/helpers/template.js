import _ from 'lodash'

/**
 * Returns string with dots if
 * length of a string is too big
 * @param {String} str
 * @param {Number} [length=3]
 * @returns {String}
 */
function ellipsify (str, length = 3) {
  return (length - 3) >= str.length ? str : `${str.slice(0, length - 3)}...`
}

/**
 * Returns string with dots if length of a string is too big,
 * without: words cut in half, trailing punctuations, etc.
 * @param {String} str
 * @param {Number} [length=3]
 * @returns {String}
 */
function ellipsifyWithoutResidue (str, length = 3) {
  const cutResidueRegex = /[\W\u0080-\u00FF\u0100-\u017F]*\s[\S]*$/
  const slicedStr = str.slice(0, length - 3)
  return (length - 3) >= str.length ? str : `${slicedStr.replace(cutResidueRegex, '...')}`
}

/**
 * Checks if string is url
 * @param {String} [string='']
 * @returns {Boolean}
 */
function isUrl (string = '') {
  const urlIdentifiers = ['http', 'https', '/', '.']
  return _.isEmpty(string) && _.some(urlIdentifiers, urlIdentifier => _.includes(string, urlIdentifier))
}

/**
 * Creates default css Postfix if vueProperty is defined
 * @param {String} [vueProperty='']
 * @param {String} [postfix='']
 * @returns {String}
 */
function defaultCssPostfix (vueProperty = '', postfix = '') {
  return vueProperty ? `--${vueProperty}` : postfix
}

/**
 * Formats date specified to localString
 * @param {Date|String} [date=new Date()]
 * @param {String} [locale='pl']
 * @param {Object} [format={ month: 'long', day: '2-digit', year: 'numeric' }]
 * @returns {String}
 */
function formatDateToLocalString (date = new Date(), locale = 'pl', format = { month: 'long', day: '2-digit', year: 'numeric' }) {
  if (typeof date === 'string') {
    date = new Date(date)
  }

  return date.toLocaleString(locale, format)
}

export default {
  methods: {
    formatDateToLocalString,
    defaultCssPostfix,
    ellipsify,
    ellipsifyWithoutResidue,
    isUrl,
    capitalize: _.capitalize,
    upper: _.toUpper,
    pick: _.pick,
    flow: _.flow,
    every: _.every,
    isEmpty: _.isEmpty,
    join: _.join,
    isNotEmpty: _.negate(_.isEmpty),
  },
}

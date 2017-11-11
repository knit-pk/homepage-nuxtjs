import _ from 'lodash'

const templateReducers = {
  arrayToStrReducer (str, item) {
    return `${str}, ${item}`
  }
}
const urlIdentifiers = ['http', 'https', '/', '.']

export default {
  methods: {
    arrayToStringList (array = []) {
      return _.reduce(array, templateReducers.arrayToStrReducer)
    },
    trimString (string = '', length = 3) {
      return (length - 3) >= string.length ? string : `${string.slice(0, length - 3)}...`
    },
    isUrl (string = '') {
      return !string ? false : _.some(urlIdentifiers, (urlIdentifier) => _.includes(string, urlIdentifier))
    },
    defaultCssPostfix (vueProperty = '', postfix = '') {
      return vueProperty ? `--${vueProperty}` : postfix
    },
    postfixesToCssClasses (baseCssClass = '', postfixes = []) {
      return _.reduce(postfixes, (acc, postfix) => `${acc}${baseCssClass}${postfix} `, '').trim()
    },
    formatDateToLocalString (date, locale = 'pl', format = { month: 'long', day: '2-digit', year: 'numeric' }) {
      return new Date(date).toLocaleString(locale, format)
    },
    isEmpty: _.isEmpty,
    isNotEmpty: _.negate(_.isEmpty)
  }
}

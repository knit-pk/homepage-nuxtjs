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
      return _.isEmpty(string) && _.some(urlIdentifiers, urlIdentifier => _.includes(string, urlIdentifier))
    },

    defaultCssPostfix (vueProperty = '', postfix = '') {
      return vueProperty ? `--${vueProperty}` : postfix
    },

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

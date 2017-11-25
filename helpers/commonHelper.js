import _ from 'lodash'

const commonFilters = {
  propsKeysWithoutExceptionsFilter (exceptions = []) {
    return prop => !_.includes(exceptions, prop)
  }
}

export default {
  isValidUuid (uuid = '') {
    return /[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}/.test(uuid)
  },

  joinRequestPath (path = '', param = '') {
    return _.includes(param, '&') ? `/${path}?${param}` : `/${path}/${param}`
  },

  arePropsEmpty (propsObject = {}, propsObjectKeysExceptions = []) {
    const propsObjectKeys = _.keys(propsObject)
    const propsObjectKeysFiltered = _.filter(propsObjectKeys, commonFilters.propsKeysWithoutExceptionsFilter(propsObjectKeysExceptions))
    const filteredPropsObject = _.pick(propsObject, propsObjectKeysFiltered)
    const filteredProps = _.values(filteredPropsObject)

    return !_.isEmpty(filteredProps) && _.some(filteredProps, _.isEmpty)
  },

  removeFalsyProps (object = {}) {
    return _.pickBy(object, _.identity)
  }
}

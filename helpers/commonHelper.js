import _ from 'lodash'

export default {
  isValidUuid (uuid = '') {
    return /[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}/.test(uuid)
  },
  joinRequestPath (path = '', param = '') {
    return _.includes(param, '&') ? `/${path}?${param}` : `/${path}/${param}`
  }
}

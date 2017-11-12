import Qs from 'qs'

export default class RequestOptions {
  constructor (options = {}) {
    this.params = options.params || {}
    this.headers = options.headers || {}
  }

  addQueryParam (name, value) {
    this.params[name] = value
  }

  addQuerySelection (name, value) {
    if (!Array.isArray(this.params[name])) {
      this.params[name] = [value]
    } else {
      this.params[name].push(value)
    }
  }

  hasQuery () {
    return Object.keys(this.params).length > 0
  }

  getQuery () {
    return Qs.stringify(this.params, { arrayFormat: 'brackets' })
  }

  setHeader (name, value) {
    this.headers[name] = value
  }

  hasHeader (name) {
    return typeof this.headers.name !== 'undefined'
  }

  getHeaders () {
    return this.headers
  }
}

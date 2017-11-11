import Qs from 'qs'

export default class RequestOptions {
  constructor (options = {}) {
    this.useToken = !!options.useToken || false
    this.params = options.params || {}
    this.selections = options.selections || {}
    this.headers = options.headers || {}
  }

  addQueryParam (name, value) {
    this.params[name] = value
  }

  addQuerySelection (name, value) {
    if (!Array.isArray(this.selections.name)) {
      this.selections.name = [value]
    } else {
      this.selections.push(value)
    }
  }

  useToken () {
    return false
  }

  hasQuery () {
    return Object.keys(this.params).length > 0 // || Object.keys(this.selections).length > 0
  }

  getQuery () {
    return Qs.stringify(this.params)
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

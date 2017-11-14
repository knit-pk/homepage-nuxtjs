
// import RequiredAttributeNotFoundException from './errors/RequiredAttributeNotFoundException'
import RequestOptions from './RequestOptions'
import RestrictedMethodException from './errors/RestrictedMethodException'

const ALLOWED_METHODS = [
  'GET',
  'OPTIONS'
]

export default class Client {
  constructor (httpClient, options = {}) {
    this.httpClient = httpClient
    this.entrypoint = options.entrypoint || 'localhost'
    this.mimetype = options.mimetype || 'application/json'
  }

  // private || shall not be used directly
  request (method, uri, options = {}) {
    // Check if method is allowed
    if (ALLOWED_METHODS.indexOf(method.toUpperCase()) === -1) {
      throw new RestrictedMethodException(method, ALLOWED_METHODS)
    }

    const requestOptions = (options instanceof RequestOptions) ? options : new RequestOptions(options)

    if (!requestOptions.hasHeader('Accept')) {
      requestOptions.setHeader('Accept', this.mimetype)
    }

    if (requestOptions.hasQuery()) {
      uri = `${uri}?${requestOptions.getQuery()}`
    }

    const requestConfig = {
      method,
      url: uri,
      headers: requestOptions.getHeaders()
    }

    return this.httpClient.request(requestConfig)
  }

  /**
   * Gets collection
   *
   * @param {string} name collection name
   * @param {*} options
   *
   * @return {Promise}
   */
  getCollection (name, options) {
    return this.request('get', `${this.entrypoint}/${name}`, options)
  }

  /**
   * Gets single page of items
   *
   * @param {string} name collection name
   * @param {number} page
   * @param {number} limit
   * @param {*} options
   *
   * @return {Promise}
   */
  getPage (name, page = 1, limit = 10, options = {}) {
    options.params.page = page
    options.params.limit = limit

    return this.getCollection(name, options)
  }

  /**
   * Gets single item by it's id
   *
   * @param {string} name collection name
   * @param {number} id item id
   * @param {*} options
   *
   * @return {Promise}
   */
  getItem (name, id, options = {}) {
    return this.get(`${this.entrypoint}/${name}/${id}`, options)
  }

  // TODO:
  // createItem (name, item, options = new RequestOptions()) {
  //   const headers = options.useToken() ? { 'Authorization': `Bearer ${this.getAccessToken()}` } : {}
  //   const query = options.count() > 0 ? `?${options.stringify()}` : ''

  //   return this.httpClient.post(`${this.entrypoint}/${name}${query}`, {
  //     body: item,
  //     headers // depends on client configuration
  //   })
  // }

  // updateItem (name, item, options = new RequestOptions()) {
  //   const headers = options.useToken() ? { 'Authorization': `Bearer ${this.getAccessToken()}` } : {}
  //   const query = options.count() > 0 ? `?${options.stringify()}` : ''

  //   if (typeof item.id === 'undefined') {
  //     throw new RequiredAttributeNotFoundException('The id attribute of item, has to be defined, in order to perform update operation.')
  //   }

  //   return this.httpClient.put(`${this.entrypoint}/${name}/${item.id}${query}`, {
  //     body: item,
  //     headers // depends on client configuration
  //   })
  // }

  // deleteItem (name, id, options = new RequestOptions()) {
  //   const headers = options.useToken() ? { 'Authorization': this.getAccessToken() } : {}
  //   const query = options.count() > 0 ? `?${options.stringify()}` : ''

  //   return this.httpClient.delete(`${this.entrypoint}/${name}/${id}${query}`, {
  //     headers // depends on client configuration
  //   })
  // }
}

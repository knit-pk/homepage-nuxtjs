import AccessTokenExpiredException from './errors/AccessTokenExpiredException'
// import RequiredAttributeNotFoundException from './errors/RequiredAttributeNotFoundException'
import RequestOptions from './RequestOptions'

export default class Client {
  constructor (httpClient, entrypoint, options = {}) {
    this.httpClient = httpClient
    this.entrypoint = entrypoint
    this.mimetype = options.mimetype || 'application/json'

    if (typeof options.token !== 'undefined') {
      this.token = options.token
      // else try to load from localStorage
    }

    if (typeof options.refreshToken !== 'undefined') {
      this.refreshToken = options.refreshToken
      // else try to load from localStorage
    }

    if (typeof options.tokenExpiresAt !== 'undefined') {
      this.tokenExpiresAt = options.tokenExpiresAt
      // else try to load from localStorage
    }
  }

  hasTokenExpired () {
    return typeof this.token === 'undefined' || typeof this.tokenExpiresAt === 'undefined' // || time() > this.tokenExpiresAt
  }

  // authorize (credentials) {
  //   this.httpClient.post(`${this.entrypoint}/token`, {
  //     formData: credentials
  //   }).then({response})
  //   // ..some logic to set returned token to local storage, get expired at time, save refresh token etc.
  //   // preferably it would be another class that would handle Token actions, but it could be in this client for now
  // }

  // refreshToken (refreshToken) {
  //   // check if refresh token exists..

  //   this.httpClient.post(`${this.entrypoint}/token/refresh`, {
  //     body: {
  //       refreshToken
  //     }
  //   }).then({response})
  //   // ..some logic to set returned token to local storage, get expired at time, save refresh token etc.
  //   // preferably it would be another class that would handle Token actions, but it could be in this client for now
  // }

  getAccessToken () {
    if (this.hasTokenExpired()) {
      throw new AccessTokenExpiredException()
      // or implement refreshToken
    }

    return this.token
  }

  get (uri, options = {}) {
    const requestOptions = (options instanceof RequestOptions) ? options : new RequestOptions(options)

    if (!requestOptions.hasHeader('Accept')) {
      requestOptions.setHeader('Accept', this.mimetype)
    }

    if (requestOptions.hasQuery()) {
      uri = `${uri}?${requestOptions.getQuery()}`
    }

    return this.httpClient.get(uri, {
      headers: requestOptions.getHeaders()
    })
  }

  getPage (name, page = 1, limit = 10, options = {}) {
    options.params.page = page
    options.params.limit = limit

    return this.get(`${this.entrypoint}/${name}`, options)
  }

  getItem (name, id, options = {}) {
    return this.get(`${this.entrypoint}/${name}/${id}`, options)
  }

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

import AccessTokenExpiredException from './errors/AccessTokenExpiredException'

/**
 * @todo not yet finished
 */

export default class Auth {
  constructor (httpClient, options = {}) {
    this.httpClient = httpClient
    this.entrypoint = options.entrypoint || 'localhost'

    if (typeof options.accessToken !== 'undefined') {
      this.accessToken = options.accessToken
      // else try to load from localStorage
    }

    if (typeof options.refreshToken !== 'undefined') {
      this.refreshToken = options.refreshToken
      // else try to load from localStorage
    }

    if (typeof options.accessTokenExpiresAt !== 'undefined') {
      this.accessTokenExpiresAt = options.accessTokenExpiresAt
      // else try to load from localStorage
    }
  }

  hasAccessTokenExpired () {
    return typeof this.accessToken === 'undefined' || typeof this.accessTokenExpiresAt === 'undefined' // || time() > this.tokenExpiresAt
  }

  hasRefreshToken () {
    return typeof this.refreshToken !== 'undefined'
  }

  getAccessToken () {
    if (this.hasAccessTokenExpired() && !this.hasRefreshToken()) {
      throw new AccessTokenExpiredException()
    }

    return this.accessToken
  }

  // authorize (credentials) {
  //   this.httpClient.post(`${this.entrypoint}/token`, {
  //     formData: credentials
  //   }).then(response => {
  //     console.debug('Success auth')
  //     console.log(response)
  //   }).catch(e => {
  //     console.error(e.message)
  //   })
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
}

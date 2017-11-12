export default class AccessTokenExpiredException extends Error {
  constructor () {
    super('Access token has either expired or has not been set.')
  }
}

import commonHelper from '~/helpers/common'
import _ from 'lodash'

const endpoint = process.env.API_URL
const mimetype = 'application/ld+json'

// @TODO: Use graphql instead of this service
export default {
  /**
   * Returns collection or it's part based on qsObject
   * @param {Object} [httpClient={}]
   * @param {String} [collName='']
   * @param {Object} [qsObject={}]
   * @param {Object} [httpOptions={}]
   * @returns {Promise}
   */
  getCollection (httpClient = {}, collName = '', qsObject = {}, httpOptions = {}) {
    const queryString = commonHelper.getKnitQs(qsObject)
    const requestPath = `${endpoint}/${collName}?${queryString}`
    const finalHttpOptions = this.getHttpOptions(httpOptions)

    return httpClient.$get(requestPath, finalHttpOptions)
  },

  /**
   * Returns collectionItem which matches queryObject
   * @param {Object} [httpClient={}]
   * @param {String} [collName='']
   * @param {Object} [qsObject={}]
   * @param {Object} [httpOptions={}]
   * @returns {Promise}
   */
  getItem (httpClient = {}, collName = '', qsObject = {}, httpOptions = {}) {
    const queryString = commonHelper.getKnitQs(qsObject)
    const requestPath = `${endpoint}/${collName}?${queryString}`
    const finalHttpOptions = this.getHttpOptions(httpOptions)

    return httpClient.$get(requestPath, finalHttpOptions).then(items => items[0])
  },

  /**
   * Returns collectionItem which matches id
   * @param {Object} [httpClient={}]
   * @param {String} [collName='']
   * @param {String} [id='']
   * @param {Object} [httpOptions={}]
   * @returns {Promise}
   */
  getItemById (httpClient = {}, collName = '', id = '', httpOptions = {}) {
    const requestPath = `${endpoint}/${collName}/${id}`
    const finalHttpOptions = this.getHttpOptions(httpOptions)

    return httpClient.$get(requestPath, finalHttpOptions)
  },

  /**
   * Returns tokens if credentials are correct
   * @param {Object} [httpClient={}]
   * @param {Object} [credentials={}]
   * @returns {Promise}
   */
  getToken (httpClient = {}, credentials = {}) {
    return httpClient.$post('/token', credentials)
  },

  /**
   * Returns httpOptions which
   * are mix of defaults and passed ones
   * @param {Object} [httpOptions={}]
   * @returns {Object}
   */
  getHttpOptions (httpOptions = {}) {
    const headers = _.assign({}, { Accept: mimetype }, httpOptions.headers || {})
    const finalHttpOptions = _.assign({}, { headers })

    return finalHttpOptions
  }
}

import commonHelper from '~/helpers/commonHelper.js'
import http from '~/plugins/http-common.js'
import qs from 'qs'
import _ from 'lodash'

export default {
  get http () {
    return http
  },
  authorize (creds = {}) {
    if (_.some(_.values(creds), _.isEmpty)) {
      return Promise.reject(new Error(`Wrong credentials: ${_.isEmpty(creds.username) ? 'Username cannot be empty' : 'Password cannot be empty'}`))
    }
    return this.http('/token', creds)
  },
  getCollection (collName = '', qsObject = {}, httpOptions = {}) {
    if (_.isEmpty(collName)) {
      return Promise.reject(new Error('#getCollection: Collection name should not be empty string'))
    }
    const queryString = qs.stringify(_.assign({ limit: 10, offset: 0 }, qsObject), { arrayFormat: 'brackets' })
    return this.http.get(commonHelper.joinRequestPath(collName, queryString), httpOptions)
  },
  getCollectionItem (collName = '', id = '', httpOptions = {}) {
    if (_.some([collName, id], _.isEmpty)) {
      return Promise.reject(new Error('#getCollectionItem: Both collection name and id should not be empty'))
    } else if (!commonHelper.isValidUuid()) {
      return Promise.reject(new Error(`#getCollectionItem: Invalid uuid for a collection: ${collName}`))
    }
    return this.http.get(commonHelper.joinRequestPath(collName, id), httpOptions)
  },
  updateCollectionItem (collName = '', id = '', item = {}, httpOptions = {}) {
    if (_.some([collName, id, item], _.isEmpty)) {
      return Promise.reject(new Error('#updateCollectionItem: Collection name, id, item should not be empty'))
    } else if (!commonHelper.isValidUuid()) {
      return Promise.reject(new Error(`#updateCollectionItem: Invalid uuid for a collection: ${collName}`))
    }
    return this.http.put(commonHelper.joinRequestPath(collName, id), item, httpOptions)
  },
  postCollectionItem (collName = '', item = {}, httpOptions = {}) {
    if (_.some([collName, item], _.isEmpty)) {
      return Promise.reject(new Error('#updateCollectionItem: Collection name, item should not be empty'))
    }
    return this.http.post(collName, item, httpOptions)
  },
  removeCollectionItem (collName = '', id = '', httpOptions = {}) {
    if (_.some([collName, id], _.isEmpty)) {
      return Promise.reject(new Error('#removeCollectionItem: Both collection name and id should not be empty'))
    } else if (!commonHelper.isValidUuid()) {
      return Promise.reject(new Error(`#removeCollectionItem: Invalid uuid for a collection: ${collName}`))
    }
    return this.http.delete(commonHelper.joinRequestPath(collName, id))
  }
}

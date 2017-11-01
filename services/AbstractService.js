export default class AbstractService {
  constructor (http) {
    this.http = http
  }
  paramCompose (path = '', param = '') {
    return `${path}${(param && `/${param}`)}`
  }
  qsCompose (path = '', query = '') {
    return `${path}${(query && `?${query}`)}`
  }
  qsTrimAmpersand (query = '') {
    return query.slice(0, query.lastIndexOf('&'))
  }
  qsFromArray (array = [], key = '') {
    const query = array.reduce((qs, val) => qs + `${this.qsFromKVPair(key, val)}&`, '')
    return this.qsTrimAmpersand(query)
  }
  qsFromQsPair (lqs = '', pqs = '') {
    return (lqs && pqs) ? `${lqs}&${pqs}` : (lqs || pqs)
  }
  qsFromKVPair (key = '', val = '') {
    return (key && val) ? `${key}=${val}` : ''
  }
  qsFromObject (object = {}) {
    const keys = Object.keys(object)
    let currVal = null
    let currKey = null
    let query = ''

    for (let iterator = 0; iterator < keys.length; ++iterator) {
      currKey = keys[iterator]
      currVal = object[currKey]
      query += `${Array.isArray(currVal) ? this.qsFromArray(currVal, currKey) : this.qsFromKVPair(currKey, currVal)}&`
    }

    return this.qsTrimAmpersand(query)
  }
  qsConcat (...qsArray) {
    return qsArray.reduce((lqs, pqs) => this.qsFromQsPair(lqs, pqs), '')
  }
  squashError () {}
  sendError () {}
}

import _ from 'lodash'

export default {
  /**
   * Commits multiple mutations
   * @param {Array} [commitArray=[]]
   * @param {Function} [commit=() => {}]
   */
  commitMultiple (commitArray = [], commit = () => {}) {
    _.each(commitArray, commitItem => commit(commitItem))
  },

  /**
   * Creates mutation function
   * if payloadName is passed then payload property's name is the same as payloadName
   * else payload property's name is taken from payload
   * @param {string} [type='']
   * @param {string} [payloadName='']
   * @returns {Function} - function which binds to type and mutates state
   */
  createMutationFn (type = '', payloadName = '') {
    return _.isEmpty(payloadName) ?
      (payload) => ({ type, ...payload }) :
      (payload) => ({ type, [payloadName]: payload })
  }
}

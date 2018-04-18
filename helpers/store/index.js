import composer from './composer'
import opus from './opus'
import _ from 'lodash'

/**
 * Commits multiple mutations
 * @param {Function} commit
 * @param {Array} commitArray
 */
function commitMultiple (commit, commitArray) {
  _.each(commitArray, commitItem => commit(commitItem))
}

/**
 * Creates mutation function
 * if payloadName is passed then payload property's name is the same as payloadName
 * else payload property's name is taken from payload
 * @param {String} type
 * @param {String} [payloadName='']
 * @returns {Function} - function which binds to type and mutates state
 */
function createMutationFn (type, payloadName = '') {
  return _.isEmpty(payloadName) ?
    (payload) => ({ type, ...payload }) :
    (payload) => ({ type, [payloadName]: payload })
}

/**
 * Dispatches multiple actions
 * @param {Function} dispatch - Dispatch function
 * @param {Array} actionArray- Array of actions
 */
function dispatchMultiple (dispatch, actionArray) {
  _.each(actionArray, action => dispatch(action))
}

export default {
  createMutationFn,
  dispatchMultiple,
  commitMultiple,
  opera: {
    composer,
    opus,
  },
}

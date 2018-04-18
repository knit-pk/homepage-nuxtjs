import storeHelper from '~/helpers/store'
import knitLogger from '~/config/logger'
import _ from 'lodash'

// Mutation types
const types = {
  INJECT_RESOURCE: 'INJECT_RESOURCE',
}

// Mutation functions
const injection = storeHelper.createMutationFn(types.INJECT_RESOURCE)

// Module getters
export const getters = {
  articles: state => state.articles,
}

// Module state
export const state = () => ({
  articles: {},
})

export const actions = {
  injectResource ({ commit }, params) {
    // Get data codes
    const codes = _.keys(params.data)

    // Commit injection
    commit(injection(params))

    // Log injection
    knitLogger.debug(() => `Data: ${JSON.stringify(params.data)} is injected to: '${params.path}'`)

    // Return those codes
    return codes
  },
}

export const mutations = {
  [types.INJECT_RESOURCE] (state, payload) {
    state[payload.path] = {
      ...state[payload.path],
      ...payload.data,
    }
  },
}

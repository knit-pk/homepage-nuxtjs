import storeHelper from '~/helpers/store'
import knitLogger from '~/config/logger'

// Mutation types
const types = {
  RESS_CHANGED: 'RESS_CHANGED'
}

// Mutation functions
const changeRess = storeHelper.createMutationFn(types.RESS_CHANGED, 'isMobile')

// Module getters
export const getters = {
  isMobile: state => state.isMobile
}

// Module state
export const state = () => ({
  isMobile: false
})

// Module actions
export const actions = {
  applyRess ({ commit, state }, ress) {
    if (state.isMobile !== ress) {
      knitLogger.debug(() => `Ress is changed to: ${ress ? 'mobile' : 'desktop'}`)
      commit(changeRess(ress))
    }
  }
}

export const mutations = {
  [ types.RESS_CHANGED ] (state, payload) {
    state.isMobile = payload.isMobile
  }
}

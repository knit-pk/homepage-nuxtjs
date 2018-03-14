import { RESS_CHANGED } from './mutation-types'
import storeHelper from '~/helpers/storeHelper'
import knitLogger from '~/config/logger'

const changeRess = storeHelper.createMutationFn(RESS_CHANGED, 'isMobile')

export const getters = {
  isMobile: state => state.isMobile
}

export const state = () => ({
  isMobile: false
})

export const actions = {
  applyRess ({ commit, state }, ress) {
    if (state.isMobile !== ress) {
      knitLogger.debug(`Ress is changed to: ${ress ? 'mobile' : 'desktop'}`)
      commit(changeRess(ress))
    }
  }
}

export const mutations = {
  [RESS_CHANGED] (state, payload) {
    state.isMobile = payload.isMobile
  }
}

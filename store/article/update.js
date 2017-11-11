import SubmissionError from '~/errors/SubmissionError'
import fetch from '~/services/KnitApi/fetch'
import {
  ARTICLE_UPDATE_RESET,
  ARTICLE_UPDATE_UPDATE_ERROR,
  ARTICLE_UPDATE_UPDATE_LOADING,
  ARTICLE_UPDATE_UPDATE_SUCCESS,
  ARTICLE_UPDATE_RETRIEVE_ERROR,
  ARTICLE_UPDATE_RETRIEVE_LOADING,
  ARTICLE_UPDATE_RETRIEVE_SUCCESS,
  ARTICLE_UPDATE_UPDATE_VIOLATIONS
} from './mutation-types'

function state () {
  return {
    loading: false,
    retrieveError: '',
    retrieveLoading: false,
    retrieved: null,
    updated: null,
    updateError: '',
    updateLoading: false,
    violations: null
  }
}

function retrieveError (retrieveError) {
  return {type: ARTICLE_UPDATE_RETRIEVE_ERROR, retrieveError}
}

function retrieveLoading (retrieveLoading) {
  return {type: ARTICLE_UPDATE_RETRIEVE_LOADING, retrieveLoading}
}

function retrieveSuccess (retrieved) {
  return {type: ARTICLE_UPDATE_RETRIEVE_SUCCESS, retrieved}
}

function updateError (updateError) {
  return {type: ARTICLE_UPDATE_UPDATE_ERROR, updateError}
}

function updateLoading (updateLoading) {
  return {type: ARTICLE_UPDATE_UPDATE_LOADING, updateLoading}
}

function updateSuccess (updated) {
  return {type: ARTICLE_UPDATE_UPDATE_SUCCESS, updated}
}

function violations (violations) {
  return {type: ARTICLE_UPDATE_UPDATE_VIOLATIONS, violations}
}

function reset () {
  return {type: ARTICLE_UPDATE_RESET}
}

const getters = {
  loading: state => state.loading,
  retrieveError: state => state.retrieveError,
  retrieveLoading: state => state.retrieveLoading,
  retrieved: state => state.retrieved,
  updated: state => state.updated,
  updateError: state => state.updateError,
  updateLoading: state => state.updateLoading,
  violations: state => state.violations
}

const actions = {
  retrieve ({ commit }, id) {
    commit(retrieveLoading(true))

    return fetch(id)
      .then(response => response.json())
      .then(data => {
        commit(retrieveLoading(false))
        commit(retrieveSuccess(data))
      })
      .catch(e => {
        commit(retrieveLoading(false))
        commit(retrieveError(e.message))
      })
  },
  update ({ commit, state }, { item, values }) {
    commit(updateError(null))
    commit(updateLoading(true))

    return fetch(item['@id'], {
      method: 'PUT',
      headers: new Headers({'Content-Type': 'application/ld+json'}),
      body: JSON.stringify(values)
    }
    )
      .then(response => response.json())
      .then(data => {
        commit(updateLoading(false))
        commit(updateSuccess(data))
      })
      .catch(e => {
        commit(updateLoading(false))

        if (e instanceof SubmissionError) {
          commit(violations(e.errors))
          commit(updateError(e.errors._error))
          return
        }

        commit(updateError(e.message))
      })
  },
  reset ({ commit }) {
    commit(reset())
  }
}

const mutations = {
  [ARTICLE_UPDATE_RETRIEVE_ERROR] (state, payload) {
    state.retrieveError = payload.retrieveError
  },
  [ARTICLE_UPDATE_RETRIEVE_LOADING] (state, payload) {
    state.retrieveLoading = payload.retrieveLoading
  },
  [ARTICLE_UPDATE_RETRIEVE_SUCCESS] (state, payload) {
    state.retrieved = payload.retrieved
  },
  [ARTICLE_UPDATE_UPDATE_LOADING] (state, payload) {
    state.updateLoading = payload.loading
  },
  [ARTICLE_UPDATE_UPDATE_ERROR] (state, payload) {
    state.updateError = payload.updateError
  },
  [ARTICLE_UPDATE_UPDATE_SUCCESS] (state, payload) {
    state.updated = payload.updated
    state.violations = null
  },
  [ARTICLE_UPDATE_UPDATE_VIOLATIONS] (state, payload) {
    state.violations = payload.violations
  },
  [ARTICLE_UPDATE_RESET] (state) {
    state.loading = false
    state.retrieveError = ''
    state.retrieveLoading = false
    state.retrieved = null
    state.updated = null
    state.updateError = ''
    state.updateLoading = false
    state.violations = null
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

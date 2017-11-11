import SubmissionError from '~/errors/SubmissionError'
import fetch from '~/services/KnitApi/fetch'
import {
  ARTICLE_CREATE_ERROR,
  ARTICLE_CREATE_LOADING,
  ARTICLE_CREATE_SUCCESS,
  ARTICLE_CREATE_VIOLATIONS,
  ARTICLE_CREATE_RESET
} from './mutation-types'

function state () {
  return {
    loading: false,
    error: '',
    created: null
  }
}

function error (error) {
  return {type: ARTICLE_CREATE_ERROR, error}
}

function loading (loading) {
  return {type: ARTICLE_CREATE_LOADING, loading}
}

function success (created) {
  return {type: ARTICLE_CREATE_SUCCESS, created}
}

function violations (violations) {
  return {type: ARTICLE_CREATE_VIOLATIONS, violations}
}

function reset () {
  return {type: ARTICLE_CREATE_RESET}
}

const getters = {
  created: state => state.created,
  error: state => state.error,
  loading: state => state.loading,
  violations: state => state.violations
}

const actions = {
  create ({ commit }, values) {
    commit(loading(true))

    return fetch('/articles', {method: 'POST', body: JSON.stringify(values)})
      .then(response => {
        commit(loading(false))

        return response.json()
      })
      .then(data => {
        commit(success(data))
      })
      .catch(e => {
        commit(loading(false))

        if (e instanceof SubmissionError) {
          commit(violations(e.errors))
          commit(error(e.errors._error))
          return
        }

        commit(error(e.message))
      })
  },
  reset ({ commit }) {
    commit(reset())
  }
}

const mutations = {
  [ARTICLE_CREATE_ERROR] (state, payload) {
    state.error = payload.error
  },
  [ARTICLE_CREATE_LOADING] (state, payload) {
    state.loading = payload.loading
  },
  [ARTICLE_CREATE_SUCCESS] (state, payload) {
    state.created = payload.created
  },
  [ARTICLE_CREATE_VIOLATIONS] (state, payload) {
    state.violations = payload.violations
  },
  [ARTICLE_CREATE_RESET] (state) {
    state.loading = false
    state.error = ''
    state.created = null
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

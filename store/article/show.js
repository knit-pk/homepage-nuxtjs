import fetch from '~/services/KnitApi/fetch'
import {
  ARTICLE_SHOW_ERROR,
  ARTICLE_SHOW_LOADING,
  ARTICLE_SHOW_RETRIEVED_SUCCESS,
  ARTICLE_SHOW_RESET
} from './mutation-types'

function state () {
  return {
    loading: false,
    error: '',
    retrieved: null
  }
}

function error (error) {
  return {type: ARTICLE_SHOW_ERROR, error}
}

function loading (loading) {
  return {type: ARTICLE_SHOW_LOADING, loading}
}

function retrieved (retrieved) {
  return {type: ARTICLE_SHOW_RETRIEVED_SUCCESS, retrieved}
}

function reset () {
  return {type: ARTICLE_SHOW_RESET}
}

const getters = {
  error: state => state.error,
  loading: state => state.loading,
  item: state => state.retrieved
}

const actions = {
  retrieve ({ commit }, id) {
    commit(loading(true))

    return fetch(id)
      .then(response => response.json())
      .then(data => {
        commit(loading(false))
        commit(retrieved(data))
      })
      .catch(e => {
        commit(loading(false))
        commit(error(e.message))
      })
  },
  reset ({ commit }) {
    commit(reset())
  }
}

const mutations = {
  [ARTICLE_SHOW_ERROR] (state, payload) {
    state.error = payload.error
  },
  [ARTICLE_SHOW_LOADING] (state, payload) {
    state.loading = payload.loading
  },
  [ARTICLE_SHOW_RETRIEVED_SUCCESS] (state, payload) {
    state.retrieved = payload.retrieved
  },
  [ARTICLE_SHOW_RESET] (state) {
    state.retrieved = null
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

import Client from '~/services/KnitApi/Client'
import {API_HOST} from '~/config/api'
import axios from 'axios'

import {
  ARTICLE_SHOW_ERROR,
  ARTICLE_SHOW_LOADING,
  ARTICLE_SHOW_RETRIEVED_SUCCESS,
  ARTICLE_SHOW_RESET
} from './mutation-types'

const client = new Client(axios, API_HOST, { mimetype: 'application/ld+json' })

export const state = () => ({
  loading: false,
  error: '',
  retrieved: null
})

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

export const getters = {
  error: state => state.error,
  loading: state => state.loading,
  item: state => state.retrieved
}

export const actions = {
  retrieve ({ commit }, id) {
    commit(loading(true))

    return client.getItem('articles', id).then(response => {
      console.debug(`Get article id: ${id}`)
      console.debug(response)
      return response
    }).then(response => {
      commit(loading(false))
      commit(retrieved(response.data))
    }).catch(e => {
      commit(loading(false))
      commit(error(e.message))
    })
  },
  reset ({ commit }) {
    commit(reset())
  }
}

export const mutations = {
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

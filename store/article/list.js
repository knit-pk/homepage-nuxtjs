import fetch from '~/services/KnitApi/fetch'
import {
  ARTICLE_LIST_ERROR,
  ARTICLE_LIST_LOADING,
  ARTICLE_LIST_RESET,
  ARTICLE_LIST_VIEW,
  ARTICLE_LIST_SUCCESS
} from './mutation-types'

export const state = () => ({
  loading: false,
  error: '',
  items: [],
  view: []
})

function error (error) {
  return { type: ARTICLE_LIST_ERROR, error }
}

function loading (loading) {
  return { type: ARTICLE_LIST_LOADING, loading }
}

function success (items) {
  return { type: ARTICLE_LIST_SUCCESS, items }
}

function view (items) {
  return { type: ARTICLE_LIST_VIEW, items }
}

export const getters = {
  error: state => state.error,
  items: state => state.items,
  loading: state => state.loading,
  view: state => state.view
}

export const actions = {
  getItems ({ commit }, page = '/articles') {
    commit(loading(true))

    fetch(page)
      .then(response => response.json())
      .then(data => {
        commit(loading(false))
        commit(success(data['hydra:member']))
        commit(view(data['hydra:view']))
      })
      .catch(e => {
        commit(loading(false))
        commit(error(e.message))
      })
  }
}

export const mutations = {
  [ARTICLE_LIST_ERROR] (state, payload) {
    state.error = payload.error
  },
  [ARTICLE_LIST_LOADING] (state, payload) {
    state.loading = payload.loading
  },
  [ARTICLE_LIST_VIEW] (state, payload) {
    state.view = payload.items
  },
  [ARTICLE_LIST_SUCCESS] (state, payload) {
    state.items = payload.items
  },
  [ARTICLE_LIST_RESET] (state) {
    state.items = []
  }
}

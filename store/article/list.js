import { KnitApiClient } from '~/services'

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
  view: [],
  page: 1,
  perPage: 3,
  totalItems: 0
})

function error (error) {
  return { type: ARTICLE_LIST_ERROR, error }
}

function loading (loading) {
  return { type: ARTICLE_LIST_LOADING, loading }
}

function success (items, page, totalItems) {
  return { type: ARTICLE_LIST_SUCCESS, items, page, totalItems }
}

function view (view) {
  return { type: ARTICLE_LIST_VIEW, view }
}

export const getters = {
  error: state => state.error,
  items: state => state.items,
  loading: state => state.loading,
  view: state => state.view,
  page: state => state.page,
  perPage: state => state.perPage,
  totalItems: state => state.totalItems
}

export const actions = {
  getItems ({ commit, state }, page = 1) {
    commit(loading(true))

    return KnitApiClient.getPage('articles', page, state.perPage, {
      params: {
        group: ['UserReadLess', 'TagRead', 'CategoryRead']
      }
    }).then(response => {
      console.debug(`Get articles`)
      console.debug(response)
      return response
    }).then(response => {
      commit(loading(false))
      commit(success(response.data['hydra:member'], page, response.data['hydra:totalItems']))
      commit(view(response.data['hydra:view']))
    }).catch(e => {
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
    if ((state.loading = payload.loading) === true) {
      state.error = ''
    }
  },
  [ARTICLE_LIST_VIEW] (state, payload) {
    state.view = payload.view
  },
  [ARTICLE_LIST_SUCCESS] (state, payload) {
    state.items = payload.items
    state.page = payload.page
    state.totalItems = payload.totalItems
  },
  [ARTICLE_LIST_RESET] (state) {
    state.items = []
  }
}

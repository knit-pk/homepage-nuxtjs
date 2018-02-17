import {
  ARTICLE_LIST_RETRIEVED_SUCCESS,
  ARTICLE_LIST_UPDATE_PAGES_MAP,
  ARTICLE_LIST_RETRIEVED_ERROR,
  ARTICLE_LIST_STATUS
} from './mutation-types'
import commonHelper from '~/helpers/commonHelper'
import knitService from '~/services/knitService'
import storeHelper from '~/helpers/storeHelper'
import knitLogger from '~/config/logger'
import settings from './settings'
import _ from 'lodash'

const updatePagesMap = storeHelper.createMutationFn(ARTICLE_LIST_UPDATE_PAGES_MAP, 'pagesMap')
const error = storeHelper.createMutationFn(ARTICLE_LIST_RETRIEVED_ERROR, 'error')
const changeStatus = storeHelper.createMutationFn(ARTICLE_LIST_STATUS, 'status')
const success = storeHelper.createMutationFn(ARTICLE_LIST_RETRIEVED_SUCCESS)

export const getters = {
  loading: state => state.status === 'loading',
  totalItems: state => state.totalItems,
  articles: state => state.articles[state.currentListCode],
  pagesMap: state => state.pagesMap,
  status: state => state.status,
  error: state => state.error,
  limit: state => state.limit,
  page: state => state.page,
  isNext: state => !!(state.pagesMap['hydra:next']) || false,
  listCode: state => state.currentListCode,
  listName: state => state.currentListCode
}

export const state = () => ({
  limit: settings.defaultQsObject.limit,
  status: 'idle',
  totalItems: 10,
  articles: {},
  pagesMap: {},
  error: '',
  page: 1,
  currentListCode: ''
})

export const actions = {
  getArticleList ({ commit, state }, params = {}) {
    // When we are on a homepage or a 'wszystkie' list, we don't need to pass category.code
    if (params['category.code'] && params['category.code'] === 'wszystkie') {
      delete params['category.code']
    }
    const page = params.page || 1
    const categoryCode = params['category.code'] || null
    const qsObject = _.assign(params, settings.defaultQsObject)
    if (page === 1 && Object.keys(state.articles).length) {
      let articlesLength
      if (categoryCode) {
        articlesLength = Object.keys(state.articles[categoryCode]).length
      } else if (state.articles['wszystkie']) {
        articlesLength = Object.keys(state.articles['wszystkie']).length
      }
      if (articlesLength && (articlesLength >= state.limit || articlesLength === state.totalItems)) {
        knitLogger.debug(`Sufficient data, no request for main articles list required`)
        return
      }
    }
    commit(changeStatus('loading'))
    return knitService.getCollection(this.$axios, 'articles', qsObject)
      .then(data => {
        const articlesData = data['hydra:member']
        const totalItems = data['hydra:totalItems']
        const pagesMap = data['hydra:view']
        const articles = commonHelper.pickItemsProps(articlesData, settings.props, true, settings.datePicker)

        knitLogger.debug(`Main articles list fetched successfully: data ${data}`)

        storeHelper.commitMultiple([
          success({ articles, page, totalItems, categoryCode }),
          changeStatus('success'),
          updatePagesMap(pagesMap)
        ])
      })
      .catch(err => {
        knitLogger.debug(`Error occurred while trying to fetch main articles list: ${err}`)
        storeHelper.commitMultiple(commit, [ error(err), changeStatus('error') ])
      })
  }
}

export const mutations = {
  [ARTICLE_LIST_RETRIEVED_SUCCESS] (state, payload) {
    state.totalItems = payload.totalItems
    if (payload.categoryCode) {
      state.currentListCode = payload.categoryCode
      state.currentListName = payload.categoryCode
      state.articles[payload.categoryCode] = {...state.articles[payload.categoryCode], ...payload.articles}
    } else {
      state.currentListCode = 'wszystkie'
      state.currentListName = 'wszystkie'
      state.articles['wszystkie'] = {...state.articles['wszystkie'], ...payload.articles}
    }
    // state.articles = {...state.articles, ...payload.articles}
    state.page = payload.page
  },

  [ARTICLE_LIST_RETRIEVED_ERROR] (state, payload) {
    state.error = payload.error
  },

  [ARTICLE_LIST_STATUS] (state, payload) {
    state.status = payload.status
    state.error = state.status === 'loading' ? '' : state.error
  },

  [ARTICLE_LIST_UPDATE_PAGES_MAP] (state, payload) {
    state.pagesMap = payload.pagesMap
  }
}

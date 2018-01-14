import { ARTICLE_LIST_RETRIEVED_SUCCESS, ARTICLE_LIST_UPDATE_PAGES_MAP, ARTICLE_LIST_RETRIEVED_ERROR, ARTICLE_LIST_STATUS } from './mutation-types'
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
  articles: state => state.articles,
  pagesMap: state => state.pagesMap,
  status: state => state.status,
  error: state => state.error,
  limit: state => state.limit,
  page: state => state.page
}

export const state = () => ({
  limit: settings.defaultQsObject.limit,
  status: 'idle',
  totalItems: 10,
  articles: [],
  pagesMap: {},
  error: '',
  page: 1
})

export const actions = {
  getArticleList ({ commit, state }, params = {}) {
    const page = params.page || 1
    const articlesLength = state.articles.length

    if ((page === 1 && articlesLength >= state.limit) || (articlesLength >= state.totalItems)) {
      knitLogger.debug(`Sufficient data, no request for main articles list required`)
      return
    }

    commit(changeStatus('loading'))
    const qsObject = _.assign({ page }, settings.defaultQsObject)

    return knitService.getCollection(this.$axios, 'articles', qsObject)
      .then(data => {
        const articlesData = data['hydra:member']
        const totalItems = data['hydra:totalItems']
        const pagesMap = data['hydra:view']
        const articles = commonHelper.pickItemsProps(articlesData, settings.props, true, settings.datePicker)

        knitLogger.debug(`Main articles list fetched successfully: data ${data}`)

        storeHelper.commitMultiple([
          success({ articles, page, totalItems }),
          changeStatus('success'),
          updatePagesMap(pagesMap)
        ], commit)
      })
      .catch(err => {
        knitLogger.debug(`Error occurred while trying to fetch main articles list: err ${err}`)
        storeHelper.commitMultiple([ error(err), changeStatus('error') ], commit)
      })
  }
}

export const mutations = {
  [ARTICLE_LIST_RETRIEVED_SUCCESS] (state, payload) {
    state.totalItems = payload.totalItems
    state.articles = [...state.articles, ...payload.articles]
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

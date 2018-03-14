import { ARTICLE_LIST_ITEM_STATUS, ARTICLE_LIST_ITEM_RETRIEVED_SUCCESS, ARTICLE_LIST_ITEM_RETRIEVED_ERROR } from './mutation-types'
import commonHelper from '~/helpers/commonHelper'
import knitService from '~/services/knitService'
import storeHelper from '~/helpers/storeHelper'
import knitLogger from '~/config/logger'
import settings from './settings'
import _ from 'lodash'

const success = storeHelper.createMutationFn(ARTICLE_LIST_ITEM_RETRIEVED_SUCCESS, 'article')
const error = storeHelper.createMutationFn(ARTICLE_LIST_ITEM_RETRIEVED_ERROR, 'error')
const status = storeHelper.createMutationFn(ARTICLE_LIST_ITEM_STATUS, 'status')

export const getters = {
  loading: state => state.status === 'loading',
  article: state => state.article,
  status: state => state.status,
  error: state => state.error
}

export const state = () => ({
  status: 'idle',
  article: {},
  error: ''
})

export const actions = {
  getArticle ({ commit, state, rootGetters }, slug) {
    commit(status('loading'))

    const getterName = `${settings.storePath}/list/articles`
    const articles = rootGetters[getterName]

    if (_.isEmpty(articles)) {
      const qsObject = _.assign({}, settings.defaultQsObject, { code: slug, limit: 1 })

      knitLogger.debug(`No articles in main list, trying to fetch single main article`)

      return knitService.getCollection(this.$axios, 'articles', qsObject)
        .then(data => {
          knitLogger.debug(`Single main article fetched successfully`)
          /*
           TODO: There should be logic which checks if article is published
          */
          const articlesData = data['hydra:member']
          const article = commonHelper.pickItemsProps(articlesData, settings.props, true, settings.datePicker)[0]

          storeHelper.commitMultiple(commit, [ success(article), status('complete') ])
        })
        .catch(err => {
          knitLogger.debug(`Error occurred while trying to fetch single main article: err ${JSON.stringify(err)}`)

          storeHelper.commitMultiple(commit, [ error(err), status('error') ])
        })
    } else {
      knitLogger.debug(`Article is already in main article list, trying to filter and find it`)
      const article = _.filter(articles, article => article.code === slug)[0]
      storeHelper.commitMultiple(commit, [ success(article), status('complete') ])
    }
  },

  resetArticle ({ commit, state }) {
    commit(status('reset'))
  }
}

export const mutations = {
  [ARTICLE_LIST_ITEM_RETRIEVED_ERROR] (state, payload) {
    state.error = payload.error
  },
  [ARTICLE_LIST_ITEM_RETRIEVED_SUCCESS] (state, payload) {
    state.article = payload.article
  },
  [ARTICLE_LIST_ITEM_STATUS] (state, payload) {
    if (payload.status === 'reset') {
      state.article = {}
      state.status = 'idle'
      state.error = ''
      return
    }

    state.status = payload.status
    state.error = state.status === 'loading' ? '' : state.error
  }
}

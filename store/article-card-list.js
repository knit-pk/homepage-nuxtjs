import storeHelper from '~/helpers/storeHelper.js'
import commonHelper from '~/helpers/commonHelper.js'
import { KnitApiClient } from '~/services'
import _ from 'lodash'

const ARTICLE_CARD_LIST_RETRIEVED_SUCCESS = 'ARTICLE_CARD_LIST_RETRIEVED_SUCCESS'
const ARTICLE_CARD_LIST_RETRIEVED_ERROR = 'ARTICLE_CARD_LIST_RETRIEVED_ERROR'
const ARTICLE_CARD_LIST_LOADING = 'ARTICLE_CARD_LIST_LOADING'

const articleProps = ['title', 'content', 'publishedAt', 'thumbnailUrl', 'createdAt', 'author.username', 'author.avatarUrl']

const reducers = {
  takeArticleProps: (articlesArray, article) => [...articlesArray, commonHelper.removeFalsyProps(_.pick(article, articleProps))]
}

const retrieved = articles => ({ type: ARTICLE_CARD_LIST_RETRIEVED_SUCCESS, articles })
const error = error => ({ type: ARTICLE_CARD_LIST_RETRIEVED_ERROR, error })
const loading = loading => ({ type: ARTICLE_CARD_LIST_LOADING, loading })

const settings = {
  requestOptions: { params: { group: ['UserReadLess', 'TagRead', 'CategoryRead'] } },
  limit: 5,
  page: 1
}

export const state = () => ({
  loading: false,
  articles: [],
  error: ''
})

export const actions = {
  getArticleCardList ({ commit, state }) {
    commit(loading(true))

    return KnitApiClient.getPage('articles', settings.page, settings.limit, settings.requestOptions)
      .then(response => {
        const articlesData = response.data['hydra:member']
        const articles = _.reduce(articlesData, reducers.takeArticleProps, [])

        storeHelper.commitMultiple([ retrieved(articles), loading(false) ], commit)
      })
      .catch(err => storeHelper.commitMultiple([ error(err), loading(false) ], commit))
  }
}

export const mutations = {
  [ARTICLE_CARD_LIST_RETRIEVED_SUCCESS] (state, payload) {
    state.articles = payload.articles
  },
  [ARTICLE_CARD_LIST_RETRIEVED_ERROR] (state, payload) {
    state.error = payload.error
  },
  [ARTICLE_CARD_LIST_LOADING] (state, payload) {
    state.loading = payload.loading
  }
}

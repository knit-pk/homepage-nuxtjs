import knitService from '~/services/knitService'
import settings from '~/store-settings/articles'
import commonHelper from '~/helpers/common'
import storeHelper from '~/helpers/store'
import knitLogger from '~/config/logger'
import _ from 'lodash'

// Opera module
const { composer, opus } = storeHelper.opera

// Action names
const actionNames = {
  GET_CATEGORY_ARTICLES_LIST: '#getCategoryArticlesList',
  GET_MAINPAGE: '#getMainPage',
  GET_MAINLIST: '#getMainList',
  GET_ARTICLE: '#getArticle',
}

// Mutation types
const types = {
  CHANGE_CURRENT_ARTICLE_CODE: 'CHANGE_CURRENT_ARTICLE_CODE',
  CHANGE_CURRENT_CATEGORY_CODE: 'CHANGE_CURRENT_CATEGORY_CODE',
  LOAD_ARTICLES: 'LOAD_ARTICLES',
  ADD_CODES: 'ADD_CODES',
}

// Mutation function
const changeCurrCategory = storeHelper.createMutationFn(types.CHANGE_CURRENT_CATEGORY_CODE, 'currentCategoryCode')
const changeCurrArticle = storeHelper.createMutationFn(types.CHANGE_CURRENT_ARTICLE_CODE, 'currentArticleCode')
const loading = storeHelper.createMutationFn(types.LOAD_ARTICLES, 'loading')
const codes = storeHelper.createMutationFn(types.ADD_CODES)

// Custom functions in store
const customFns = {
  prepareArticles (data) {
    const articlesArr = commonHelper.pickItemsProps(data['hydra:member'], settings.props, true, settings.datePicker)
    return _.keyBy(articlesArr, 'code')
  },
}

// Module getters
export const getters = {
  loading: state => state.loading,
  mainPage: state => state.mainPage,
  mainList: state => state.mainList,
  all: state => state.all,
  currentArticleCode: state => state.currentArticleCode,
  currentCategoryCode: state => state.currentCategoryCode,
  categoryArticlesCodeList: state => state.currentCategoryCode === settings.mainListName ? state.mainList : state.byCategory[state.currentCategoryCode],
  byCategory: state => state.byCategory,
}

// Module state
export const state = () => ({
  totalItems: 0,
  mainPage: [],
  mainList: [],
  all: [],
  byCategory: {},
  loading: false,
  error: false,
  currentArticleCode: '',
  currentCategoryCode: '',
})

// Module actions
export const actions = {
  getMainPage: composer.compose({
    name: actionNames.GET_MAINPAGE,
    before: [
      opus.callOthersWhen(({ ctx }) => _.isEmpty(ctx.getters.mainPage)),
      opus.call(({ ctx }) => ctx.commit(loading(true))),
    ],
    success: [
      opus.call(({ ctx, result }) => ctx.commit(codes({ path: 'mainPage', codes: result }))),
      opus.call(({ ctx, result }) => ctx.commit(codes({ path: 'all', codes: result }))),
      opus.call(({ ctx }) => ctx.commit(loading(false))),
    ],
  })(async function getMainPageAction ({ dispatch }) {
    const data = await knitService.getCollection(this.$axios, 'articles', settings.defaultQsObject)
    const articles = customFns.prepareArticles(data)

    // Inject articles and return their codes
    return dispatch('resources/injectResource', {
      path: 'articles',
      data: articles,
    }, { root: true })
  }),

  getCategoryArticlesList: composer.compose({
    name: actionNames.GET_CATEGORY_ARTICLES_LIST,
    before: [
      opus.callOthersWhen(({ ctx, params }) => ctx.getters.currentCategoryCode !== params.categoryCode),
      opus.call(({ ctx, params }) => ctx.commit(changeCurrCategory(params.categoryCode))),
      opus.callOthersWhen(({ ctx }) => _.isEmpty(ctx.getters.byCategory[ctx.getters.currentCategoryCode])),
      opus.call(({ ctx }) => ctx.commit(loading(true))),
    ],
    success: [
      opus.call(({ ctx, params, result }) => ctx.commit(codes({ categoryCode: params.categoryCode, codes: result }))),
      opus.call(({ ctx, result }) => ctx.commit(codes({ path: 'all', codes: result }))),
      opus.call(({ ctx }) => ctx.commit(loading(false))),
    ],
  })(async function getCategoryArticlesListAction ({ dispatch }, params) {
    const data = await knitService.getCollection(this.$axios, 'articles', { ...settings.defaultQsObject, 'category.code': params.categoryCode })
    const articles = customFns.prepareArticles(data)

    // Inject articles and return their codes
    return dispatch('resources/injectResource', {
      path: 'articles',
      data: articles,
    }, { root: true })
  }),

  getMainList: composer.compose({
    name: actionNames.GET_MAINLIST,
    before: [
      opus.call(({ ctx }) => ctx.commit(changeCurrCategory(settings.mainListName))),
      opus.callOthersWhen(({ ctx }) => _.isEmpty(ctx.getters.mainList)),
      opus.call(({ ctx }) => ctx.commit(loading(true))),
    ],
    success: [
      opus.call(({ ctx, result }) => ctx.commit(codes({ path: 'mainList', codes: result }))),
      opus.call(({ ctx, result }) => ctx.commit(codes({ path: 'all', codes: result }))),
      opus.call(({ ctx }) => ctx.commit(loading(false))),
    ],
  })(async function getMainlistAction ({ dispatch }) {
    const data = await knitService.getCollection(this.$axios, 'articles', settings.defaultQsObject)
    const articles = customFns.prepareArticles(data)

    // Inject articles and return their codes
    return dispatch('resources/injectResource', {
      path: 'articles',
      data: articles,
    }, { root: true })
  }),

  getArticle: composer.compose({
    name: actionNames.GET_ARTICLE,
    before: [
      opus.callOthersWhen(({ ctx, params }) => !_.includes(ctx.getters['all'], params.code)),
      opus.call(({ ctx }) => ctx.commit(loading(true))),
    ],
    success: [
      opus.call(({ ctx, result }) => ctx.commit(codes({ path: 'all', codes: result }))),
      opus.call(({ ctx }) => ctx.commit(loading(false))),
    ],
    always: [
      opus.call(({ ctx, params }) => params.code !== ctx.getters['currentArticleCode'] && ctx.commit(changeCurrArticle(params.code))),
    ],
  })(async function getArticleAction ({ dispatch }, params) {
    const data = await knitService.getCollection(this.$axios, 'articles', {
      ...settings.defaultQsObject,
      code: params.code,
      limit: 1,
    })

    const articles = customFns.prepareArticles(data)

    // Inject articles and return their codes
    return dispatch('resources/injectResource', {
      path: 'articles',
      data: articles,
    }, { root: true })
  }),
}

export const mutations = {
  [types.LOAD_ARTICLES] (state, payload) {
    state.loading = payload.loading
  },
  [types.ADD_CODES] (state, payload) {
    knitLogger.debug(() => `Adding codes to '${payload.path || payload.categoryCode}': ${JSON.stringify(payload.codes)}`)

    if (payload.path) {
      state[payload.path] = _.union(state[payload.path], payload.codes)
    } else {
      state.byCategory[payload.categoryCode] = _.union(state.byCategory[payload.categoryCode] || {}, payload.codes)
    }
  },
  [types.CHANGE_CURRENT_ARTICLE_CODE] (state, payload) {
    state.currentArticleCode = payload.currentArticleCode
  },
  [types.CHANGE_CURRENT_CATEGORY_CODE] (state, payload) {
    state.currentCategoryCode = payload.currentCategoryCode
  },
}

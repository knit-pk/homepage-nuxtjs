import knitService from '~/services/knitService'
import settings from '~/store-settings/articles'
import commonHelper from '~/helpers/common'
import storeHelper from '~/helpers/store'
import knitLogger from '~/config/logger'
import _ from 'lodash'

// Opera module
const { compounds, callers, composer, opuses } = storeHelper.opera

// Mutation types
const types = {
  CHANGE_CURRENT_ARTICLE_CODE: 'CHANGE_CURRENT_ARTICLE_CODE',
  CHANGE_CURRENT_CATEGORY_CODE: 'CHANGE_CURRENT_CATEGORY_CODE',
  LOAD_ARTICLES: 'LOAD_ARTICLES',
  ADD_CODES: 'ADD_CODES'
}

// Mutation function
const changeCurrCategory = storeHelper.createMutationFn(types.CHANGE_CURRENT_CATEGORY_CODE, 'currentCategoryCode')
const changeCurrArticle = storeHelper.createMutationFn(types.CHANGE_CURRENT_ARTICLE_CODE, 'currentArticleCode')
const loading = storeHelper.createMutationFn(types.LOAD_ARTICLES, 'loading')
const codes = storeHelper.createMutationFn(types.ADD_CODES)

// Module getters
export const getters = {
  loading: state => state.loading,
  mainPage: state => state.mainPage,
  mainList: state => state.mainList,
  all: state => state.all,
  currentArticleCode: state => state.currentArticleCode,
  currentCategoryCode: state => state.currentCategoryCode,
  categoryCodeList: state => state.currentCategoryCode === settings.mainListName ? state.mainList : state.byCategory[state.currentCategoryCode],
  byCategory: state => state.byCategory
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
  currentCategoryCode: ''
})

// Module actions
export const actions = {
  getMainPage: composer.compose({
    name: '#getMainpage',
    before: [
      compounds.callActionWhen(({ ctx }) => _.isEmpty(ctx.getters.mainPage)),
      compounds.doSth(({ ctx }) => ctx.commit(loading(true)))
    ],
    caller: callers.call,
    success: [
      opuses.doSth(({ ctx, result }) => ctx.dispatch('addCodes', { path: 'mainPage', codes: result })),
      opuses.doSth(({ ctx, result }) => ctx.dispatch('addCodes', { path: 'all', codes: result })),
      opuses.doSth(({ ctx, result }) => ctx.commit(loading(false)))
    ]
  })(async function getMainPageAction ({ state, commit, dispatch }, params) {
    const data = await knitService.getCollection(this.$axios, 'articles', settings.defaultQsObject)

    // Inject articles and return their codes
    return dispatch('resources/injectResource', {
      path: 'articles',
      data: await dispatch('prepareArticles', data)
    }, { root: true })
  }),
  getCategoryList: composer.compose({
    name: '#getCategory',
    before: [
      compounds.callActionWhen(({ ctx, params }) => ctx.getters.currentCategoryCode !== params.categoryCode),
      compounds.doSth(({ ctx, params }) => ctx.commit(changeCurrCategory(params.categoryCode))),
      compounds.callActionWhen(({ ctx }) => _.isEmpty(ctx.getters.byCategory[ctx.getters.currentCategoryCode])),
      compounds.doSth(({ ctx }) => ctx.commit(loading(true)))
    ],
    caller: callers.call,
    success: [
      opuses.doSth(({ ctx, params, result }) => ctx.dispatch('addCodes', { categoryCode: params.categoryCode, codes: result })),
      opuses.doSth(({ ctx, result }) => ctx.dispatch('addCodes', { path: 'all', codes: result })),
      opuses.doSth(({ ctx, result }) => ctx.commit(loading(false)))
    ]
  })(async function getCategoryListAction ({ state, commit, dispatch }, params) {
    const data = await knitService.getCollection(this.$axios, 'articles', { ...settings.defaultQsObject, 'category.code': params.categoryCode })

    // Inject articles and return their codes
    return dispatch('resources/injectResource', {
      path: 'articles',
      data: await dispatch('prepareArticles', data)
    }, { root: true })
  }),
  getMainList: composer.compose({
    name: '#getMainlist',
    before: [
      compounds.doSth(({ ctx }) => ctx.commit(changeCurrCategory(settings.mainListName))),
      compounds.callActionWhen(({ ctx }) => _.isEmpty(ctx.getters.mainList)),
      compounds.doSth(({ ctx }) => ctx.commit(loading(true)))
    ],
    caller: callers.call,
    success: [
      opuses.doSth(({ ctx, result }) => ctx.dispatch('addCodes', { path: 'mainList', codes: result })),
      opuses.doSth(({ ctx, result }) => ctx.dispatch('addCodes', { path: 'all', codes: result })),
      opuses.doSth(({ ctx, result }) => ctx.commit(loading(false)))
    ]
  })(async function getMainlistAction ({ state, commit, dispatch }, params) {
    const data = await knitService.getCollection(this.$axios, 'articles', settings.defaultQsObject)

    // Inject articles and return their codes
    return dispatch('resources/injectResource', {
      path: 'articles',
      data: await dispatch('prepareArticles', data)
    }, { root: true })
  }),
  getArticle: composer.compose({
    name: '#getArticle',
    before: [
      compounds.callActionWhen(({ ctx, params }) => !_.includes(ctx.getters['all'], params.code)),
      compounds.doSth(({ ctx }) => ctx.commit(loading(true)))
    ],
    caller: callers.call,
    success: [
      opuses.doSth(({ ctx, result }) => ctx.dispatch('addCodes', { path: 'all', codes: result })),
      opuses.doSth(({ ctx, result }) => ctx.commit(loading(false)))
    ],
    always: [
      opuses.doSth(({ ctx, params }) => params.code !== ctx.getters['currentArticleCode'] && ctx.commit(changeCurrArticle(params.code)))
    ]
  })(async function getArticleAction ({ commit, dispatch }, params) {
    const data = await knitService.getCollection(this.$axios, 'articles', {
      ...settings.defaultQsObject,
      code: params.code,
      limit: 1
    })

    // Inject articles and return their codes
    return dispatch('resources/injectResource', {
      path: 'articles',
      data: await dispatch('prepareArticles', data)
    }, { root: true })
  }),
  prepareArticles (ctx, data) {
    const articlesArr = commonHelper.pickItemsProps(data['hydra:member'], settings.props, true, settings.datePicker)
    return _.keyBy(articlesArr, 'code')
  },
  addCodes ({ commit }, params) {
    knitLogger.debug(() => `Adding codes to '${params.path || params.categoryCode}': ${JSON.stringify(params.codes)}`)
    commit(codes(params))
  }
}

export const mutations = {
  [ types.LOAD_ARTICLES ] (state, payload) {
    state.loading = payload.loading
  },
  [ types.ADD_CODES ] (state, payload) {
    if (payload.path) {
      state[payload.path] = _.union(state[payload.path], payload.codes)
    } else {
      state.byCategory[payload.categoryCode] = _.union(state.byCategory[payload.categoryCode] || {}, payload.codes)
    }
  },
  [ types.CHANGE_CURRENT_ARTICLE_CODE ] (state, payload) {
    state.currentArticleCode = payload.currentArticleCode
  },
  [ types.CHANGE_CURRENT_CATEGORY_CODE ] (state, payload) {
    state.currentCategoryCode = payload.currentCategoryCode
  }
}

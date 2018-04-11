import knitService from '~/services/knitService'
import settings from '~/store-settings/articles'
import commonHelper from '~/helpers/common'
import storeHelper from '~/helpers/store'
import knitLogger from '~/config/logger'
import _ from 'lodash'

// Opera module
const {compounds, callers, composer, opuses} = storeHelper.opera

// Mutation types
const types = {
  CHANGE_CURRENT_ARTICLE_CODE: 'CHANGE_CURRENT_ARTICLE_CODE',
  CHANGE_CATEGORY_TOTAL_ITEMS: 'CHANGE_CATEGORY_TOTAL_ITEMS',
  CHANGE_CURRENT_CATEGORY_CODE: 'CHANGE_CURRENT_CATEGORY_CODE',
  LOAD_ARTICLES: 'LOAD_ARTICLES',
  INIT_CATEGORY: 'INIT_CATEGORY',
  ADD_CODES: 'ADD_CODES'
}

// Mutation function
const changeCurrCategory = storeHelper.createMutationFn(types.CHANGE_CURRENT_CATEGORY_CODE, 'currentCategoryCode')
const changeCurrArticle = storeHelper.createMutationFn(types.CHANGE_CURRENT_ARTICLE_CODE, 'currentArticleCode')
const changeTotalItems = storeHelper.createMutationFn(types.CHANGE_CATEGORY_TOTAL_ITEMS, 'totalItems')
const initCategory = storeHelper.createMutationFn(types.INIT_CATEGORY, 'categoryCode')
const loading = storeHelper.createMutationFn(types.LOAD_ARTICLES, 'loading')
const codes = storeHelper.createMutationFn(types.ADD_CODES)

// Module getters
export const getters = {
  loading: state => state.loading,
  mainPage: state => state.mainPage,
  all: state => state.all,
  currentArticleCode: state => state.currentArticleCode,
  currentCategoryCode: state => state.currentCategoryCode,
  categoryCodeList: (state) => _.get(state.byCategory, [state.currentCategoryCode, 'codes'], []),
  byCategory: state => state.byCategory
}

// Module state
export const state = () => ({
  totalItems: 0,
  mainPage: [],
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
    before: [
      compounds.callActionWhen(({ctx}) => _.isEmpty(ctx.getters.mainPage)),
      compounds.doSth(({ctx}) => ctx.commit(loading(true)))
    ],
    caller: callers.call('#getMainPage'),
    success: [
      opuses.doSth(({ctx, result}) => ctx.dispatch('addCodes', { path: 'mainPage', codes: result })),
      opuses.doSth(({ctx, result}) => ctx.dispatch('addCodes', { path: 'all', codes: result })),
      opuses.doSth(({ctx}) => ctx.commit(loading(false)))
    ]
  })(async function getMainPageAction ({state, commit, dispatch}, params) {
    // fetch articles
    const data = await knitService.getCollection(this.$axios, 'articles', settings.defaultQsObject)

    // prepare articles
    const articles = await dispatch('prepareArticles', data)

    // inject resource
    const codes = await dispatch('resources/injectResource', {
      path: 'articles',
      data: articles
    }, {root: true})

    return codes
  }),
  getCategoryList: composer.compose({
    before: [
      compounds.callActionWhen(({ctx, params}) => ctx.getters.currentCategoryCode !== params.categoryCode),
      compounds.doSth(({ctx, params}) => !ctx.getters.byCategory[params.categoryCode] && ctx.commit(initCategory(params.categoryCode))),
      compounds.callActionWhen(({ctx, params}) => _.isEmpty(ctx.getters.byCategory[params.categoryCode].codes)),
      compounds.doSth(({ctx}) => ctx.commit(loading(true)))
    ],
    caller: callers.call('#getCategoryList'),
    success: [
      opuses.doSth(({ctx, params, result}) => ctx.dispatch('addCodes', {
        categoryCode: params.categoryCode,
        codes: result.codes
      })),
      opuses.doSth(({ctx, result}) => ctx.dispatch('addCodes', {path: 'all', codes: result.codes})),
      opuses.doSth(({ctx, params}) => ctx.commit(changeCurrCategory(params.categoryCode))),
      opuses.doSth(({ctx, params, result}) => ctx.getters.byCategory[params.categoryCode].totalItems !== result.totalItems && ctx.commit(changeTotalItems(result.totalItems))),
      opuses.doSth(({ctx}) => ctx.commit(loading(false)))
    ]
  })(async function getCategoryListAction ({state, commit, dispatch}, params) {
    const categoryQs = _.pickBy({
      ...settings.defaultQsObject,
      'category.code': (params.categoryCode !== settings.mainListName) && params.categoryCode
    }, _.identity)

    // fetch articles
    const data = await knitService.getCollection(this.$axios, 'articles', categoryQs)

    // prepare articles
    const articles = await dispatch('prepareArticles', data)

    // inject resource
    const codes = await dispatch('resources/injectResource', {
      path: 'articles',
      data: articles
    }, {root: true})

    // result
    return {
      codes,
      totalItems: data['hydra:totalItems']
    }
  }),
  getArticle: composer.compose({
    before: [
      compounds.callActionWhen(({ctx, params}) => !_.includes(ctx.getters['all'], params.code)),
      compounds.doSth(({ctx}) => ctx.commit(loading(true)))
    ],
    caller: callers.call('#getArticle'),
    success: [
      opuses.doSth(({ctx, result}) => ctx.dispatch('addCodes', {path: 'all', codes: result})),
      opuses.doSth(({ctx, result}) => ctx.commit(loading(false)))
    ],
    always: [
      opuses.doSth(({ctx, params}) => params.code !== ctx.getters['currentArticleCode'] && ctx.commit(changeCurrArticle(params.code)))
    ]
  })(async function getArticleAction ({commit, dispatch}, params) {
    const data = await knitService.getCollection(this.$axios, 'articles', {
      ...settings.defaultQsObject,
      code: params.code,
      limit: 1
    })

    // Inject articles and return their codes
    return dispatch('resources/injectResource', {
      path: 'articles',
      data: await dispatch('prepareArticles', data)
    }, {root: true})
  }),
  prepareArticles (ctx, data) {
    const articlesArr = commonHelper.pickItemsProps(data['hydra:member'], settings.props, true, settings.datePicker)
    return _.keyBy(articlesArr, 'code')
  },
  addCodes ({commit}, params) {
    knitLogger.debug(() => `Adding codes to '${params.path || params.categoryCode}': ${JSON.stringify(params.codes)}`)
    commit(codes(params))
  }
}

export const mutations = {
  [types.LOAD_ARTICLES] (state, payload) {
    state.loading = payload.loading
  },
  [types.ADD_CODES] (state, payload) {
    if (payload.path) {
      state[payload.path] = _.union(state[payload.path], payload.codes)
    } else {
      state.byCategory[payload.categoryCode] = _.assign(state.byCategory[payload.categoryCode], {
        codes: _.union(state.byCategory[payload.categoryCode].codes, payload.codes)
      })
    }
  },
  [types.CHANGE_CURRENT_ARTICLE_CODE] (state, payload) {
    state.currentArticleCode = payload.currentArticleCode
  },
  [types.CHANGE_CURRENT_CATEGORY_CODE] (state, payload) {
    state.currentCategoryCode = payload.currentCategoryCode
  },
  [types.INIT_CATEGORY] (state, payload) {
    state.byCategory[payload.categoryCode] = {
      codes: [],
      totalItems: 0
    }
  },
  [types.CHANGE_CATEGORY_TOTAL_ITEMS] (state, payload) {
    state.byCategory[state.currentCategoryCode].totalItems = payload.totalItems
  }
}

import knitService from '~/services/knitService'
import settings from '~/config/store/articles'
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
export const types = {
  CHANGE_CURRENT_ARTICLE_CODE: 'CHANGE_CURRENT_ARTICLE_CODE',
  LOAD_ARTICLES: 'LOAD_ARTICLES',
  ADD_CODES: 'ADD_CODES',
}

// Mutation function
const currentArticle = storeHelper.createMutationFn(types.CHANGE_CURRENT_ARTICLE_CODE, 'currentArticleCode')
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
  categoryArticlesCodeList: (state, getters, rootGetters) => {
    const categoriesGetters = rootGetters.view.categories

    return categoriesGetters.currentCategoryCode === settings.mainListName ?
      state.mainList :
      state.byCategory[categoriesGetters.currentCategoryCode]
  },
  currentArticleCode: state => state.currentArticleCode,
  byCategory: state => state.byCategory,
  mainPage: state => state.mainPage,
  mainList: state => state.mainList,
  loading: state => state.loading,
  all: state => state.all,
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
      opus.callOthersWhen(({ ctx, params }) => _.isEmpty(ctx.getters.byCategory[params.categoryCode])),
      opus.call(({ ctx }) => ctx.commit(loading(true))),
    ],
    success: [
      opus.call(({ ctx, params, result }) => ctx.commit(codes({ categoryCode: params.categoryCode, codes: result }))),
      opus.call(({ ctx, result }) => ctx.commit(codes({ path: 'all', codes: result }))),
      opus.call(({ ctx }) => ctx.commit(loading(false))),
    ],
    always: [
      opus.call(({ ctx, params }) => {
        return ctx.dispatch('view/categories/changeCurrentCategory',
          { currentCategoryCode: params.categoryCode }, { root: true })
      }),
    ],
  })(async function getCategoryArticlesListAction ({ dispatch }, params) {
    const data = await knitService.getCollection(this.$axios, 'articles', {
      'category.code': params.categoryCode,
      ...settings.defaultQsObject,
    })

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
      opus.callOthersWhen(({ ctx }) => _.isEmpty(ctx.getters.mainList)),
      opus.call(({ ctx }) => ctx.commit(loading(true))),
    ],
    success: [
      opus.call(({ ctx, result }) => ctx.commit(codes({ path: 'mainList', codes: result }))),
      opus.call(({ ctx, result }) => ctx.commit(codes({ path: 'all', codes: result }))),
      opus.call(({ ctx }) => ctx.commit(loading(false))),
    ],
    always: [
      opus.call(({ ctx }) => {
        return ctx.dispatch('view/categories/changeCurrentCategory', {
          currentCategoryCode: settings.mainListName,
        }, { root: true })
      }),
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
      opus.call(({ ctx, params }) => {
        if (params.code !== ctx.getters['currentArticleCode']) {
          ctx.commit(currentArticle(params.code))
        }
      }),
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
}

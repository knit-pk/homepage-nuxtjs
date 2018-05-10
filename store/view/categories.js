import knitService from '~/services/knitService'
import settings from '~/config/store/categories'
import storeHelper from '~/helpers/store'
import knitLogger from '~/config/logger'
import _ from 'lodash'

// Opera module
const { composer, opus } = storeHelper.opera

// Action names
const actionNames = {
  GET_CATEGORIES: '#getCategories',
}

// Mutation types
export const types = {
  CHANGE_CURRENT_CATEGORY_CODE: 'CHANGE_CURRENT_CATEGORY_CODE',
  LOAD_CATEGORIES: 'LOAD_CATEGORIES',
  ADD_CODES: 'ADD_CODES',
}

// Mutation function
const changeCurrCategory = storeHelper.createMutationFn(types.CHANGE_CURRENT_CATEGORY_CODE, 'currentCategoryCode')
const loading = storeHelper.createMutationFn(types.LOAD_CATEGORIES, 'loading')
const codes = storeHelper.createMutationFn(types.ADD_CODES, 'codes')

// Custom functions in store
const customFns = {
  prepareCategories (data) {
    const categoriesArrSorted = _.orderBy(data['hydra:member'], 'articlesCount', 'desc')
    return _.keyBy(categoriesArrSorted, 'code')
  },
}

// Module getters
export const getters = {
  currentCategoryImage: (state, getters, rootGetters) => {
    return _.get(rootGetters.resources.categories, `${state.currentCategoryCode}.image.url`, getters.mainListImage)
  },
  mainListImage: (state, getters, rootGetters) => {
    const categoriesKeys = _.keys(rootGetters.resources.categories)
    const randomKey = categoriesKeys[Math.floor(Math.random() * categoriesKeys.length)]

    return _.get(rootGetters.resources.categories, `${randomKey}.image.url`, '')
  },
  currentCategoryName: (state, getters, rootGetters) => _.get(rootGetters.resources.categories, `${state.currentCategoryCode}.name`, 'Artykuły'),
  currentCategoryCode: state => state.currentCategoryCode,
  categoriesCodesList: state => state.all,
}

// Module state
export const state = () => ({
  currentCategoryCode: '',
  loading: false,
  all: [],
})

// Module actions
export const actions = {
  getCategories: composer.compose({
    name: actionNames.GET_CATEGORIES,
    before: [
      opus.callOthersWhen(({ ctx }) => _.isEmpty(ctx.state.all)),
      opus.call(({ ctx }) => ctx.commit(loading(true))),
    ],
    success: [
      opus.call(({ ctx }) => ctx.commit(loading(false))),
      opus.call(({ ctx, result }) => ctx.commit(codes(result))),
    ],
  })(async function getCategoriesAction ({ dispatch }) {
    const data = await knitService.getCollection(this.$axios, 'categories', settings.defaultQsObject)
    const categories = customFns.prepareCategories(data)

    return dispatch('resources/injectResource', {
      data: categories,
      path: 'categories',
    }, { root: true })
  }),

  changeCurrentCategory ({ commit, state }, params) {
    knitLogger.debug(() => `Changing current category ${state.currentCategoryCode} to ${params.currentCategoryCode}`)
    commit(changeCurrCategory(params.currentCategoryCode))
  },
}

export const mutations = {
  [types.LOAD_CATEGORIES] (state, payload) {
    state.loading = payload.loading
  },
  [types.ADD_CODES] (state, payload) {
    knitLogger.debug(() => `Adding codes to all categories ${JSON.stringify(payload.codes)}`)
    state.all = _.union(state.all, payload.codes)
  },
  [types.CHANGE_CURRENT_CATEGORY_CODE] (state, payload) {
    state.currentCategoryCode = payload.currentCategoryCode
  },
}

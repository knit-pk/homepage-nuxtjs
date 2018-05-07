import knitService from '~/services/knitService'
import settings from '~/store-settings/categories'
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
const types = {
  LOAD_CATEGORIES: 'LOAD_CATEGORIES',
  ADD_CODES: 'ADD_CODES',
}

// Mutation function
const loading = storeHelper.createMutationFn(types.LOAD_CATEGORIES, 'loading')
const codes = storeHelper.createMutationFn(types.ADD_CODES, 'codes')

// Custom functions in store
const customFns = {
  prepareCategories (data) {
    const categoriesArrSorted = _.orderBy(data['hydra:member'], 'articlesCount', 'desc')
    return _.keyBy(categoriesArrSorted, '@id')
  },
}

// Module getters
export const getters = {
  categoriesCodesList: state => state.all,
}

// Module state
export const state = () => ({
  all: [],
  loading: false,
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
}

export const mutations = {
  [types.LOAD_CATEGORIES] (state, payload) {
    state.loading = payload.loading
  },
  [types.ADD_CODES] (state, payload) {
    knitLogger.debug(() => `Adding codes to all categories ${JSON.stringify(payload.codes)}`)
    state.all = _.union(state.all, payload.codes)
  },
}

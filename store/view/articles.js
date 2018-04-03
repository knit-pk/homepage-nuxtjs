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
  LOAD_ARTICLES: 'LOAD_ARTICLES',
  ADD_CODES: 'ADD_CODES'
}

// Mutation functions
const loading = storeHelper.createMutationFn(types.LOAD_ARTICLES, 'loading')
const codes = storeHelper.createMutationFn(types.ADD_CODES)

// Module getters
export const getters = {
  loading: state => state.loading,
  mainpage: state => state.mainpage
}

// Module state
export const state = () => ({
  totalItems: 0,
  mainpage: [],
  mainlist: [],
  all: [],
  byCategory: {},
  loading: false,
  error: false
})

// Module actions
export const actions = {
  getMainpage: composer.compose({
    before: [
      compounds.callActionWhen(({ ctx }) => _.isEmpty(ctx.getters.mainpage)),
      compounds.doSth(({ ctx }) => ctx.commit(loading(true)))
    ],
    caller: callers.squashErrorsCall('#getMainpage'),
    after: [
      opuses.doSth(({ ctx, result }) => ctx.dispatch('addCodes', { path: 'mainpage', codes: result })),
      opuses.doSth(({ ctx, result }) => ctx.commit(loading(false)))
    ]
  })(async function getMainpageAction ({ state, commit, dispatch }, params) {
    const data = await knitService.getCollection(this.$axios, 'articles', settings.defaultQsObject)

    // Inject articles and return their codes
    return dispatch('resources/injectResource', {
      path: 'articles',
      data: await dispatch('prepareArticles', data)
    }, { root: true })
  }),
  prepareArticles (ctx, data) {
    const articlesArr = commonHelper.pickItemsProps(data['hydra:member'], settings.props, true, settings.datePicker)
    return commonHelper.resourceArrToObj(articlesArr)
  },
  addCodes ({ commit }, params) {
    knitLogger.debug(() => `Adding codes to 'all' and '${params.path}': ${JSON.stringify(params.codes)}`)
    commit(codes(params))
  }
  // getowanieJednegoArtylulu
}

export const mutations = {
  [ types.LOAD_ARTICLES ] (state, payload) {
    state.loading = payload.loading
  },
  [ types.ADD_CODES ] (state, payload) {
    state[payload.path] = _.union(state[payload.path], payload.codes)
    state['all'] = _.union(state['all'], payload.codes)
  }
}

import commonHelper from '~/helpers/common'
import knitLogger from '~/config/logger'
import errorTypes from './errors/types'
import caller from './caller'
import _ from 'lodash'

const { CANCEL, ACTION_FAIL } = errorTypes

const hooksCallWithBound = async (fns, that, ctx, params, result) => {
  if (!fns) {
    // No functions provided
    return
  }

  for (const fn of fns) {
    await fn({ that, ctx, params, result })
  }
}

function compose ({ name, before, success, always, fail, cancel }) {
  if (!name) {
    throw Error('Action name should be specified')
  }

  const progErrorNames = _.values(errorTypes)

  // Take action definition
  return (actionDefn) => {
    return async function onActionCall (ctx, params) {
      // Bind actionName to this
      this.actionName = name

      try {
        // Call all before functions
        await hooksCallWithBound(before, this, ctx, params, null)

        // Bind the parameters to action
        const actionBound = () => actionDefn.bind(this)(ctx, params)

        // Calling the action
        const result = await caller.call(this.actionName, actionBound)

        // On success do sth with result
        await hooksCallWithBound(success, this, ctx, params, result)
      } catch (err) {
        // When Nuxt.js/Vue.js error propagate it back
        if (!commonHelper.isProd() && !_.includes(progErrorNames, err.name)) {
          knitLogger.debug(() => 'Some nuxt/vue error! Probably it\'s all because getters!')
          throw err
        }

        // When action failed
        if (err.name === ACTION_FAIL && !_.isEmpty(fail)) {
          knitLogger.debug(() => 'Calling on fail functions')
          return await hooksCallWithBound(fail, this, ctx, params, null)
        }

        // When other things in stack are canceled
        if (err.name === CANCEL && !_.isEmpty(cancel)) {
          knitLogger.debug(() => 'Calling on cancel functions')
          return await hooksCallWithBound(cancel, this, ctx, params, null)
        }
      } finally {
        if (!_.isEmpty(always)) {
          knitLogger.debug(() => 'Calling always methods!')
          await hooksCallWithBound(always, this, ctx, params, null)
        }
      }
    }
  }
}

export default {
  compose,
}

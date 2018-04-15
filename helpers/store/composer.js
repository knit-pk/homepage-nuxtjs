import commonHelper from '~/helpers/common'
import knitLogger from '~/config/logger'
import _ from 'lodash'

function _validateComposableInputs (name, caller) {
  if (!name) {
    throw Error('Action name should be specified')
  }

  if (!caller) {
    throw Error('Caller must be defined')
  }
}

// Binds all parameters to all success, always functions
const _promisesBoundCaller = async (arrFn, that, ctx, params, result) => {
  const bound = { that, ctx, params, result }
  const boundPromises = _.map(arrFn, async bind => bind(bound))

  for (const promise of boundPromises) {
    await promise
  }
}
// Binds all parameters to the action
const _actionWithBoundCaller = (that, ctx, params, actionDefn) =>
  () => actionDefn.bind(that)(ctx, params)

// Binds all parameters to all composers, caller
const _flowWithBoundCaller = (before, caller, that, ctx, params) => {
  const bound = { that, ctx, params }
  const beforeFns = !before ? [ _.identity ] : before
  const beforeBound = _.flow(beforeFns).bind(bound)

  return _.flow([ beforeBound, caller.bind(bound) ])
}

function compose ({ name, before, caller, success, always, fail, cancel }) {
  const programaticErrors = ['ActionFail', 'ActionCancel']

  // Proper inputs should exist
  _validateComposableInputs(name, caller)

  // Take action definition
  return (actionDefinition) => {
    // Return function which is called on every action call

    return async function actionCall (ctx, params) {
      // Bind actionName to this
      this.actionName = name

      // Try call the action and do sth on success
      try {
        const actionBound = _actionWithBoundCaller(this, ctx, params, actionDefinition)
        const composedBeforeWithCaller = _flowWithBoundCaller(before, caller, this, ctx, params)

        // Calling the action
        const result = await composedBeforeWithCaller(actionBound)

        // On success do sth with result
        await _promisesBoundCaller(success, this, ctx, params, result)
      } catch (err) {
        // When error occurs or some custom hooks

        if (err.name === 'ActionFail' && !_.isEmpty(fail)) {
          // When action failed

          knitLogger.debug(() => 'Calling on fail functions')
          await _promisesBoundCaller(fail, this, ctx, params, null)
        } else if (err.name === 'ActionCancel' && !_.isEmpty(cancel)) {
          // When action was canceled

          knitLogger.debug(() => 'Calling on cancel functions')
          await _promisesBoundCaller(cancel, this, ctx, params, null)
        } else if (!commonHelper.isProd() && !_.includes(programaticErrors, err.name)) {
          // When Nuxt.js/Vue.js error propagate it back

          knitLogger.debug(() => 'Some nuxt/vue error! Probably it\'s all because getters!')
          throw err
        }
      } finally {
        if (!_.isEmpty(always)) {
          // After all call always methods

          knitLogger.debug(() => 'Calling always methods!')
          await _promisesBoundCaller(always, this, ctx, params, null)
        }
      }
    }
  }
}

export default {
  compose
}

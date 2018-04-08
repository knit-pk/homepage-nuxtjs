import _ from 'lodash'

const methods = {
  cancel () {
    throw new Error('cancel')
  }
}

function compose ({ before, caller, after, always, fail }) {
  // Binds all parameters to all after, always functions
  const promisesBoundCaller = async (arrFn, that, ctx, params, result) => {
    const boundPromises = _.map(arrFn, async (bind) => bind({ that, ctx, params, result }))

    for (const promise of boundPromises) {
      await promise
    }
  }

  // Binds all parameters to the action
  const actionWithBoundCaller = (that, ctx, params, actionDefn) =>
    () => actionDefn.bind(that)(ctx, params)

  // Binds all parameters to all composers, caller
  const flowWithBoundCaller = (that, ctx, params) => {
    const beforeBound = _.flow(before).bind({ that, ctx, params, methods })
    return _.flow([ beforeBound, caller.bind({ that, ctx, params, methods: { ...methods, promisesBoundCaller }, fail }) ])
  }

  // Take action definition
  return (actionDefinition) => {
    // Return function which is called
    // on every action call
    return async function actionCall (ctx, params) {
      try {
        const result = await flowWithBoundCaller(this, ctx, params)(actionWithBoundCaller(this, ctx, params, actionDefinition))
        await promisesBoundCaller(after, this, ctx, params, result)
      } catch (err) {
        // When something is canceled or before functions thrown an error
      } finally {
        await promisesBoundCaller(always, this, ctx, params, null)
      }
    }
  }
}

export default {
  compose
}

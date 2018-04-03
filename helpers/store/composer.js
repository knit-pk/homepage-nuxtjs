import _ from 'lodash'

const methods = {
  cancel () {
    throw new Error('cancel')
  }
}

function compose ({ before, caller, after }) {
  // Binds all parameters to the action
  const actionWithBoundCaller = (that, ctx, params, actionDefn) =>
    () => actionDefn.bind(that)(ctx, params)

  // Binds all parameters to all composers, caller
  const flowWithBoundCaller = (that, ctx, params) =>
    _.flow([...before, caller]).bind({ that, ctx, params, methods })

  // Binds all parameters to all after functions
  const afterBoundCaller = (that, ctx, params, result) => {
    return Promise.all(_.map(after, afterElm => afterElm({ that, ctx, params, result })))
  }

  // Take action definition
  return (actionDefinition) => {
    // Return function which is called
    // on every action call
    return async function actionCall (ctx, params) {
      try {
        const result = await flowWithBoundCaller(this, ctx, params)(actionWithBoundCaller(this, ctx, params, actionDefinition))
        await afterBoundCaller(this, ctx, params, result)
      } catch (err) {
        // I do not know what we gonna do there yet
      }
    }
  }
}

export default {
  compose
}

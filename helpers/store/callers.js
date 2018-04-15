import ActionFail from './errors/ActionFail'
import knitLogger from '~/config/logger'

// NOTE: I think that there will be only one caller but let's wait couple of PR's
function call (action) {
  const actionName = this.that.actionName

  // Debug the action call
  knitLogger.debug(() => `Calling action: ${actionName}`)

  return Promise
    .resolve(action())
    .catch(async err => {
      knitLogger.debug(() => err)

      // Propagate the err
      throw new ActionFail(actionName)
    })
}

export default {
  call
}

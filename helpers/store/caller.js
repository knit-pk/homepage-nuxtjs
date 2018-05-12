import { ActionFail } from './errors/ActionFail'
import knitLogger from '~/config/logger'

function call (actionName, action) {
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
  call,
}

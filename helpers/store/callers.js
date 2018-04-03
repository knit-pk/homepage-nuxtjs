import knitLogger from '~/config/logger'

function squashErrorsCall (message = '') {
  return function (action) {
    return Promise
      .resolve(action())
      .catch(err => {
        knitLogger.debug(() => err)
        knitLogger.debug(() => message)
      })
  }
}

function defaultCall (message = '') {
  return function (action) {
    knitLogger.debug(() => `Default caller: ${message}`)
    return action()
  }
}

export default {
  squashErrorsCall,
  defaultCall
}

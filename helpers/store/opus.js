import knitLogger from '~/config/logger'
import { Cancel } from './errors/Cancel'

function call (fn) {
  return function (bound) {
    return Promise.resolve(fn(bound))
  }
}

function callOthersWhen (predicate) {
  return function (bound) {
    if (!predicate(bound)) {
      knitLogger.debug(() => `Predicate: ${predicate} evaluated to false, canceling other calls!`)

      // Cancel others
      throw new Cancel(bound.that.actionName)
    }
  }
}

export default {
  callOthersWhen,
  call,
}

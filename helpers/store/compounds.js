import ActionCancel from './errors/ActionCancel'
import knitLogger from '~/config/logger'

function callActionWhen (predicate) {
  return function (action) {
    if (predicate(this)) {
      return action
    }

    knitLogger.debug(() => `Predicate: ${predicate} evaluated to false, canceling action!`)

    // Cancel action
    throw new ActionCancel(this.that.actionName)
  }
}

function doSth (fn) {
  return function (action) {
    fn(this)
    return action
  }
}

export default {
  callActionWhen,
  doSth
}

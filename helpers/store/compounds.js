import knitLogger from '~/config/logger'

function callActionWhen (predicate) {
  return function (action) {
    if (predicate(this)) {
      return action
    }

    knitLogger.debug(() => `Predicate: ${JSON.stringify(predicate)} evaluated to false, no action called!`)
    this.methods.cancel()
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

import knitLogger from '~/config/logger'

function squashErrorsCall (message = '') {
  return function (action) {
    return Promise
      .resolve(action())
      .catch(async (err) => {
        knitLogger.debug(() => err)
        knitLogger.debug(() => message)

        await this.methods.promisesBoundCaller(this.fail, this.that, this.ctx, this.params, null)
      })
  }
}

export default {
  squashErrorsCall
}

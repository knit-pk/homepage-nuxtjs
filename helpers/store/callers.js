import knitLogger from '~/config/logger'

function call (actionName = '') {
  return function (action) {
    return Promise
      .resolve(action())
      .catch(async (err) => {
        knitLogger.debug(() => `Calling action: ${actionName}`)
        knitLogger.debug(() => err)

        // Await for all failure methods
        await this.methods.promisesBoundCaller(this.fail, this.that, this.ctx, this.params, null)

        // Propagate the err
        throw new Error({ type: 'actionError', message: 'Action did not succeded!' })
      })
  }
}

export default {
  call
}

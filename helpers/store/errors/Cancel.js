export const CANCEL = 'CANCEL'

export class Cancel extends Error {
  constructor (actionName) {
    super(`Canceling others on stack for action: ${actionName}`)
    this.name = CANCEL
  }
}

export const ACTION_FAIL = 'ActionFail'

export class ActionFail extends Error {
  constructor (actionName) {
    super(`Action failed: ${actionName}`)
    this.name = ACTION_FAIL
  }
}

export default class ActionFail extends Error {
  constructor (actionName) {
    super(`Action failed: ${actionName}`)
    this.name = 'ActionFail'
  }
}

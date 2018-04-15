export default class ActionCancel extends Error {
  constructor (actionName) {
    super(`Action canceled: ${actionName}`)
    this.name = 'ActionCancel'
  }
}

export default class RestrictedMethodException extends Error {
  constructor (method, allowed) {
    super(`Method '${method.toUpperCase()}' is restricted to use. Allowed methods: ${allowed.join(', ')}`)
  }
}

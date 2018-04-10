function doSth (fn) {
  return function (bound) {
    return Promise.resolve(fn(bound))
  }
}

export default {
  doSth
}

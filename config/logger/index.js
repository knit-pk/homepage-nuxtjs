const knitLogger = process.env.NODE_ENV === 'debug' ?
  {
    debug (fn) {
      console.log(fn())
    },
  } :
  {
    debug () {},
  }

export default knitLogger

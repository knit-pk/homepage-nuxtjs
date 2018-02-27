const knitLogger = process.env.NODE_ENV === 'debug' ?
  {
    debug: console.log
  } :
  {
    debug: () => {}
  }

export default knitLogger

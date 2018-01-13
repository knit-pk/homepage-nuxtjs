const knitLogger = process.env.ENV === 'debug' ?
  {
    debug: console.log
  } :
  {
    debug: () => {}
  }

export default knitLogger

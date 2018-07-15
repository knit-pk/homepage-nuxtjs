export default function (ctx) {
  const store = ctx.store
  const userAgent = ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent

  ctx.isMobile = /Mobile|iP(?:hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(?:hpw|web)OS|Fennec|Minimo|Opera M(?:obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/i.test(userAgent)
  store.dispatch('general/applyRess', ctx.isMobile)
}

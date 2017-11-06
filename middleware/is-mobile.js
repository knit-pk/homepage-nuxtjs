export default function (ctx) {
  const userAgent = ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent
  ctx.isMobile = /Mobile|iP(?:hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(?:hpw|web)OS|Fennec|Minimo|Opera M(?:obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/i.test(userAgent)
}

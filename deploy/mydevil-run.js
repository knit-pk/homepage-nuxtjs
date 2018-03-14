process.env.NODE_ENV = 'development'

const resolve = require('path').resolve
const nxt = require('nuxt')
const Nuxt = nxt.Nuxt
const Builder = nxt.Builder

// Init Nuxt.js and start listening on localhost:4000
const rootDir = resolve(__dirname, '.')
let config = {}

try {
  config = require(resolve(rootDir, 'nuxt.config.js'))
} catch (e) {}

config.rootDir = rootDir // project folder
config.dev = false // production build

// Prefer env from process
const API_URL = process.env.API_URL || config.env.API_URL
if (typeof API_URL === 'undefined') {
  throw new Error('API_URL enviroment variable is required')
}
console.log('API_URL: ' + API_URL)
config.env.API_URL = API_URL

const nuxt = new Nuxt(config)
new Builder(nuxt).build().then(() => {
  nuxt.listen(4000, 'localhost')
})

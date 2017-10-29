const nodeExternals = require('webpack-node-externals')
const resolve = (dir) => require('path').join(__dirname, dir)

module.exports = {
  env: require('dotenv').config().parsed,
  /*
  ** Headers of the page
  */
  head: {
    title: 'homepage-nuxtjs',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  plugins: ['~/plugins/http-common.js'],
  /*
  ** Build configuration
  */
  router: {
    middleware: ['is-mobile']
  },
  css: [
    '~/assets/scss/reset.scss',
    '~/node_modules/normalize.css/normalize.css'
  ],
  build: {
    babel: {
      plugins: [
        ['transform-imports', {
          'vuetify': {
            // eslint-disable-next-line
            'transform': 'vuetify/es5/components/${member}',
            'preventFullImport': true
          }
        }]
      ]
    },
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ]
      }

      config.module.rules.forEach(rule => {
        if (rule.test.toString() === '/\\.styl(us)?$/') {
          rule.use.push({
            loader: 'vuetify-loader',
            options: {
              theme: resolve('./assets/vuetify-styles/theme.styl')
            }
          })
        }
      })
    }
  }
}

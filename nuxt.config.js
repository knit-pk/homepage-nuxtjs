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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400&amp;subset=latin-ext' },
      { rel: 'stylesheet', href: 'https://cdn.rawgit.com/konpa/devicon/df6431e323547add1b4cf45992913f15286456d3/devicon.min.css' }
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
    '~/node_modules/normalize.css/normalize.css',
    '~/assets/scss/main.scss',
    '~/static/fonts/flaticon/flaticon.css'
  ],
  build: {
    vendor: ['axios', 'lodash', 'qs'],
    /*
    ** Run ESLint on save
    */
    extend(config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

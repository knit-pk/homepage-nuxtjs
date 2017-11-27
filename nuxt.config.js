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
    script: [],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdn.rawgit.com/konpa/devicon/df6431e323547add1b4cf45992913f15286456d3/devicon.min.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600&amp;subset=latin-ext' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  plugins: ['~/plugins/http-common.js', '~/plugins/prevent-scroll.js'],
  modules: [
    ['bootstrap-vue/nuxt', { css: false }]
  ],
  /*
  ** Build configuration
  */
  router: {},
  css: [
    '~/node_modules/normalize.css/normalize.css',
    '~/static/fonts/flaticon/flaticon.css',
    '~/assets/scss/vue-scrollbar.scss',
    '~/assets/bootstrap/custom.scss',
    '~/assets/scss/main.scss'
  ],
  build: {
    vendor: ['axios', 'lodash', 'qs', 'vue2-scrollbar'],
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
    }
  }
}

const ssrDirectives = require('./directives/ssr')
const StylelintPlugin = require('stylelint-webpack-plugin')

const env = process.env.NODE_ENV === 'production' ? process.env : Object.assign({}, require('dotenv').config().parsed, process.env)

if (!env.NODE_ENV) {
  throw new Error('NODE_ENV variable must be defined')
}

if (!env.API_URL) {
  throw new Error('API_URL variable must be defined.')
}

module.exports = {
  env,
  head: {
    htmlAttrs: {
      lang: 'pl-PL',
    },
    title: 'Koło Naukowe IT - Politechnika Krakowska',
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js project',
      },
    ],
    script: [],
    link: [
      {
        rel: 'shortcut icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'preconnect',
        href: env.API_URL,
        crossorigin: 'anonymous',
      },
      {
        rel: 'stylesheet preload',
        as: 'style',
        href: 'https://use.fontawesome.com/releases/v5.0.10/css/all.css',
        integrity: 'sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg',
        crossorigin: 'anonymous',
      },
      {
        rel: 'stylesheet preload',
        as: 'style',
        href: 'https://cdn.rawgit.com/konpa/devicon/df6431e323547add1b4cf45992913f15286456d3/devicon.min.css',
      },
      {
        rel: 'stylesheet preload',
        as: 'style',
        href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600&subset=latin,latin-ext',
      },
      {
        rel: 'stylesheet preload',
        as: 'style',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css',
      },
    ],
  },
  loading: {
    color: '#3B8070',
  },
  plugins: [
    '~/plugins/prevent-scroll.js',
    '~/plugins/vue-markdown.js',
    '~/plugins/vue-config-manager.js',
    '~/plugins/inject-directives.js',
  ],
  render: {
    bundleRenderer: {
      directives: {
        ...ssrDirectives,
      },
    },
  },
  modules: [
    [
      '@nuxtjs/axios', {
        credentials: false,
      },
    ],
    [
      'bootstrap-vue/nuxt', {
        css: false,
      },
    ],
  ],
  router: {
    middleware: ['is-mobile'],
  },
  css: [
    '~/assets/scss/custom-components/vue-scrollbar.scss',
    '~/node_modules/normalize.css/normalize.css',
    '~/assets/bootstrap/custom.scss',
    '~/assets/scss/main.scss',
  ],
  build: {
    vendor: ['axios', 'lodash', 'qs', 'vue2-scrollbar'],
    extend (config, ctx) {
      // Vue loader
      const vueLoader = config.module.rules.find(rule => rule.loader === 'vue-loader')
      vueLoader.options = Object.assign({}, vueLoader.options, {
        preserveWhitespace: false,
      })

      // Eslint configuration
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
    },
    plugins: [
      new StylelintPlugin({
        files: ['components/**/*.vue', 'layouts/**/*.vue', 'pages/**/*.vue'],
        syntax: 'scss',
      }),
    ],
  },
}

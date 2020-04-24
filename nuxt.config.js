const sitemapRoutes = require('./utils/sitemap-routes')

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Vue Screencasts - Intermediate and Advanced Tutorials, Trainings, and Mentorship',
    meta: [
      {charset: 'utf-8' },
      {name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      {hid: 'og-title', property: 'og:title', content: 'VueScreencasts - Intermediate and Advanced Tutorials, Trainings, and Mentorship'},
      {hid: 'og-site-name', property: 'og:site_name', content: "VueScreencasts.com"},
      {hid: 'og-image', property: 'og:image', content: 'https://vue-screencasts-uploads.s3-us-west-2.amazonaws.com/thumbnails/logo.png'},
      {hid: 'og-image-url', property: 'og:image:url', content: 'https://vue-screencasts-uploads.s3-us-west-2.amazonaws.com/thumbnails/logo.png'},
      {hid: 'og-image-width', property: 'og:image:width', content: 1280},
      {hid: 'og-image-height', property: 'og:image:height', content: 720},
      {hid: 'og-image-type', property: 'og:image:type', content: "image/jpeg"},
      {hid: 'twitter-card', property: 'twitter:card'},
      {hid: 'twitter-site', property: 'twitter:site', content: 'VueScreencasts.com'},
      {hid: 'twitter-creator', property: 'twitter:creator', content: 'vuescreencasts'},

      // Overwrite the following in different pages
      {hid: 'twitter-img-src', property: 'twitter:image', content: 'https://vue-screencasts-uploads.s3-us-west-2.amazonaws.com/thumbnails/logo.png'},
      {hid: 'twitter-title', property: 'twitter:title', content: 'VueScreencasts.com'},
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  vue: {
    config: {
      productionTip: false,
      devtools: true
    }
  },

  env: {
    stripeEnv: process.env.stripeEnv,
    stripePublicKey: process.env.stripePublicKey,
  },
  
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/vuetify-datetime-picker',
    { src: "~/plugins/vue-timer", mode: 'client'},
    { src: '@/plugins/vue-shortkey.js', mode: 'client' },
    '~/plugins/vue2-filters'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module'
    '@nuxtjs/vuetify',
    ['@nuxtjs/google-analytics', {
      id: 'UA-154843930-1'
    }],
    ['nuxt-stripe-module', {
      version: 'v3',
      //TODO: change publishableKey based on environment
      publishableKey: 'pk_test_EiveKNyPoW3C9bpmpEJXuawF' 
    }],
    '@nuxtjs/dotenv',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    ['nuxt-fontawesome', {
      imports: [
        //import whole set
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['fas']
        },
        {
          set: '@fortawesome/free-brands-svg-icons',
          icons: ['fab']
        }
      ]
    }],
    ['vue-currency-filter/nuxt', {
      symbol: '$',
      thousandsSeparator: ',',
      fractionCount: 0,
      fractionSeparator: '.',
      symbolPosition: 'front',
      symbolSpacing: false
    }],
    '@nuxtjs/sitemap'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000/api'
  },

  sitemap: {
    exclude: [
      '/account/**',
      '/account',
      '/admin/**',
      '/admin',
    ],
    routes: async () => {
      let baseUrl =  process.env.BASE_URL || 'http://localhost:3000/api'
      return await sitemapRoutes(baseUrl)
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    },

    transpile: ['vuetify-datetime-picker']
  },

  server: {
    port: process.env.PORT || 8000
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/sessions', method: 'post', propertyName: 'token' },
          logout: false,
          user: { url: '/sessions/user', method: 'get', propertyName: 'data.attributes' }
        },
        // tokenRequired: true,
        tokenType: '',
      },
    },
    redirect: {
      home: false,
      callback: false,
      logout: false
    }
  },
}

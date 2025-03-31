export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  compatibilityDate: '2025-03-30',
  pockethost: {
    baseURL: 'https://cream-east.pockethost.io/',
    redirectOptions: {
      login: '/login',
    },
  },
})

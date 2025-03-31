export default defineNuxtConfig({
  modules: ['../src/module'],
  pockethost: {
    baseURL: 'https://cream-east.pockethost.io/',
    redirectOptions: {
      login: '/login'
    }
  },
  devtools: { enabled: true },
  compatibilityDate: '2025-03-30',
})
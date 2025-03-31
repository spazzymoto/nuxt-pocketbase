import PocketBase from 'pocketbase'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin((_nuxtApp) => {
  const config = useRuntimeConfig()

  return {
    provide: {
      pb: new PocketBase(config.public.pockethost.baseURL),
    },
  }
})

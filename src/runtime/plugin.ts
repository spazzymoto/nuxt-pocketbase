import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import PocketBase from 'pocketbase';

export default defineNuxtPlugin((_nuxtApp) => {
  const config = useRuntimeConfig();

  return {
    provide: {
        pb: new PocketBase(config.public.pockethost.baseURL)
    }
}
})

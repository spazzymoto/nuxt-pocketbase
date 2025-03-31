import { defineNuxtModule, addPlugin, addImportsDir, createResolver } from '@nuxt/kit'

export interface RedirectOptions {
  login: string
  include?: string[]
  exclude?: string[]
}

// Module options TypeScript interface definition
export interface ModuleOptions {
  baseURL: string
  redirectOptions?: RedirectOptions
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'pockethost',
    configKey: 'pockethost',
  },
  // Default configuration options of the Nuxt module
  defaults: { },
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    if (!_options.baseURL) {
      console.warn('Missing pockethost url, set it either in `nuxt.config.js` or via env variable')
    }

    _nuxt.options.runtimeConfig.public.pockethost = _options

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
    addImportsDir(resolver.resolve('./runtime/composables'))

    if (_options.redirectOptions) {
      addPlugin(resolver.resolve('./runtime/middleware/auth-redirect'))
    }
  },
})

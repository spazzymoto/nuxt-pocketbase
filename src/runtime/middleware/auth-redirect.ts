import { defineNuxtPlugin, addRouteMiddleware, defineNuxtRouteMiddleware, useRuntimeConfig, navigateTo, usePockethost } from '#imports'
import type { Plugin } from '#app'
import type { RouteLocationNormalized } from '#vue-router'

export default defineNuxtPlugin({
  name: 'auth-redirect',
  setup() {
    addRouteMiddleware(
      'global-auth',
      defineNuxtRouteMiddleware((to: RouteLocationNormalized) => {
        console.log('defineNuxtRouteMiddleware')
        const config = useRuntimeConfig()
        const { login, include, exclude } = config.public.pockethost.redirectOptions

        // Redirect only on included routes (if defined)
        if (include && include.length > 0) {
          const isIncluded = include.some((path: string) => {
            const regex = new RegExp(`^${path.replace(/\*/g, '.*')}$`)
            return regex.test(to.path)
          })
          if (!isIncluded) {
            return
          }
        }

        // Do not redirect on login route and excluded routes
        const isExcluded = [...exclude ?? [], login]?.some((path) => {
          const regex = new RegExp(`^${path.replace(/\*/g, '.*')}$`)
          return regex.test(to.path)
        })
        if (isExcluded) return

        const pb = usePockethost()
        if (!pb.authStore.isValid) {
          return navigateTo(login)
        }
      }),
      { global: true },
    )
  },
}) as Plugin

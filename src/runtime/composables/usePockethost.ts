import type PocketBase from 'pocketbase'
import { useNuxtApp } from '#imports'

export const usePockethost = () => {
  const { $pb } = useNuxtApp()
  if (!$pb) throw new Error('Pockethost plugin not accessible')

  return $pb as PocketBase
}

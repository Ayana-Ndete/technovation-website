import { useRuntimeConfig } from "#imports"

/** Keep API requests under the same deployment base as the Nuxt router. */
export function useApi() {
  return $fetch.create({ baseURL: useRuntimeConfig().app.baseURL })
}

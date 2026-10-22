export default defineNuxtRouteMiddleware(async () => {
  // SSR access is enforced by server/middleware/admin-auth.ts before Nuxt
  // renders the route. Keep this check for client-side navigation.
  if (import.meta.server) return
  const api = useApi()
  try {
    const data = await api<{ admin: { id: number; name: string; email: string } | null }>("api/auth/me")
    if (!data.admin) return navigateTo("/admin/login")
  } catch {
    return navigateTo("/admin/login")
  }
})

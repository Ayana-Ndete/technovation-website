<script setup lang="ts">
import logoImage from "../../../src/assets/images/brand/technovation-logo.png"
const api = useApi()
const email = ref("")
const password = ref("")
const error = ref("")
const busy = ref(false)

const { data } = await useFetch<{ admin: { id: number; name: string; email: string } | null }>("api/auth/me", { key: "admin-session-login", baseURL: useRuntimeConfig().app.baseURL })
if (data.value?.admin) await navigateTo("/admin/posts")

async function login() {
  error.value = ""
  busy.value = true
  try {
    await api("api/auth/login", {
      method: "POST",
      body: { email: email.value, password: password.value },
    })
    await navigateTo("/admin/posts")
  } catch (err: any) {
    error.value = err?.data?.statusMessage || "Login failed"
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <main class="admin-shell admin-login-shell">
    <section class="admin-card admin-login-card">
      <img :src="logoImage" alt="" width="54" height="54" />
      <p class="admin-kicker">TECHNOVATION / ADMIN</p>
      <h1>Code Centre login</h1>
      <p>Publishing access is restricted to authorised administrators.</p>
      <form @submit.prevent="login">
        <label>Email<input v-model="email" type="email" autocomplete="username" required /></label>
        <label>Password<input v-model="password" type="password" autocomplete="current-password" required /></label>
        <p v-if="error" class="admin-error" role="alert">{{ error }}</p>
        <button type="submit" :disabled="busy">{{ busy ? "Signing in…" : "Sign in" }}</button>
      </form>
      <NuxtLink to="/code-centre">← Back to Code Centre</NuxtLink>
    </section>
  </main>
</template>

<style src="~/assets/admin.css"></style>

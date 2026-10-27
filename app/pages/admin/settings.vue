<script setup lang="ts">
definePageMeta({ middleware: "admin" })
const api = useApi()
const showCodeCentreOnHome = ref(true)
const loading = ref(true)
const saving = ref(false)
const error = ref("")
const saved = ref(false)
async function load() {
  loading.value = true; error.value = ""
  try { const settings = await api<{ showCodeCentreOnHome: boolean }>("api/admin/settings"); showCodeCentreOnHome.value = settings.showCodeCentreOnHome }
  catch (err: any) { error.value = err?.data?.statusMessage || "Could not load website settings" }
  finally { loading.value = false }
}
async function save() {
  saving.value = true; error.value = ""; saved.value = false
  try { const settings = await api<{ showCodeCentreOnHome: boolean }>("api/admin/settings", { method: "PUT", body: { showCodeCentreOnHome: showCodeCentreOnHome.value } }); showCodeCentreOnHome.value = settings.showCodeCentreOnHome; saved.value = true }
  catch (err: any) { error.value = err?.data?.statusMessage || "Could not save website settings" }
  finally { saving.value = false }
}
onMounted(load)
</script>
<template>
  <main class="admin-shell"><div class="admin-container">
    <header class="admin-topbar"><div><p class="admin-kicker">ADMIN / WEBSITE SETTINGS</p><h1>Website Settings</h1></div><div class="admin-actions"><NuxtLink class="admin-button admin-secondary" to="/admin/posts">Posts</NuxtLink><NuxtLink class="admin-button admin-secondary" to="/code-centre">View Code Centre</NuxtLink></div></header>
    <p v-if="loading">Loading settings…</p>
    <form v-else class="admin-card admin-form" @submit.prevent="save">
      <h2>Home Page</h2>
      <label class="admin-toggle-row"><span><strong>Show Code Centre on homepage</strong><small>Controls the existing Code Centre promotion only. Its direct page remains available.</small></span><input v-model="showCodeCentreOnHome" class="admin-toggle" type="checkbox" role="switch" /></label>
      <p v-if="error" class="admin-error">{{ error }}</p><p v-else-if="saved" class="admin-success" role="status">Settings saved.</p>
      <div class="admin-form-actions"><button type="submit" :disabled="saving">{{ saving ? "Saving…" : "Save settings" }}</button></div>
    </form>
  </div></main>
</template>
<style src="~/assets/admin.css"></style>

<script setup lang="ts">
const api = useApi()
definePageMeta({ middleware: "admin" })
const route = useRoute()
const id = String(route.params.id)
const form = reactive({ title: "", summary: "", topic: "Java", kind: "Error & solution", author: "", body: "", status: "DRAFT" })
const error = ref("")
const busy = ref(false)
const loading = ref(true)

onMounted(async () => {
  try {
    const posts = await api<any[]>("api/admin/posts")
    const post = posts.find((item) => item.id === id)
    if (!post) { error.value = "Post not found"; return }
    Object.assign(form, { title: post.title, summary: post.summary, topic: post.topic, kind: post.kind, author: post.author, body: post.body, status: post.status })
  } catch (err: any) { error.value = err?.data?.statusMessage || "Could not load post" }
  finally { loading.value = false }
})

async function save() {
  busy.value = true; error.value = ""
  try { await api(`api/admin/posts/${id}`, { method: "PUT", body: form }); await navigateTo("/admin/posts") }
  catch (err: any) { error.value = err?.data?.statusMessage || "Could not update post" }
  finally { busy.value = false }
}
</script>
<template>
  <main class="admin-shell"><div class="admin-container">
    <header class="admin-topbar"><div><p class="admin-kicker">CODE CENTRE / EDIT POST</p><h1>Edit post</h1></div><NuxtLink class="admin-button admin-secondary" to="/admin/posts">← Back</NuxtLink></header>
    <p v-if="loading">Loading…</p>
    <form v-else class="admin-card admin-form" @submit.prevent="save">
      <div class="admin-grid"><label>Post title<input v-model="form.title" maxlength="140" required></label><label>Author<input v-model="form.author" maxlength="80" required></label><label>Topic<select v-model="form.topic"><option>Java</option><option>DevOps</option></select></label><label>Post type<select v-model="form.kind"><option>Error & solution</option><option>Code snippet</option><option>Guide</option></select></label></div>
      <label>Short summary<textarea v-model="form.summary" maxlength="300" rows="3" required /></label>
      <label>Article content <span class="admin-help">Use ## for headings and triple backticks for code blocks.</span><textarea v-model="form.body" rows="20" required /></label>
      <label>Status<select v-model="form.status"><option value="DRAFT">Draft</option><option value="PUBLISHED">Published</option></select></label>
      <p v-if="error" class="admin-error">{{ error }}</p>
      <div class="admin-form-actions"><button type="submit" :disabled="busy">{{ busy ? "Saving…" : "Save changes" }}</button><NuxtLink class="admin-button admin-secondary" to="/admin/posts">Cancel</NuxtLink></div>
    </form>
  </div></main>
</template>
<style src="~/assets/admin.css"></style>

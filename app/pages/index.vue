<script setup lang="ts">
import PageContent from "../../src/App"

type PublicSiteSettings = { showCodeCentreOnHome: boolean }
const { data: settings } = await useFetch<PublicSiteSettings>("api/settings", {
  baseURL: useRuntimeConfig().app.baseURL,
  default: () => ({ showCodeCentreOnHome: true }),
})
</script>

<template>
  <PageContent :show-code-centre-on-home="settings?.showCodeCentreOnHome ?? true" />
</template>

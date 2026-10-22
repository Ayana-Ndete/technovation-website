<script setup lang="ts">
const route = useRoute()
await navigateTo({ path: '/about', hash: route.hash || '#history' }, { replace: true })
</script>

<template><div /></template>

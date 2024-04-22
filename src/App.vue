<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <AppHeader />
  <div class="min-h-screen">
    <RouterView />
  </div>
  <AppFooter />
</template>

<style scoped></style>

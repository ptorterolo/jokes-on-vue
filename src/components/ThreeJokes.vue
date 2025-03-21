<template>
  <section class="p-4 lg:py-10 bg-white/20 rounded-xl">
    <div class="flex justify-between mb-4">
      <p class="font-medium text-lg">Last from {{ category }}</p>
      <RouterLink class="font-medium" v-if="jokes.data?.length" :to="{ name: 'jokesByCategory', params: { category } }">
        Read All</RouterLink>
    </div>
    <template v-if="jokes.isLoading">
      <div class="flex items-center justify-center">
        <IconSpinner class="text-red-500" />
      </div>
    </template>
    <div v-if="jokes.data?.length" class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <template v-for="joke in jokes.data" :key="joke.id">
        <JokeCard :joke="joke" />
      </template>
    </div>
    <div v-if="jokes.error">
      <p class="text-red-500">{{ jokes.error }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import JokeCard from '@/components/JokeCard.vue'
import IconSpinner from '@/components/icons/IconSpinner.vue'
import { ref } from 'vue'
import useAxios from '@/composables/useAxios'
import type { useAxiosComposable } from '@/types'
interface Props {
  category?: string
}

const props = withDefaults(defineProps<Props>(), {
  category: 'Christmas'
})
const jokes = ref<useAxiosComposable>(useAxios(`${props.category}`, { amount: 3 }))
</script>

<style scoped></style>

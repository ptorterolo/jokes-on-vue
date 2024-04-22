<template>
  <div class="card bg-base-100 shadow-xl hover:bg-gray-100 transition duration-200">
    <div class="card-body justify-between">
      <template v-if="joke.type == 'single'">
        <h2 class="card-title text-wrap">
          {{ joke.joke }}
        </h2>
      </template>
      <template v-if="joke.type == 'twopart'">
        <h2 class="card-title text-wrap">
          {{ joke.setup }}
        </h2>
        <p class="text-wrap">{{ joke.delivery }}</p>
      </template>

      <div class="card-actions items-center justify-between">
        <div class="flex gap-2">
          <button
            class="btn btn-circle"
            :class="{ 'btn-error': isFavorite }"
            @click="toggleFavorite"
          >
            <IconLaughColor v-if="isFavorite" />
            <IconLaughBase v-else />
          </button>
        </div>

        <div v-if="showCategory" class="flex gap-2">
          <div class="badge badge-outline badge-lg hover:bg-primary/50 hover:text-white">
            <RouterLink
              class="font-medium"
              :to="{ name: 'jokesByCategory', params: { category: joke.category } }"
              >{{ joke.category }}</RouterLink
            >
          </div>
          <div class="badge badge-outline badge-lg capitalize">{{ joke.type }} Joke</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Joke } from '@/types'
import IconLaughBase from '@/components/icons/IconLaughBase.vue'
import IconLaughColor from '@/components/icons/IconLaughColor.vue'
import { useJokesStore } from '@/stores/jokes'
import { computed } from 'vue'
const store = useJokesStore()
interface Props {
  joke?: Joke
  showCategory?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  joke: {},
  showCategory: true
})

function toggleFavorite() {
  if (isFavorite.value) {
    store.removeFromFavorites(props.joke)
  } else {
    store.addToFavorites(props.joke)
  }
}

const isFavorite = computed(() => {
  const index = store.favorites.findIndex((item) => item.id == props.joke.id)
  return index !== -1
})
</script>

<style scoped></style>

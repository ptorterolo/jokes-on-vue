<template>
  <main>
    <section class="bg-gradient-to-br from-violet-100 via-teal-300 to-cyan-500 py-4">
      <div class="container min-h-screen">
        <div class="flex gap-4" v-if="jokes.length">
          <div class="lg:w-1/4">
            <JokesFilters
              @items-per-page-updated="updateItemsPerPage"
              :paramsToShow="['type', 'sortBy', 'sortDirection', 'itemsPerPage']"
            />
            <button
              type="button"
              class="btn btn-error text-white my-4 w-full block"
              v-if="jokes.length"
              @click="removeAllFavorites"
            >
              Remove all favorites jokes
            </button>
          </div>
          <div class="lg:w-3/4">
            <div v-for="joke in paginatedItems" :key="joke.id">
              <JokeCard :joke="joke" class="my-4" />
            </div>
            <div class="flex justify-between rounded my-4">
              <button class="btn" @click="prevPage" :disabled="currentPage === 1">Previous</button>
              <button class="btn" @click="nextPage" :disabled="currentPage === totalPages">
                Next
              </button>
            </div>
          </div>
        </div>
        <template v-else>
          <div class="flex justify-center items-center">
            <div class="card w-96 bg-white mt-4">
              <div class="card-body items-center text-center">
                <h2 class="card-title">No favorites jokes were added yet</h2>
                <p>Add some jokes to your favorites to see them here</p>
                <div class="card-actions justify-end">
                  <RouterLink
                    class="btn btn-primary text-white btn-sm btn-outline"
                    :to="{ name: 'jokes' }"
                    >Read some jokes!</RouterLink
                  >
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import JokeCard from '@/components/JokeCard.vue'
import JokesFilters from '@/components/JokesFilters.vue'
import { computed, ref, onUnmounted } from 'vue'
import { useJokesStore } from '@/stores/jokes'
const store = useJokesStore()

const jokes = computed(() => store.favorites)
function removeAllFavorites() {
  store.removeAllFavorites()
}

const currentPage = ref(1)
const itemsPerPage = ref(10)

const paginatedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value
  const endIndex = startIndex + itemsPerPage.value

  return jokes.value.slice(startIndex, endIndex)
})
const totalPages = computed(() => {
  return Math.ceil(jokes.value.length / itemsPerPage.value)
})

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}
function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

function updateItemsPerPage(value: number) {
  itemsPerPage.value = value
  currentPage.value = 1
}
store.setWorkingWithFavorites(true)
onUnmounted(() => {
  store.setWorkingWithFavorites(false)
})
</script>

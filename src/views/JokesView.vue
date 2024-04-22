<template>
  <main>
    <section class="bg-gradient-to-br from-violet-100 via-teal-300 to-cyan-500 py-4">
      <div class="container min-h-screen py-4">
        <div class="flex gap-4">
          <div class="lg:w-1/4">
            <JokesFilters
              id="jokes-filters"
              @mainCategoryUpdated="updateMainCategory"
              @params-updated="updateParams"
              @items-per-page-updated="updateItemsPerPage"
            />
          </div>
          <div class="lg:w-3/4">
            <template v-if="isLoading">
              <div class="flex flex-column h-full items-center justify-center">
                <IconSpinner class="text-white" />
              </div>
            </template>
            <template v-for="joke in paginatedItems" :key="joke.id">
              <JokeCard :joke="joke" class="joke my-4" />
            </template>
            <div class="flex justify-between rounded my-4">
              <button class="btn" @click="prevPage" :disabled="currentPage === 1">Previous</button>
              <button class="btn" @click="nextPage">Next</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import JokeCard from '@/components/JokeCard.vue'
import JokesFilters from '@/components/JokesFilters.vue'
import IconSpinner from '@/components/icons/IconSpinner.vue'
import { ref, computed, onMounted } from 'vue'
import axiosInstance from '@/services/axios'
import { useJokesStore } from '@/stores/jokes'
import type { RequestParams } from '@/types'
const store = useJokesStore()
const isLoading = ref(false)

const jokes = computed(() => store.jokes)
const params = ref<RequestParams>({
  amount: 10
})
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
  } else if (currentPage.value === totalPages.value) {
    getData()
    currentPage.value++
  }
}

function updateItemsPerPage(value: number) {
  itemsPerPage.value = value
  currentPage.value = 1
}

const mainCategory = ref('Any')
function updateMainCategory(category: string) {
  mainCategory.value = category
  getData()
}
function updateParams(data: RequestParams) {
  params.value = { amount: 10, ...data }
  getData(true)
}
async function getData(removeAllJokes = false) {
  isLoading.value = true
  if (removeAllJokes) store.removeAllJokes()
  try {
    const response = await axiosInstance.get(`/joke/${mainCategory.value}`, {
      params: params.value
    })
    if (response.data.error) {
      console.log(response.data.error)
      return
    }
    store.addJokes(response.data.jokes)
  } catch (error) {
    console.log(error)
  }
  isLoading.value = false
}

onMounted(() => {
  store.removeAllJokes()
  getData()
})
</script>

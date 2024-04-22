<template>
  <div class="card bg-white shadow-xl mt-4">
    <div class="card-body">
      <!-- CATEGORY -->
      <div v-if="paramsToShow.includes('category')">
        <h2 class="font-medium">Category/Categories</h2>
        <div class="form-control">
          <label class="label cursor-pointer">
            <input
              type="radio"
              name="radio-1"
              value="Any"
              class="radio radio-sm"
              v-model="mainCategory"
            />
            <span class="label-text">Any</span>
          </label>
        </div>
        <div class="form-control">
          <label class="label cursor-pointer">
            <input
              type="radio"
              name="radio-2"
              value="Custom"
              class="radio radio-sm"
              v-model="mainCategory"
            />
            <span class="label-text">Custom</span>
          </label>
        </div>
        <div v-if="mainCategory == 'Custom'" class="bg-gray-100 p-2 rounded-lg">
          <div class="form-control" v-for="(category, index) in categories" :key="index">
            <label class="cursor-pointer label">
              <input
                type="checkbox"
                class="checkbox checkbox-sm"
                :value="category"
                v-model="checkedCategories"
              />
              <span class="label-text capitalize">{{ category }}</span>
            </label>
          </div>
        </div>
      </div>
      <!-- TYPE -->
      <div v-if="paramsToShow.includes('type')">
        <h2 class="font-medium">Joke Type</h2>
        <div class="form-control">
          <label class="cursor-pointer label">
            <input
              type="checkbox"
              class="checkbox checkbox-sm"
              value="single"
              v-model="checkedJokeType"
            />
            <span class="label-text">Single</span>
          </label>
        </div>
        <div class="form-control">
          <label class="cursor-pointer label">
            <input
              type="checkbox"
              class="checkbox checkbox-sm"
              value="twopart"
              v-model="checkedJokeType"
            />
            <span class="label-text">Twopart</span>
          </label>
        </div>
      </div>
      <!-- FLAGS -->
      <div v-if="paramsToShow.includes('flags')">
        <h2 class="font-medium">Flags To Blacklist</h2>
        <div class="form-control" v-for="(flag, index) in flagsToBlacklist" :key="index">
          <label class="cursor-pointer label">
            <input
              type="checkbox"
              class="checkbox checkbox-sm"
              :value="flag"
              v-model="checkedFlags"
            />
            <span class="label-text capitalize">{{ flag }}</span>
          </label>
        </div>
      </div>
      <!-- SORT BY -->
      <div v-if="paramsToShow.includes('sortBy')">
        <h2 class="font-medium mb-1">Sort By</h2>
        <select
          v-model="sortBy"
          @change="sortByUpdated"
          class="select select-bordered w-full max-w-xs"
        >
          <option disabled value="" selected>Choose an option</option>
          <option value="type">Joke Type</option>
          <option value="category">Category</option>
        </select>
      </div>
      <!-- SORT DIRECTION -->
      <div v-if="paramsToShow.includes('sortDirection')">
        <h2 class="font-medium">Sort Direction</h2>
        <div class="form-control">
          <label class="label cursor-pointer">
            <input
              type="radio"
              name="radio-3"
              value="asc"
              class="radio radio-sm"
              v-model="sortDirection"
            />
            <span class="label-text">Asc</span>
          </label>
        </div>
        <div class="form-control">
          <label class="label cursor-pointer">
            <input
              type="radio"
              name="radio-4"
              value="desc"
              class="radio radio-sm"
              v-model="sortDirection"
            />
            <span class="label-text">Desc</span>
          </label>
        </div>
      </div>
      <!-- ITEMS PER PAGE -->
      <div v-if="paramsToShow.includes('itemsPerPage')">
        <h2 class="font-medium mb-1">Items per page</h2>
        <select
          v-model.number="itemsPerPage"
          @change="emits('itemsPerPageUpdated', itemsPerPage)"
          class="select select-bordered w-full max-w-xs"
        >
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useJokesStore } from '@/stores/jokes'
const store = useJokesStore()

const emits = defineEmits(['params-updated', 'mainCategoryUpdated', 'itemsPerPageUpdated'])
interface Props {
  paramsToShow?: string[]
}
withDefaults(defineProps<Props>(), {
  paramsToShow: () => ['category', 'type', 'flags', 'sortBy', 'sortDirection', 'itemsPerPage']
})
const categories = ['Misc', 'Programming', 'Pun', 'Spooky', 'Christmas', 'Dark']
const flagsToBlacklist = ['nsfw', 'religious', 'political', 'racist', 'sexist', 'explicit']

const mainCategory = ref('Any')
const checkedCategories = ref([])
const checkedJokeType = ref(['single', 'twopart'])
const checkedFlags = ref([])
const sortBy = ref('')
const itemsPerPage = ref(10)
const sortDirection = ref('')

function sortByUpdated() {
  store.setSortBy(sortBy.value)
}

watch(mainCategory, (value) => {
  if (value.toLowerCase() === 'any') {
    // reset checkedCategories
    checkedCategories.value.splice(0)
    emits('mainCategoryUpdated', value)
  }
})
watch(checkedCategories, (value) => {
  if (value.length) {
    const categories = value.join(',')
    emits('mainCategoryUpdated', categories)
  }
})

watch(sortDirection, (value) => {
  store.setSortDirection(value)
})

watch([checkedJokeType, checkedFlags], ([jokeTypeValues, flagsValues]) => {
  const paramsObj = {
    ...(flagsValues.length && { blacklistFlags: flagsValues.join(',') }),
    ...(jokeTypeValues.length == 1 && { type: jokeTypeValues[0] })
  }
  emits('params-updated', paramsObj)
})
</script>

<style scoped></style>

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Joke } from '../types'

export const useJokesStore = defineStore('jokes', () => {
  const jokes = ref<Joke[]>([])
  const favorites = ref<Joke[]>([])
  const sortDirection = ref('')
  const sortBy = ref('')
  const workingWithFavorites = ref(false)

  if (localStorage.getItem('jokes')) {
    jokes.value = JSON.parse(localStorage.getItem('jokes')!)
  }

  if (localStorage.getItem('favorites')) {
    favorites.value = JSON.parse(localStorage.getItem('favorites')!)
  }
  const setWorkingWithFavorites = (value: boolean) => {
    workingWithFavorites.value = value
  }
  const setSortBy = (value: string) => {
    sortBy.value = value
    sortJokes()
  }
  const setSortDirection = (value: string) => {
    sortDirection.value = value
    sortJokes()
  }

  const sortJokes = () => {
    const arrToSort = workingWithFavorites.value ? favorites.value : jokes.value
    arrToSort.sort((a, b) => {
      const propA = a[sortBy.value]
      const propB = b[sortBy.value]

      if (propA < propB) return sortDirection.value === 'asc' ? -1 : 1
      if (propA > propB) return sortDirection.value === 'asc' ? 1 : -1
      return 0
    })
  }

  const removeAllJokes = () => {
    jokes.value = []
    localStorage.removeItem('jokes')
  }

  const removeAllFavorites = () => {
    favorites.value = []
    localStorage.removeItem('favorites')
  }

  const addJokes = (newJokes: Joke[]) => {
    jokes.value = [...jokes.value, ...newJokes]
    localStorage.setItem('jokes', JSON.stringify(jokes.value))

    if (sortBy.value !== '') {
      sortJokes()
    }
  }

  const addToFavorites = (joke: Joke) => {
    favorites.value.push(joke)
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  }

  const removeFromFavorites = (joke: Joke) => {
    const index = favorites.value.findIndex((item) => item.id === joke.id)
    if (index !== -1) {
      favorites.value.splice(index, 1)
      localStorage.setItem('favorites', JSON.stringify(favorites.value))
    }
  }

  return {
    jokes: computed(() => jokes.value),
    favorites: computed(() => favorites.value),
    addJokes,
    addToFavorites,
    removeFromFavorites,
    removeAllJokes,
    removeAllFavorites,
    sortJokes,
    setSortBy,
    setSortDirection,
    setWorkingWithFavorites,
    workingWithFavorites
  }
})

<template>
  <main class="bg-gradient-to-br from-violet-100 via-teal-300 to-cyan-500 py-4">
    <section>
      <div class="container">
        <div class="lg:flex lg:gap-8 lg:items-center px-4 py-10 min-h-96">
          <div class="lg:w-1/2 mb-8 lg:mb-0">
            <div class="bg-white/20 rounded-xl p-4 lg:px-10 lg:w-3/4 lg:mx-auto">
              <h1 class="text-4xl" id="mainTitle">
                A day without <span class="text-teal-600 font-bold">Laughter</span> is a day wasted
              </h1>
              <p class="text-lg mt-4">
                Have you ever noticed how much better you feel after a good laugh? That's because
                laughter can lift your spirits, combatting feelings of sadness or depression by
                promoting a more positive outlook on life.
              </p>
            </div>
          </div>
          <div class="lg:w-1/2">
            <template v-if="mainJoke.isLoading">
              <div class="flex items-center justify-center">
                <IconSpinner class="text-red-500" />
              </div>
            </template>
            <template v-else>
              <JokeCard :joke="mainJoke.data" />
            </template>
          </div>
        </div>
      </div>
    </section>
    <section class="min-h-80">
      <div class="container bg-white/20 rounded-xl">
        <ThreeJokes />
      </div>
    </section>
    <section id="programming" class="bg-no-repeat py-4 min-h-80">
      <div class="container bg-white/20 rounded-xl">
        <ThreeJokes category="Programming" />
      </div>
    </section>
    <section>
      <div class="container">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <RouterLink
            :to="{ name: 'jokesByCategory', params: { category: category.label } }"
            v-for="(category, index) in categories"
            :key="index"
          >
            <div class="card bg-white/20 shadow-xl group">
              <figure class="px-10 pt-10">
                <img
                  :src="category.img"
                  :alt="category.label"
                  class="rounded-xl w-24 group-hover:animate-pulse"
                />
              </figure>
              <div class="card-body items-center text-center">
                <h2 class="card-title">{{ category.label }}</h2>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import useAxios from '@/composables/useAxios'
import ThreeJokes from '@/components/ThreeJokes.vue'
import IconSpinner from '@/components/icons/IconSpinner.vue'
import categoryProgrammingImg from '@/assets/img/category-programming.png'
import categoryMiscellaneousImg from '@/assets/img/category-miscellaneous.png'
import categoryPunImg from '@/assets/img/category-pun.png'
import categorySpookyImg from '@/assets/img/category-spooky.png'
import categoryChristmasImg from '@/assets/img/category-christmas.png'
import categoryDarkImg from '@/assets/img/category-dark.png'

import JokeCard from '@/components/JokeCard.vue'
const mainJoke = ref(useAxios('Any', { type: 'twopart' }))
mainJoke.value.getData()

const categories = [
  { label: 'Misc', img: categoryMiscellaneousImg },
  { label: 'Programming', img: categoryProgrammingImg },
  { label: 'Pun', img: categoryPunImg },
  { label: 'Spooky', img: categorySpookyImg },
  { label: 'Christmas', img: categoryChristmasImg },
  { label: 'Dark', img: categoryDarkImg }
]
</script>
<style scoped></style>

import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import JokeCard from '@/components/JokeCard.vue'
import { setActivePinia, createPinia } from 'pinia'
import { useJokesStore } from '@/stores/jokes'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router/routes'
const router = createRouter({
  history: createWebHistory(),
  routes
})

describe('JokeCard', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia())
  })
  it('should render', () => {
    const store = useJokesStore()
    const wrapper = mount(JokeCard, {
      global: {
        plugins: [router]
      },
      props: {
        joke: {
          category: 'dev'
        }
      }
    })
    expect(wrapper.exists()).toBeTruthy()
  })
})

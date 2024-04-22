import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'
import JokeCard from '@/components/JokeCard.vue'
import ThreeJokes from '@/components/ThreeJokes.vue'

describe('HomeView Component', () => {
  it('Renders Without crashing', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.exists()).toBe(true)
  })

  it('Prevent rendering JokeCard component when data is still being loading', async () => {
    const wrapper = mount(HomeView, {
      data() {
        return {
          mainJoke: {
            isLoading: true
          }
        }
      }
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(JokeCard).exists()).toBe(false)
  })

  it('ThreeJokes Component', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.findComponent(ThreeJokes).exists()).toBe(true)
  })
})

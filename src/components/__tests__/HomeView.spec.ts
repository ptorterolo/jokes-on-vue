import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'
import JokeCard from '@/components/JokeCard.vue'
import ThreeJokes from '@/components/ThreeJokes.vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router/routes'

const router = createRouter({
  history: createWebHistory(),
  routes
})

type ConfigType = {
  mountOptions?: any
  plugins?: any[]
}
let wrapper

function mountWithGlobalsAndOptions(config: ConfigType = {}) {
  config.mountOptions = config.mountOptions || {}
  config.plugins = config.plugins || []
  return mount(HomeView, {
    global: {
      plugins: [router]
    },
    ...config.mountOptions
  })
}

describe('HomeView', () => {
  beforeEach(() => {
    wrapper = mountWithGlobalsAndOptions()
  })
  it('Should render without crashing', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('should have a main quote', () => {
    const mainQuote = wrapper.find('[data-testid=quote]')
    expect(mainQuote.exists()).toBeTruthy()
    expect(mainQuote.text()).toContain('A day without Laughter is a day wasted')
  })

  // it('Prevent rendering JokeCard component when data is still being loading', async () => {
  //   const wrapper = mount(HomeView, {
  //     data() {
  //       return {
  //         mainJoke: {
  //           isLoading: true
  //         }
  //       }
  //     }
  //   })
  //   await wrapper.vm.$nextTick()
  //   expect(wrapper.findComponent(JokeCard).exists()).toBe(false)
  // })

  it('ThreeJokes Component', () => {
    expect(wrapper.findComponent(ThreeJokes).exists()).toBe(true)
  })
})

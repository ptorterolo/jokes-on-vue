import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import ThreeJokes from '@/components/ThreeJokes.vue'

describe('ThreeJokes', () => {
  it('Render when has a category', () => {
    const wrapper = mount(ThreeJokes, {
      props: {
        category: 'Christmas'
      }
    })
    expect(wrapper.exists()).toBe(true)
  })
  it('Render when there is no category', () => {
    const wrapper = mount(ThreeJokes, {
      props: {
        category: ''
      }
    })
    expect(wrapper.exists()).toBe(true)
  })
})

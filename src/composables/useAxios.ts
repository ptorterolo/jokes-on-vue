import { ref, watchEffect } from 'vue'
import axiosInstance from '@/services/axios'
import type { Joke } from '@/types'
export default function useAxios(mainCategory = 'Any', params = {}) {
  const data = ref<Joke[] | Joke>([])
  const error = ref(null)
  const isLoading = ref(false)

  const getData = async () => {
    isLoading.value = true
    error.value = null

    try {
      const response = await axiosInstance.get(`joke/${mainCategory}`, { params })
      if (response.data.error) {
        error.value = response.data.message
        return
      }

      if (Object.prototype.hasOwnProperty.call(response.data, 'jokes')) {
        data.value = response.data.jokes
      } else data.value = response.data
    } catch (err: any) {
      error.value = err
    } finally {
      isLoading.value = false
    }
  }
  watchEffect(() => {
    getData()
  })
  return { data, error, isLoading, getData }
}

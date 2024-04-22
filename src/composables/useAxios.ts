import { ref } from 'vue'
import axiosInstance from '@/services/axios'
import type { Joke } from '@/types'
export default function useAxios(mainCategory = 'Any', params = {}) {
  const data = ref<Joke[] | Joke>([])
  const error = ref(null)
  const isLoading = ref(false)

  const getData = async () => {
    isLoading.value = true
    try {
      const response = await axiosInstance.get(`joke/${mainCategory}`, { params })

      isLoading.value = false

      if (response.data.error) {
        error.value = response.data.message
        return
      }

      if (Object.prototype.hasOwnProperty.call(response.data, 'jokes')) {
        data.value = response.data.jokes
      } else data.value = response.data
    } catch (error) {
      console.log(error)
      isLoading.value = false
    }
  }

  return { data, error, isLoading, getData }
}

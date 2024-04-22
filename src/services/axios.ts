import axios from 'axios'
const instance = axios.create({
  baseURL: 'https://v2.jokeapi.dev/',
  headers: {
    'Content-Type': 'application/json'
  }
})
export default instance

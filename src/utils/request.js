import axios from 'axios'

// eslint-disable-next-line no-unused-vars
const instance = axios.create({
  baseURL: 'http://127.0.0.1:8085',
  timeout: 2000
})

export default instance

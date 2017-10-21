import axios from 'axios'
export const http = axios.create({
  baseURL: '',
  headers: {
    Authorization: ''
  }
})

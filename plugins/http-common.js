import axios from 'axios'
import Vue from 'vue'

const http = axios.create({
  baseURL: process.env.BASE_URL
})

Vue.prototype.$http = http
export default http

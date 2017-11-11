import axios from 'axios'
import Vue from 'vue'
import {API_HOST, API_PATH} from '~/config/api'

const http = axios.create({
  baseURL: `${API_HOST}${API_PATH}`
})

Vue.prototype.$http = http
export default http

import axios from 'axios'
import Vue from 'vue'
import {API_HOST} from '~/config/api'

const http = axios.create({
  baseURL: API_HOST
})

Vue.prototype.$http = http
export default http

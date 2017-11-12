import axios from 'axios'
import KnitApiClientService from '~/services/KnitApi/Client'
// import KnitApiAuthService from '~/services/KnitApi/Auth'
import { API_HOST } from '~/config/api'

// export const KnitApiAuth = new KnitApiAuthService(axios, {
//   entrypoint: API_HOST
// })

export const KnitApiClient = new KnitApiClientService(axios, {
  entrypoint: API_HOST,
  mimetype: 'application/ld+json'
})

import queryString from 'query-string'
import axios from 'axios'

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: { 'content-type': 'application/json' },
  paramsSerializer: (params) => queryString.stringify(params)
})

axiosClient.interceptors.request.use(async (config) => {
  return config
})

axiosClient.interceptors.response.use(
  (response: any) => {
    if (response && response.data) {
      return response
    }
  },
  (error) => {
    // Handle errors
    throw error
  }
)

export default axiosClient

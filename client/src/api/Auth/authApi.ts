import axiosClient from '../axiosClient'

const authApi = {
  // Login api
  login: (params: object) => {
    const url = '/login'
    return axiosClient.post(url, params)
  },
  // Register api
  // prettier-ignore
  register: (params: object) => {
    const url = '/register'
    return axiosClient.post(url, params)
  },
  // Đăng xuất người dùng
  logout: () => {
    const url = '/logout'
    return axiosClient.get(url)
  }
}

export default authApi

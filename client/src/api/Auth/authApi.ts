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
  },
  // Update profile
  updateProfile: (params: any) => {
    const url = 'update-profile'
    return axiosClient.put(url, params)
  }
}

export default authApi

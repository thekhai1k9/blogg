import axiosClient from '../axiosClient'

const postApi = {
  // get danh sách post
  getPosts: (params: any) => {
    const url = '/danh-sach-post'
    return axiosClient.get(url, { params })
  },
  // get danh sách top 5 bài post có view cao nhất
  getTop5Posts: () => {
    const url = '/top-5-bai-post'
    return axiosClient.get(url)
  },
  //Update post
  updatePosts: (params: object, id: any) => {
    const url = `/update-post/${id}`
    return axiosClient.put(url, params)
  },
  //Update view post
  updateViewPost: (id: any) => {
    const url = `/updateViewCount/${id}`
    return axiosClient.put(url)
  },
  //Chi tiết post
  detailPost: (id: object) => {
    const url = `/chi-tiet-post/${id}`
    return axiosClient.get(url, id)
  },
  //Create post
  createPost: (params: any) => {
    const url = `/create-post`
    return axiosClient.post(url, params)
  },

  // Comment api
  createCommentPost: (params: object) => {
    const url = `/create-comment-post`
    return axiosClient.post(url, params)
  },
  detailCommentPost: (id: object) => {
    const url = `/get-comment-post/${id}`
    return axiosClient.get(url, id)
  },
  updateCommentPost: (params: object, id: any) => {
    const url = `/update-comment-post/${id}`
    return axiosClient.put(url, params)
  },
  deleteCommentPost: (id: any) => {
    const url = `/delete-comment-post/${id}`
    return axiosClient.delete(url, id)
  }
}

export default postApi

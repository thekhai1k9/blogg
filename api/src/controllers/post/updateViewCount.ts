import { Response, Request } from "express"
import Post from "../../models/post"

const updateViewCount = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id
    const post = await Post.findByPk(postId)
    if (!post) {
      return res.status(404).json({
        message: "Không tìm thấy bài viết"
      })
    }

    // Cập nhật trường view
    post.view = (post.view ?? 0) + 1
    await post.save()

    return res.status(200).json({
      data: post,
      message: "Update view thành công"
    })
  } catch (error) {
    console.error("Lỗi khi update view bài viết:", error)
    return res.status(500).json({
      message: "Có lỗi xảy ra từ server"
    })
  }
}

export default updateViewCount

import { Response, Request } from "express"
import Post from "../../models/post"

const UpdatePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id
    
    const { title, desc, content, type_post, view } = req.body
    const post = await Post.findByPk(postId)
    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      })
    }

    // Kiểm tra xem các trường bắt buộc đã được cung cấp hay chưa
    if (!title) {
      return res.status(400).json({
        message: "Title, are required fields."
      })
    }
    if (!type_post) {
      return res.status(400).json({
        message: "Kiểu bài post, are required fields."
      })
    }

    // Update post
    post.title = title
    post.content = content
    post.desc = desc
    post.type_post = type_post
    post.image = req.file ? req.file?.path.replace(/\\/g, "/") : post.image
    post.view = view

    await post.save()

    return res.status(200).json({
      data: post,
      message: "Bài viết đã được cập nhật thành công"
    })
  } catch (error) {
    console.error("Lỗi khi cập nhật bài viết:", error)
    return res.status(500).json({
      message: "Có lỗi xảy ra từ server"
    })
  }
}

export default UpdatePost

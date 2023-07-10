import { Request, Response } from "express"
import Post from "../../models/post"
import User from "../../models/user"

const getPostById = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const post = await Post.findOne({ where: { id: postId }})
    if (!post) {
      return res.status(404).json({
        data: null,
        message: "Post not found"
      })
    }

    // Query UserModels
    const userId = post.user_id
    const user = await User.findOne({where: { id: userId}})

    return res.status(200).json({
      message: "Lấy chi tiết bài đăng thành công",
      data: {
        post: post,
        user: user ? user : null
      }
    })
  } catch (error) {
    console.error("Error while fetching post details:", error)
    return res.status(500).json({
      message: "Internal server error"
    })
  }
}

export default getPostById

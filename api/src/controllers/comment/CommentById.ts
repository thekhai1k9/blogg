import { Request, Response } from "express"
import Comment from "../../models/comment"
import User from "../../models/user"

interface UserMap {
  [key: number]: User | null
}

const CommentById = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id
    const comments = await Comment.findAll({ where: { post_id: postId }})

    if (!comments || comments.length === 0) {
      return res.status(404).json({
        data: null,
        message: "Comment not found"
      })
    }
    // Lấy danh sách userId từ các bình luận
    const userIds = comments.map((comment) => comment.user_id)

    // Query thông tin người dùng từ User model dựa trên danh sách userId
    const users = await User.findAll({ where: { id: userIds }})

     // Tạo một đối tượng mapping user_id và user để dễ dàng truy cập thông tin người dùng
     const userMap: { [key: number]: User | null } = {}
     users.forEach((user) => {
       userMap[user.id] = user
     })

    // Gắn thông tin người dùng vào từng bình luận
    const commentsWithUser = comments.map((comment) => ({
      ...comment.toJSON(),
      user: userMap[comment.user_id] || null
    }))

    return res.status(200).json({
      message: "Lấy danh sách bình luận thành công",
      data: commentsWithUser
    })

  } catch (error) {
    console.error("Lỗi khi lấy danh sách bình luận:", error)
    return res.status(500).json({
      message: "Lỗi khi lấy danh sách bình luận"
    })
  }
}

export default CommentById

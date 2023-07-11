import { Request, Response } from "express"
import { Server as SocketIOServer } from 'socket.io'
import Comment from "../../models/comment"

const  CreateComment = async (req: Request, res: Response) => {
   try {
    const { comment, post_id, user_id } = req.body
    // Tạo bình luận mới
    const saveComment = await Comment.create({ comment, post_id, user_id})
    // Gửi bình luận mới đến tất cả các client được kết nối qua Socket.IO
    const io: SocketIOServer = req.app.get('socketio')
    io.emit('newComment', saveComment)

    res.status(200).json({ message: 'Bình luận đã được lưu trữ' })
  } catch (error) {
    console.error('Lỗi khi lưu trữ bình luận:', error)
    res.status(500).json({ error: 'Không thể lưu trữ bình luận' })
  }
} 

export default CreateComment
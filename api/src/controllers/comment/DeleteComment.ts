import { Response, Request } from "express"
import Comment from "../../models/comment"

const  DeleteComment =  async (req: Request, res: Response) => {
    try {
    const commentId = req.params.id
    const rmComment = await Comment.findOne({where: {id :commentId}})
    if(!rmComment) {
        return res.status(404).json({
            data: null,
            message: "Bình luận not found"
        })
    }
    await rmComment.destroy()
    return res.status(200).json({
        message: "Bạn đã xóa bài bình luận thành công"
    })
   } catch (error) {
        console.error("Lỗi khi xóa bình luận:", error)
        return res.status(500).json({
        message: "Có lỗi xảy ra từ server"
    })
   }
} 

export default DeleteComment
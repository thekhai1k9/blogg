import { Response, Request } from "express"
import Comment from "../../models/comment"

const  UpdateComment = async (req: Request, res: Response) => {
    try {
        const commentId = req.params.id
        const {user_id, post_id, comment} = req.body
        const updateComment = await Comment.findByPk(commentId)
        if(!updateComment) {
            return res.status(404).json({
                message: "comment not found"
            })
        }

        // Update post
        updateComment.user_id = user_id
        updateComment.post_id = post_id
        updateComment.comment = comment
        
        await updateComment.save()

        return res.status(200).json({
            data: updateComment,
            message: "Bình luận đã được cập nhật thành công"
        })
    } catch (error) {
        console.error('Lỗi khi chỉnh sửa comment:', error)
        return res.status(500).json({
          message: 'Có lỗi xảy ra từ server'
        })
    }
} 

export default UpdateComment
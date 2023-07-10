import { Response, Request } from "express"
import Post from "../../models/post"

const  DeletePost =  async (req: Request, res: Response) => {
    try {
    const postId = req.params.id
    const post = await Post.findOne({where: {id :postId}})
    if(!post) {
        return res.status(404).json({
            data: null,
            message: "Post not found"
        })
    }
    await post.destroy()
    return res.status(200).json({
        message: "Bạn đã xóa bài đăng thành công"
    })
   } catch (error) {
        console.error("Lỗi khi xóa bài đăng:", error)
        return res.status(500).json({
        message: "Có lỗi xảy ra từ server"
    })
   }
} 

export default DeletePost
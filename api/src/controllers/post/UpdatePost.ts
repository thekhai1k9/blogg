import { Response, Request } from "express"
import Post from "../../models/post"

const  UpdatePost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id
        const {title, desc, content, type_post} = req.body
        const post = await Post.findByPk(postId)
        if(!post) {
            return res.status(404).json({
                message: "Post not found"
            })
        }

        // Update post
        post.title = title
        post.content = content
        post.desc = desc
        post.type_post = type_post
        post.image = req.file ? req.file?.path.replace(/\\/g, '/') : ""
        
        await post.save()

        return res.status(200).json({
            data: post,
            message: "Bài viết đã được cập nhật thành công"
        })
    } catch (error) {
        console.error('Lỗi khi cập nhật bài viết:', error)
        return res.status(500).json({
          message: 'Có lỗi xảy ra từ server'
        })
    }
} 

export default UpdatePost
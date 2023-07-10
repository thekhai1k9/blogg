import { Response, Request } from "express"
import Post, { PostAttributes } from "../../models/post"

const  CreatePost = async (req: Request, res: Response) => {
    try {
        const { title, user_id, desc, image, content, type_post} = req.body as PostAttributes
        const post = await Post.create({
            user_id,
            title,
            desc,
            image,
            content,
            type_post
          })

          return res.status(200).json({
            data: post,
            message: "Tạo mới bài viết thành công"
          })
    } catch (error) {
        console.error('Lỗi khi tạo bài viết:', error)
        return res.status(500).json({
            message: 'Có lỗi xảy ra từ server'
        })
    }
} 

export default CreatePost
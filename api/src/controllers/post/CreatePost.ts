import { Response, Request } from "express"
import Post from "../../models/post"
import multer, { Multer } from "multer"
import { storage } from "../../middleware/Uploadfile"

const upload: Multer = multer({ storage: storage })
const CreatePost = async (req: Request, res: Response) => {
  // Cấu hình middleware tải lên của multer
  try {
    const { title, user_id, desc, content, type_post, date } = req.body
    console.log(req.file)
    
    if (req.file) {
      const post = await Post.create({
        user_id,
        title,
        desc,
        image: req.file?.path,
        content,
        type_post,
        date
      })
      return res.status(200).json({
        data: post,
        message: "Tạo mới bài viết thành công"
      })
    } else {
      return res.status(400).json({
        message: "Tệp hình ảnh không hợp lệ"
      })
    }
  } catch (error) {
    console.error("Lỗi khi tạo bài viết:", error)
    return res.status(500).json({
      message: "Có lỗi xảy ra từ server"
    })
  }
}

export default CreatePost

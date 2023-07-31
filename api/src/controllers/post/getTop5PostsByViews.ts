import { Response, Request } from "express"
import Post from "../../models/post"

const getTop5PostsByViews = async (req: Request, res: Response) => {
  try {
    const top5Posts = await Post.findAll({
      order: [["view", "DESC"]],
      limit: 5
    })

    return res.status(200).json({
      data: top5Posts,
      message: "Lấy ra 5 bài viết có view cao nhất thành công"
    })
  } catch (error) {
    console.error("Lỗi khi lấy ra 5 bài viết có view cao nhất từ server:", error)
    return res.status(500).json({
      message: "Có lỗi xảy ra từ server"
    })
  }
}

export default getTop5PostsByViews

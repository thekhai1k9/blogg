import { Response, Request } from "express"
import { Op } from "sequelize"
import Post from "../../models/post"

const GetPosts = async (req: Request, res: Response) => {
  const { title, desc, type_post, page, limit } = req.query
  try {
    let filterConditions: any = {}

    if (title) {
      filterConditions.title = { [Op.like]: `%${title}%` }
    }
    if (desc) {
      filterConditions.desc = { [Op.like]: `%${desc}%` }
    }
    if (type_post) {
      filterConditions.type_post = { [Op.like]: `%${type_post}%` }
    }

    // Số trang hiện tại và số bài post trên mỗi trang
    const currentPage = parseInt(page as string, 10) || 1
    const postsPerPage = parseInt(limit as string, 10) || 10

    // Tính toán offset và số lượng bài post trên mỗi trang
    const offset = (currentPage - 1) * postsPerPage
    const limitValue = postsPerPage

    // Lấy danh sách bài post với filter và phân trang
    const { count, rows } = await Post.findAndCountAll({
      where: filterConditions,
      offset,
      limit: limitValue,
    })

    return res.status(200).json({
      total: count,
      currentPage,
      totalPages: Math.ceil(count / postsPerPage),
      posts: rows,
    })
  } catch (error) {
    console.error("Có lỗi khi lấy danh sách bài post:", error)
    return res.status(500).json({
      message: "Có lỗi từ server",
    })
  }
}

export default GetPosts

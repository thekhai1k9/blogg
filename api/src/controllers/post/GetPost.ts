import { Response, Request } from "express"
import { Op } from 'sequelize'
import Post from "../../models/post"

const  GetPosts =  async (req: Request, res: Response) => {
    const { filter, page, limit } = req.body
    try {
        
        let filterConditions = {}
        if (filter) {
            filterConditions = {
                [Op.or]: [
                  { title: { [Op.like]: `%${filter}%` } },
                  { desc: { [Op.like]: `%${filter}%` } },
                  { type_post: { [Op.like]: `%${filter}%` } }
                ]
            }
        }
        
        // Số trang hiện tại và số bài post trên mỗi trang
        const currentPage = parseInt(page as string, 5) || 1
        const postsPerPage = parseInt(limit as string, 10) || 10

        // Tính toán offset và số lượng bài post trên mỗi trang
        const offset = (currentPage - 1) * postsPerPage
        const limitValue = postsPerPage

        // Lấy danh sách bài post với filter và phân trang
        const { count, rows } = await Post.findAndCountAll({
            where: filterConditions,
            offset,
            limit: limitValue
        })

        return res.status(200).json({
            total: count,
            currentPage,
            totalPages: Math.ceil(count / postsPerPage),
            posts: rows
        })
    } catch (error) {
        console.error('Có lỗi khi lấy danh sách bài post:', error)
        return res.status(500).json({ 
            message: 'Có lỗi từ server' 
        })
    }
} 

export default GetPosts
import { Request, Response } from "express"
import User from "../../models/user"

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const { id, firstName, lastName, email, userName, phone} = req.body
        const avatar: any = req?.file ? req?.file?.fieldname : null

        const existingUser = await User.findByPk(id)
        if (!existingUser) {
            return res.status(404).json({ message: "Không tìm thấy thông tin người dùng, vui lòng thử đăng nhập lại sau vài phút" })
        }

        // Cập nhật thông tin người dùng
        existingUser.firstName = firstName
        existingUser.lastName = lastName
        existingUser.email = email
        existingUser.image = avatar
        existingUser.phone = phone

        await existingUser.save()

        res.status(200).json({
            message: "Cập nhật thông tin người dùng thành công",
            data: existingUser
          })
  
    } catch (error) {
        res.status(500).json({ error: "Có lỗi ở server khi cập nhật thông tin người dùng" })
    }
}

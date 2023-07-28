import { Request, Response } from "express"
import User from "../../models/user"
import bcrypt from "bcrypt"

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { userId, oldPassword, newPassword } = req.body

    // Kiểm tra xem userId có tồn tại trong cơ sở dữ liệu hay không
    const user = await User.findByPk(userId)
    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại, vui lòng thử lại' })
    }
    
    // Kiểm tra mật khẩu cũ
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password)
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Mật khẩu cũ không chính xác' })
    }

    // Hash mật khẩu mới và cập nhật vào cơ sở dữ liệu
    const hashedNewPassword = await bcrypt.hash(newPassword, 10)
    user.password = hashedNewPassword
    await user.save()
    res.status(200).json({
        message: 'Đổi mật khẩu thành công'
    })
  } catch (error) {
    res.status(500).json({ error: "Có lỗi ở server khi cập nhật thông tin người dùng" })
  }
}

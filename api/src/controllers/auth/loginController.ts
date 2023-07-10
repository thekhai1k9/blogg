import { Request, Response } from "express"
import bcrypt from "bcrypt"
import User from "../../models/user"
import jwt from "jsonwebtoken";

export const  loginController = async (req: Request, res: Response) => {

    const {userName, password} = req.body
    try {
        // Kiểm tra userName
        const user = await User.findOne({where : {userName}})
        if (!user) {
            return res.status(400).json({
                message: "Tên đăng nhập không chính xác"
            })
        }

        // Kiểm tra password mã hóa
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (isPasswordMatch) {
            // Create jwt
            const token = jwt.sign({ userId: user.id }, "QTfkgigloapqwlasncAAagwjwtlop11ag", {
                expiresIn: "1h", // Thời hạn của token
            })

            return res.status(200).json({
                message: "Đăng nhập thành công",
                token: token,
                data: user
            })
        } else {
            return res.status(401).json({
                message: "Mật khẩu chưa chính xác. Vui lòng thử lại"
            })
        }
    } catch (error) {
        console.error("Đăng nhập thất bại:", error);
        return res.status(500).json({ message: "Có lỗi từ server" });
    }
}

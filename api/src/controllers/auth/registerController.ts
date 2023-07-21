import bcrypt from "bcrypt"
import { Request, Response } from "express"
import User from "../../models/user"


const  registerController = async (req: Request, res: Response) => {
    try {
        const {firstName, lastName, email, userName, phone, image, password} = req.body

        // Validate
        if (!firstName || !lastName || !email || !userName || !password) {
            return res.status(400).json({ message: `Cần phải nhập đủ các thông tin như firstName, lastName, email, userName, Password` })
        }
        // Kiểm tra user đã tồn tại hay chưa
        const existingUser = await User.findOne({where : {userName}})
        if (existingUser) {
            return res.status(400).json({message: "Tên tài khoản của bạn đã tồn tại trong hệ thống"})
        }

        // Hash password 
        const hashedPassword = await bcrypt.hash(password, 10)
        // Create user
        const newUser = await User.create({ firstName, lastName, email, userName, phone, image, password: hashedPassword, isAdmin: false})
        res.status(200).json({
            message: "Tạo người dùng mới thành công",
            data: newUser
        })
        
    } catch (error) {
        res.status(500).json({ error: "Có lỗi ở server khi đăng kí tài khoản mới"})
    }
}

export default registerController

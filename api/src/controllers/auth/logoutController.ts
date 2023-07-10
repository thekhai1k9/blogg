import { Request, Response } from "express"

export const logoutController = async (req: Request, res: Response) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json({
        message: "Đăng xuất thành công!"
    })
}

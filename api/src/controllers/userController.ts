import { Response, Request } from "express"

const  userController = (req: Request, res: Response) => {
    res.json("user from controller")
} 

export default userController
import express from "express"
import getPostById from "../controllers/post/PostById"
import userController from "../controllers/userController"
import { loginController } from "../controllers/auth/loginController"
import { logoutController } from "../controllers/auth/logoutController"
import registerController from "../controllers/auth/registerController"
import CreatePost from "../controllers/post/CreatePost"
import DeletePost from "../controllers/post/DeletePost"
import UpdatePost from "../controllers/post/UpdatePost"
import GetPosts from "../controllers/post/GetPost"

let router = express.Router()

const initWebRoutes = (app: any) => {
    // CRUD post
    router.get('/danh-sach-post', GetPosts)
    router.get('/chi-tiet-post/:id', getPostById)
    router.post('/create-post', CreatePost)
    router.delete('/delete-post', DeletePost)
    router.put('/update-post/:id', UpdatePost)


    router.get('/user', userController)
    
    // Auththen
    router.post('/login', loginController)
    router.post('/register', registerController)
    router.get('/logout', logoutController)

    return app.use("/api", router)
}


export default initWebRoutes
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
import CommentById from "../controllers/comment/CommentById"
import DeleteComment from "../controllers/comment/DeleteComment"
import UpdateComment from "../controllers/comment/UpdateComment"
import CreateComment from "../controllers/comment/CreateComment"
import multer, { Multer } from "multer"
import { storage } from "../middleware/Uploadfile"

const upload: Multer = multer({ storage: storage })

let router = express.Router()

const initWebRoutes = (app: any) => {
    // CRUD post
    router.get('/danh-sach-post', GetPosts)
    router.get('/chi-tiet-post/:id', getPostById)
    router.post('/create-post', upload.single('image'),  CreatePost)
    router.delete('/delete-post/:id', DeletePost)
    router.put('/update-post/:id',upload.single('image'),  UpdatePost)


    router.get('/user', userController)
    
    // Auththen
    router.post('/login', loginController)
    router.post('/register', registerController)
    router.get('/logout', logoutController)


    // Comment post
    router.post('/create-comment-post', CreateComment)
    router.get('/get-comment-post/:id', CommentById)
    router.put('/update-comment-post/:id', UpdateComment)
    router.delete('/delete-comment-post/:id', DeleteComment)

    return app.use("/api", router)
}


export default initWebRoutes
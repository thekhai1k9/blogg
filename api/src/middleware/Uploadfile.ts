import { Request } from "express"
import multer from "multer"

// Configuration for multer storage
export const storage = multer.diskStorage({
  destination: (req: Request, file: any, cb) => {
    cb(null, "src/uploads")
  },
  filename: (req: Request, file: any, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    const originalFilename = file.originalname
    const fileExtension = originalFilename.split(".").pop() // Lấy phần mở rộng (đuôi) của tệp
    const newFilename =
      file.fieldname + "-" + uniqueSuffix + "." + fileExtension // Tạo tên mới kết hợp với đuôi tệp
    cb(null, newFilename)
  },
})
const upload = multer({ storage })

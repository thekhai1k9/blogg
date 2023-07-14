import { Request } from "express"
import multer, { StorageEngine } from "multer"

// Configuration for multer storage
export const storage = multer.diskStorage({
    destination: (req: Request, file: any, cb) => {
      cb(null, 'uploads')
    },
    filename: (req: Request, file: any, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  const upload = multer({ storage })
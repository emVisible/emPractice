import multer from 'multer'
import fs from 'fs'
import path from 'path'
import express from 'express'

const router = express.Router()

const storage = multer.diskStorage({
  destination(req: express.Request, file, cb) {
    const dir = "./upload"
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    cb(null, path.resolve(dir))
  },
  filename(req: express.Request, file, cb) {
    const extName = file.filename.split('.').pop()
    cb(null, `${Date.now() + '-' + file.originalname + '.' + extName}`)
  }
})

const upload = multer({
  storage,
  limits: {
    fileSize: Math.pow(1024, 2) * 5
  },
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith('image/')) {
      const err = new Error("[System] Only support image type.")
      return cb(err)
    }
    return cb(null, true)
  }
})

router.post('/upload/image', upload.single('file'),(req, res)=>{
  res.json({
    message:'file upload success',
    data: req.file
  })
})

export default router
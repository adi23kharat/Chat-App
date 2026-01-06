import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import multer from 'multer'
import { getMessages, sendMsg } from '../controllers/message.controller.js'
const router = express.Router()

const upload = multer({            // to show file 
  storage:multer.memoryStorage()
})

router.post('/send/:receiver',authMiddleware,upload.single('image'),sendMsg)
router.get('/get/:receiver',authMiddleware,getMessages)

export default router
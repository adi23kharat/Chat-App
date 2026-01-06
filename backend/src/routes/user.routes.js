import express from 'express'
import multer from 'multer'
import { editProfile, getCurrentUser, getOtherUsers ,searchUser} from '../controllers/user.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = express.Router()

const upload = multer({            // to show file 
  storage:multer.memoryStorage()
})


router.get('/current-user',authMiddleware,getCurrentUser)
router.put('/profile',authMiddleware,upload.single('image'),editProfile)
router.get('/other-user',authMiddleware,getOtherUsers)
router.get('/search',authMiddleware,searchUser)
// put = updating existing data
export default router
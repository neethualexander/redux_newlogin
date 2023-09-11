import express from 'express'
import {authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile} from '../controllers/userController.js'

import {adminLogin,deleteUser,usersList,createUser,userDetails,editUser} from '../controllers/adminControllers.js'

const router=express.Router()

import { protect } from '../Middleware/AuthMiddleware.js'
import multer from 'multer'
import {dirname,join} from 'path';
import { fileURLToPath } from 'url'


const __filename=fileURLToPath(import.meta.url)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      
      cb(null, join(dirname(__filename),"../../frontend/public/assets"));
    },
    filename: (req, file, cb) => {
      const filename= Date.now() + '-' +file.originalname;
      cb(null, filename);
    },
  });
  
  const upload = multer({ storage:storage });

  


router.post('/',registerUser)
router.post('/auth',authUser)
router.post('/logout',logoutUser)
router
.route('/profile')
.get(protect,getUserProfile)
.put(protect,upload.single('image'),updateUserProfile)

router.post('/adminlogin',adminLogin)
router.get('/userslist',usersList)
router.post('/userdetails',protect,userDetails)
router.post('/deleteuser',protect,deleteUser)
router.post('/createuser',protect,createUser)
router.post('/edituser',protect,editUser)
export default router
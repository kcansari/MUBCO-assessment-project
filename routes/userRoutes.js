import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import {
  authUser,
  getUserProfile,
  registerUser,
  getUsers,
  deleteUser,
  updateUserProfile,
} from '../controllers/userController.js'

const router = express.Router()

router.post('/login', authUser)
router.route('/').post(registerUser).get(protect, admin, getUsers)

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

router.route('/:id').delete(protect, admin, deleteUser)

export default router

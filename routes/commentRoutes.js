import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import {
  getAllComments,
  makeComment,
  deleteComment,
  editComment,
} from '../controllers/commentController.js'

const router = express.Router()

router.route('/').get(protect, admin, getAllComments)

router.route('/:movieId').post(protect, makeComment)

router
  .route('/:commentId')
  .delete(protect, deleteComment)
  .put(protect, editComment)

export default router

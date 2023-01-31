import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import {
  getAllMovies,
  createMovie,
  editMovie,
  deleteMovie,
  getMovie,
} from '../controllers/movieController.js'

const router = express.Router()

router.route('/').get(getAllMovies).post(protect, admin, createMovie)
router
  .route('/:movieId')
  .get(getMovie)
  .put(protect, admin, editMovie)
  .delete(protect, admin, deleteMovie)

export default router

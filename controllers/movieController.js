import Movie from '../models/moviesModel.js'
import asyncHandler from 'express-async-handler'

// @desc Get all movies
// @route GET /api/movies
// @access Public
const getAllMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find({}).populate({
    path: 'comments',
    select: '-_id',
    populate: {
      path: 'user',
      model: 'User',
      select: 'username -_id',
    },
  })

  if (!movies) {
    res.status(400)
    throw new Error('There is no movie')
  }
  res.json(movies)
})

// @desc Get specific movie
// @route GET /api/movie/:movieId
// @access Public
const getMovie = asyncHandler(async (req, res) => {
  const movies = await Movie.findById(req.params.movieId).populate({
    path: 'comments',
    select: '-_id',
    populate: {
      path: 'user',
      model: 'User',
      select: 'username -_id',
    },
  })

  if (!movies) {
    res.status(400)
    throw new Error('There is no movie')
  }
  res.json(movies)
})

// @desc Create a movie
// @route POST /api/movies
// @access Private/admin
const createMovie = asyncHandler(async (req, res) => {
  const { title, genres, director } = req.body
  if (title && genres && director) {
    const newMovie = new Movie({
      title: title,
      genres: genres,
      director: director,
      comments: [],
    })
    await newMovie.save()
    res
      .status(200)
      .json({ message: 'New Movie has been created', data: newMovie })
  }
  res.status(404)
  throw new Error(
    `Please write all properties: title:${title}, genres:${genres}, director:${director}`
  )
})

// @desc Edit a movie
// @route PUT /api/movie/:movieId
// @access Private/admin
const editMovie = asyncHandler(async (req, res) => {
  const { title, genres, director } = req.body
  const { movieId } = req.params
  const movie = await Movie.findById(movieId)

  if (movie) {
    movie.title = title || movie.title
    movie.genres = genres || movie.genres
    movie.director = director || movie.director
    const updatedMovie = await movie.save()
    res.status(200).json(updatedMovie)
  }
  res.status(404)
  throw new Error('Movie not found')
})

// @desc Delete a movie
// @route Delete /api/movie/:movieId
// @access Private/admin
const deleteMovie = asyncHandler(async (req, res) => {
  const { movieId } = req.params
  let movie = await Movie.findByIdAndDelete(movieId)
  res.json({ message: 'Movie was deleted', data: movie })
})
export { getAllMovies, getMovie, createMovie, editMovie, deleteMovie }

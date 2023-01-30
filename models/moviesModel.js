import mongoose from 'mongoose'
const { Schema } = mongoose

const movieSchema = Schema({
  title: { type: String, required: true },
  genres: [String],
  director: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
})

const Movie = mongoose.model('Movie', movieSchema)

export default Movie

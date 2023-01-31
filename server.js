import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import movieRoutes from './routes/movieRoutes.js'
const app = express()

// Allow us to accept JSON data in the body.
app.use(express.json())
dotenv.config()
connectDB()

app.get('/', (req, res) => {
  res.send('MUBCO assesment project')
})

app.use('/api/users', userRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/movies', movieRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`.yellow.bold)
})

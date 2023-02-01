import colors from 'colors'
import dotenv from 'dotenv'
import User from './models/userModel.js'
import Comment from './models/commentModel.js'
import Movie from './models/moviesModel.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB()
colors.enable()

const importData = async () => {
  try {
    await Comment.deleteMany()
    await User.deleteMany()
    await Movie.deleteMany()

    const adminUser = new User({
      username: 'admin',
      email: 'admin@example.com',
      password: '123456',
      isAdmin: true,
      comments: [],
    })

    const comment1 = new Comment({
      content: 'this is a comment from admin',
      user: adminUser._id,
    })
    await comment1.save()

    adminUser.comments.push(comment1)
    await adminUser.save()

    const sampleMovie = new Movie({
      title: 'The Shawshank Redemption',
      genres: ['Drama'],
      director: 'Frank Darabont',
      comments: [comment1],
    })

    await sampleMovie.save()

    console.log('Data Imported'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`Error: ${error.message}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Comment.deleteMany()
    await User.deleteMany()
    await Movie.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`Error: ${error.message}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}

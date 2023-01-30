import mongoose from 'mongoose'
const { Schema } = mongoose

const commentSchema = Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true },
})

const Comment = mongoose.model('Comment', commentSchema)

export default Comment

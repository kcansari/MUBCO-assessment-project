import Comment from '../models/commentModel.js'
import asyncHandler from 'express-async-handler'
import Movie from '../models/moviesModel.js'

// @desc Get all comments
// @route GET /api/comments
// @access Private/admin
const getAllComments = asyncHandler(async (req, res) => {
  Comment.find({})
    .populate('user', 'username')
    .exec(function (err, comments) {
      if (err) return handleError(err)
      res.json(comments)
    })
})

// @desc Make a comment
// @route POST /api/comments/:movieId
// @access Private
const makeComment = asyncHandler(async (req, res) => {
  const { content } = req.body
  const { movieId } = req.params
  const movie = await Movie.find({ _id: movieId })
  const { comments } = movie[0]
  if (!content) {
    res.status(401)
    throw new Error('Invalid comment')
  }

  const comment = await Comment.create({
    user: req.user._id,
    content: content,
  })

  if (comment) {
    req.user.comments.push(comment)
    await req.user.save()
    await Movie.findByIdAndUpdate(
      movieId,
      { comments: [...comments, comment] },
      { new: true }
    )
    res.status(200).json({ content: content, user: req.user })
  } else {
    res.status(400)
    throw new Error('Comment was not created')
  }
})

// @desc Delete an user's comment
// @route Delete /api/comments/:commentId
// @access Private
const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params
  const comment = await Comment.findById(commentId).populate('user')

  if (
    JSON.stringify(comment.user._id) === JSON.stringify(req.user._id) ||
    req.user.isAdmin === true
  ) {
    const deletedComment = await Comment.deleteOne({ _id: commentId })
    res
      .status(200)
      .json({ message: 'comment was deleted', data: deletedComment })
  } else {
    // do not delete
    res.status(404).json({
      message: 'you cannot delete this comment',
      commentUserId: comment.user._id,
      reqUserId: req.user._id,
    })
  }
})

// @desc Update user comment
// @route PUT /api/comments/:commentId
// @access Private
const editComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params
  const comment = await Comment.findById(commentId).populate('user')

  if (comment) {
    comment.content = req.body.content || comment.content

    const updatedComment = await comment.save()
    res.json({
      _id: updatedComment._id,
      username: updatedComment.user.username,
      content: updatedComment.content,
    })
  } else {
    res.status(404)
    throw new Error('Comment not found')
  }
})

export { getAllComments, makeComment, deleteComment, editComment }

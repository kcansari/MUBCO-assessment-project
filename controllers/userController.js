import User from '../models/userModel.js'
import Comment from '../models/commentModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      comments: user.comments,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else if (user && !(await user.matchPassword(password))) {
    res.status(401)
    throw new Error('Invalid password')
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists, please change your email address')
  }

  const user = await User.create({
    username: username,
    email: email,
    password: password,
  })
  if (user) {
    res.status(201).send({
      message: 'New user has been created',
      token: generateToken(user._id),
      user: user,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password')

  if (!users) {
    res.status(400)
    throw new Error('There is no user')
  }
  res.json(users)
})

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  User.find({ _id: req.user._id })
    .select('username email comments')
    .populate('comments', 'content')
    .exec(function (err, profile) {
      if (err) return handleError(err)
      res.json(profile)
    })
})

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.username = req.body.username || user.username
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      comments: user.comments,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc Delete user
// @route Delete /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user && user.isAdmin !== true) {
    await Comment.deleteMany({ user: req.params.id })
    await user.remove()
    res.json({ message: `${user.username} removed`, data: user })
  } else {
    res.status(404)
    throw new Error('User not found or you cannot delete admin')
  }
})

export {
  authUser,
  registerUser,
  getUsers,
  getUserProfile,
  updateUserProfile,
  deleteUser,
}

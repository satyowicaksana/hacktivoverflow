const User = require('../models/User')
const { comparePassword } = require('../helpers/bcryptjs')
const { generateToken } = require('../helpers/jwt')

module.exports = {
  register: (req, res, next) => {
    const { username, email, password } = req.body
    User.create({ username, email, password })
    .then(user => {
      res.status(201).json({
        id: user._id,
        username: user.username,
        email: user.email,
        access_token: generateToken({ username, email })
      })
    })
    .catch(next)
  },
  login: (req, res, next) => {
    const { email, password } = req.body
    User.findOne({ email })
    .then(user => {
      if(!user || !comparePassword(password, user.password)) {
        throw {status: 400, msg: 'The email or password is incorrect.'}
      } else {
        res.status(200).json({
          id: user._id,
          username: user.username,
          email: user.email,
          access_token: generateToken({ username: user.username, email })
        })
      }
    })
    .catch(next)
  },
  addWatchedTag: (req, res, next) => {
    const { tag } = req.body
    User.findByIdAndUpdate(req.loggedUser._id, { $addToSet: { watchedTags: tag } }, {
      omitUndefined: true, new: true
    })
      .then(user => {
        res.status(200).json(user)
      })
      .catch(next)
  },
  getWatchedTags: (req, res, next) => {
    User.findById(req.loggedUser._id)
      .then(user => {
        res.status(200).json(user.watchedTags)
      })
      .catch(next)
  },
  deleteWatchedTag: (req, res, next) => {
    const { tag } = req.body
    User.findByIdAndUpdate(req.loggedUser._id, { $pull: { watchedTags: tag } }, {
      omitUndefined: true, new: true
    })
      .then(user => {
        res.status(200).json(user)
      })
      .catch(next)
  },
}
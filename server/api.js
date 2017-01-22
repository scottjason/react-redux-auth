const User = require('./models/user');
const async = require('async');
const bcrypt = require('bcrypt-nodejs');
const path = require('path');
const jwt = require('jsonwebtoken');
const secret = process.env.jwtSecret || require('../env').jwtSecret

module.exports = (app) => {
  app.get('/register', register);
  app.get('/isAuthenticated', isAuthenticated);
}

function isAuthenticated(token, cb) {
  jwt.verify(token, secret, (err, decoded) => cb(err))
}

function register(req, res, next) {
  async.waterfall([
    (cb) => {
      User.findOne({ email: req.query.email }).exec(cb)
    },
    (user, cb) => {
      if (user) return res.status(401).send({ message: 'existing user' })
      var user = new User()
      user.email = req.query.email
      user.password = req.query.password
      user.save(cb)
      console.log("saving user")
    },
  ], (err, user) => {
    user = user.toJSON()
    delete user.password
    user.token = jwt.sign(user, secret, { expiresIn: '24h' })
    res.status(200).send({ user: user })
  })
}
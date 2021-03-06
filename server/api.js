const User = require('./models/user');
const async = require('async');
const bcrypt = require('bcrypt-nodejs');
const path = require('path');
const jwt = require('jsonwebtoken');
const secret = process.env.jwtSecret || require('../env').jwtSecret;

module.exports = (app) => {
  app.get('/login', login);
  app.get('/register', register);
  app.post('/isAuthenticated', isAuthenticated);
}

function isAuthenticated(req, res, next) {
  jwt.verify(req.body.token, secret, (err, user) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send({ user: user, isAuthenticated: true });
    }
  });
}

function comparePassword(entered, existing, cb) {
  bcrypt.compare(entered, existing, (err, isMatch) => cb(err, isMatch));
}

function login(req, res, next) {
  async.waterfall([
    (cb) => {
      User.findOne({ email: req.query.email }).exec(cb);
    },
    (user, cb) => {
      if (!user) {
        res.status(401).send({ message: 'email not found' });
      } else {
        comparePassword(req.query.password, user.password, (err, isMatch) => {
          if (err) return cb(err);
          if (!isMatch) return res.status(401).send({ message: 'right email, wrong password' });
          cb(null, user);
        })
      }
    },
  ], (err, user) => {
    user = user.toJSON();
    delete user.password;
    user.token = jwt.sign(user, secret, { expiresIn: '24h' });
    res.status(200).send({ user: user });
  })
}

function register(req, res, next) {
  async.waterfall([
    (cb) => {
      User.findOne({ email: req.query.email }).exec(cb);
    },
    (user, cb) => {
      if (user) return res.status(401).send({ message: 'existing user' });
      var user = new User();
      user.email = req.query.email;
      user.password = req.query.password;
      user.save(cb);
    },
  ], (err, user) => {
    user = user.toJSON();
    delete user.password;
    user.token = jwt.sign(user, secret, { expiresIn: '24h' });
    res.status(200).send({ user: user });
  })
}
const bcrypt   = require('bcrypt-nodejs')
const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  email: {
    type: String
  },
  password: {
    type: String
  }
})

userSchema.pre('save', function(cb) {

  if (this.password) {
    var _this = this
    if (!_this.isModified('password')) return cb()
    bcrypt.genSalt(5, function(err, salt) {
      if (err) return cb(err)
      bcrypt.hash(_this.password, salt, null, function(err, hash) {
        if (err) return cb(err)
        _this.password = hash
        return cb()
      })
    })
  } else {
    cb()
  }
})

module.exports = mongoose.model('User', userSchema)
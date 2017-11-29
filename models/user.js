var mongoose = require("mongoose")
var Schema = mongoose.Schema
var bcrypt = require('bcrypt')
var SALT_WORK_FACTOR = 10

var userSchema = new Schema({
  username: {type: String, required: true, index: {
    unique: true
  }},
  email:{ type: String, required: true },
  password: { type: String, required: true},
});

userSchema.pre('save', function(next){
  var user = this
  if(!user.isModified('password')) return next()
  bcrypt.genSalt(SALT_WORK_FACTOR, function(error, salt){
    if(error) return next(error)
    bcrypt.hash(user.password, salt, function(error, hash){
      if(error) next(error)
      user.password = hash
      next()
    })
  })
})

userSchema.methods.comparePassword = function(candidatePassword, callback){
  bcrypt.compare(candidatePassword, this.password, function(error, isMatch){
    if(error) return callback(error)
    callback(null, isMatch)
  })
}

var User = mongoose.model("User", userSchema);

module.exports = User;

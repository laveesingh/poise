var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = require('./user.js')
var Location = require('./location.js')

var img_default = "http://www.wiu.edu/student_services/housing/residence_halls/images/furniture/no-image-available.png"
var experienceSchema = new Schema({
  username: String,
  title: {type: String, required: true},
  description: {type: String, required: true},
  latitude: Number,
  longitude: Number,
  imgUrl: String,
  date: {type: Date, default: Date.now}
});

var Experience = mongoose.model("Experience", experienceSchema);

module.exports = Experience;

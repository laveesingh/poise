var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = require('./user.js')

var img_default = "http://www.wiu.edu/student_services/housing/residence_halls/images/furniture/no-image-available.png"
var experienceSchema = new Schema({
  title: {type: String, required: true},
  userId: {type: Schema.Types.ObjectId, ref:"User"},
  description: {type: String, required: true},
  //img: {type: String, default: img_default},
  //url: {type: String, required: true},
  date: {type: Date, default: Date.now}
});

var Experience = mongoose.model("Experience", experienceSchema);

module.exports = Experience;

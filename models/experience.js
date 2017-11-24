const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const experienceSchema = new Schema({
  title: { type: String, required: true },
  userId:{ type:Schema.Types.ObjectId, ref:"User" },
  description:{ type: String, required: true },
  img: {type: String,default:"http://www.wiu.edu/student_services/housing/residence_halls/images/furniture/no-image-available.png"},
  url: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Experience = mongoose.model("Experience", experienceSchema);

module.exports = Experience;

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var locationSchema = new Schema({
  lat: {type: Number, required: true},
  long: {type: Number, required: true}
})

var Location = mongoose.model('Location', locationSchema)
module.exports = Location

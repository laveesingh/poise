var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var path = require('path')
var app = express()
var router = express.Router()
var PORT = process.env.PORT || 3001

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())





var experienceController = require('./controllers/experienceController.js')
var userController = require('./controllers/userController.js')
experienceController(app)
userController(app)
var Experience = require('./models/experience.js')
var User = require('./models/user.js')


var mongoDB = 'mongodb://localhost:27017';
mongoose.connect(mongoDB, { useMongoClient: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function(){
  console.log('connected to the database')
  //User.find({}, function(error, users){
    //if(error) return console.error(error)
    //console.log(users)
  //}).remove(function(error, users){
    //if(error) return console.error(error)
    //console.log('everything deleted')
  //})
})







app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});


router.get('/', function(request, response){
  response.json({message: "🌎  ==> API Server now running!"})
})

app.use('/api', router)

app.listen(PORT, function() {
	console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
})

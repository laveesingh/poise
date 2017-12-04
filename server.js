var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var path = require('path')
var session = require('express-session')
var cookieParser = require('cookie-parser')
var MongoStore = require('connect-mongo')(session)
var fileUpload = require('express-fileupload')


var app = express()
var router = express.Router()
var PORT = process.env.PORT || 3001

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(fileUpload())
app.use(express.static('.'))

// models and controls
var experienceController = require('./controllers/experienceController.js')
var userController = require('./controllers/userController.js')
experienceController(app)
userController(app)
var Experience = require('./models/experience.js')
var User = require('./models/user.js')


// database
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
app.use(cookieParser())


// initial configs
router.get('/', function(request, response){
  response.json({message: "🌎  ==> API Server now running!"})
})
app.use('/api', router)
app.listen(PORT, function() {
	console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
})

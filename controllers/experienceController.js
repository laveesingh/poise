// const db = require("../models");
var express = require("express");
var app = express();
var path = require("path");
var Experience = require("./../models/experience.js");
var User = require('../models/user.js')
var multer = require('multer')
var upload = multer({ dest: '/media/' })

module.exports = function (app) {

  app.get('/', function(request, response){
    response.json({msg: 'it worked'})
  })

  app.post('/experience/create/', function(request, response){
    var $SERVER = 'http://localhost:3001'
    var imgFile = request.files.file
    var imgName = imgFile.name.replace(' ', '_')
    var imgPath = $SERVER + '/media/img/' + imgName  // this may overwrite another file with same name
    imgFile.mv(path.join(__dirname, '..', 'media', 'img', imgName), function(error){
      if(error) console.log(error)
      else console.log('successfully uploaded image file:', imgPath)
    })
    var experience = new Experience({
      category: request.body.category,
      username: request.body.username,
      title: request.body.title,
      description: request.body.description,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
      imgUrl: imgPath
    })
    var username = request.body.username
    var user = User.findOne({username: username}, function(error, user){
      if(error){
        response.json({
          msg: 'you\'re not logged in, no such user found with username "' + username + '"',
          status: 1
        })
      }
    })
    experience.save(function(error, experience){
      if(error){
        response.json({
          msg: error,
          status: 1
        })
        return
      }
      response.json({
        msg: 'successfully created new experience',
        status: 0,
        experience: experience
      })
    })
  })

  app.get('/experience/list/all', function(request, response){
    Experience.find({}, function(error, experiences){
      if(error){
        response.json({
          status: 1,
          msg: error
        })
        return
      }
      response.json({
        status: 0,
        msg: 'successfully fetched experiences',
        data: experiences
      })
    })
  })

  app.get('/experience/list_by_radius/', function(request, response){
    var lat = request.query.lat
    var long = request.query.long
    var count = request.query.count
    var radius = request.query.radius
    Experience.find({}, function(error, experiences){
      if(error){
        response.json({
          status: 1,
          msg: error
        })
        return
      }
      var fitExperiences = []
      for (var i = 0; i < experiences.length; i++){
        var distance = getDistance(lat, long, 
          experiences[i].location.lat, experiences[i].location.long)
        if (distance <= radius) fitExperiences.push(experiences[i])
      }
      response.json({
        status: 0,
        msg: 'successfully fetched experiences',
        data: fitExperiences
      })
    })
  })

  app.get('/experience/list_by_category/', function(request, response){
    var username = request.query.username
    var category = request.query.category
    var searchFilter = {}
    if(username){
      searchFilter.username = username
    }
    if(category != 'all'){
      searchFilter.category = category
    }
    Experience.find(searchFilter, function(error, experiences){
      if(error){
        response.json({
          status: 1,
          msg: error
        })
        return
      }
      response.json({
        status: 0,
        msg: 'successfully fetched experiences',
        data: experiences
      })
    })
  })

  app.get('/experience/list_by_user/:username', function(request, response){
    console.log('finding notches for ', request.params.username)
    Experience.find({username: request.params.username}, function(error, experiences){
      if(error){
        response.json({
          status: 1,
          msg: error
        })
        return
      }
      response.json({
        status: 0,
        msg: 'successfully fetched experiences',
        data: experiences
      })
    })
  })

  app.get('/experience/search_by_id/:id', function(request, response){
    console.log('finding notch for ', request.params.id)
    Experience.find({_id: request.params.id}, function(error, experience){
      if(error){
        response.json({
          status: 1,
          msg: error
        })
        return
      }
      response.json({
        status: 0,
        msg: 'successfully fetched the experience',
        data: experience
      })
    })
  })

  app.get('/experience/delete/:id', function(request, response){
    var id = request.params.id
    Experience.findByIdAndRemove(id, function(error, data){
      response.json({
        error: error,
        data: data
      })
    })
  })

};


function degreeToRadian(degree){
  return degree * (Math.PI/180)
}

function getDistance(lat1, long1, lat2, long2) {
  var r = 6371
  var dLat = degreeToRadian(lat2-lat1)
  var dLon = degreeToRadian(long2-long1)
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(degreeToRadian(lat1)) * Math.cos(degreeToRadian(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var kms = r * c
  var miles = kms * 0.621371
  return miles
}


// const db = require("../models");
var express = require("express");
var app = express();
var path = require("path");
var Experience = require("./../models/experience.js");
var User = require("./../models/user.js");

module.exports = function (app) {

  app.get('/', function(request, response){
    response.json({msg: 'it worked'})
  })

  app.post('/user/create/', function (request, response) {
    var user = new User(request.body)
    user.save(function(error, user){
      if(error){
        response.json({
          msg: error,
          status: 1
        })
        return
      }
      response.json({
        msg: 'user successfully created',
        status: 0,
        user: user
      })
      console.log('user successfully created')
    })
  });

  app.get('/user/search/:username', function(request, response){
    //console.log('user search request', request.params)
    var username = request.params.username
    var user = User.findOne({username: username}, function(error, user){
      if(error) {
        response.json({
          msg: error,
          status: 1
        })
        return
      }
      if(user){
        response.json({
          msg: 'request successful',
          status: 0,
          user: user
        })
      }else{
        response.json({
          msg: 'user not found',
          status: 1
        })
      }
    })
  })

  app.post('/experience/create/', function(request, response){
    var experience = new Experience(request.body)
    var username = request.body.username
    var user = User.findOne({username: username}, function(error, user){
      if(error){
        response.json({
          msg: 'no such user found with username "' + username + '"',
          status: 1
        })
      }
    })
    experience.userId 
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

  app.get("/api/saved", function (request, response) {
    Experience.find({}, function (err, doc) {
      if (err) {
        response.send(err);
      } else {
        response.send(doc);
      }
    });
  });

  //deleting what the user chooses to delete
  app.delete("/api/saved/:id", function(request, response){
    Experience.findByIdAndRemove(request.params.id, function (error, doc) {
      if (error) {
        response.send(error);
      } else{
        response.send(doc);
      }
    });
  });
};



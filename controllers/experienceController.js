// const db = require("../models");
var express = require("express");
var app = express();
var path = require("path");
var Experience = require("./../models/experience.js");

module.exports = function (app) {

  app.get('/', function(request, response){
    response.json({msg: 'it worked'})
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

};



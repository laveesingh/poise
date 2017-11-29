var express = require("express");
var app = express();
var path = require("path");
var User = require("./../models/user.js");

module.exports = function(app){
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
}

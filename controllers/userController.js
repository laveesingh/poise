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

  app.get('/user/all/', function(request, response){
    User.find({}, function(error, users){
      if(error){
        response.json({ msg: error, status: 1, })
        return 
      }
      response.json({ msg: 'successfully fetched users', status: 0, users: users })
    })
  })

  app.get('/user/search/:username', function(request, response){
    var username = request.params.username
    User.findOne({username: username}, function(error, user){
      if(error) {
        response.json({ msg: error, status: 1 })
        return
      }
      if(user){
        response.json({ msg: 'request successful', status: 0, user: user })
      }else{
        response.json({
          msg: 'user not found',
          status: 1
        })
      }
    })
  })

  app.post('/user/login/', function(request, response){
    console.log('login requested')
    User.findOne({username: request.body.username}, function(error, user){
      if(error){
        response.json({ msg: error, status: 1, })
        return
      }
      if(!user){
        response.json({ msg: 'no user with that username', status: 1 })
        return
      }
      user.comparePassword(request.body.password, function(error, isMatch){
        if(error){
          response.json({ msg: error, status: 1 })
          return
        }
        if(isMatch){
          //var session_token = generate_session_token()
          //request.session[session_token] = user.username
          //request.session.save()
          response.json({ msg: 'user successfully authorized', status: 0,
            user: user })
        }else{
          response.json({ msg: 'password is incorrect', status: 1, })
        }
      })
    })
  })
}

function generate_session_token(){
  var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  var session_token = "";
  for(var i = 0; i < 30; i++){
    var index = Math.floor(Math.random()*100) % charset.length;
    session_token += charset[index];
  }
  console.log(session_token)
}

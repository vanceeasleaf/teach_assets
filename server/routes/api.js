/*
 * @Author: YangZhou
 * @Date:   2017-07-08 15:55:44
 * @Last Modified by:   vance
 * @Last Modified time: 2017-08-02 01:29:32
 */
'use strict';
var express = require('express');
var app = express()
var router = express.Router();
var moment = require('moment');
var jwt = require('jwt-simple');
var bodyParser = require('body-parser');
var jwtauth = require('../middleware/jwtauth')
var models = require('../models');
var User = models.User;
app.set('jwtTokenSecret', '$$dong.mom@2335');
/* GET home page. */
router.get('/username', [bodyParser.json(), jwtauth], function(req, res, next) {
  return res.jsonp(req.user);
});

function authUser(user, res) {
  var expires = moment().add('days', 30).valueOf();
  // User has authenticated OK
  var token = jwt.encode({
    iss: user._id,
    exp: expires
  }, app.get('jwtTokenSecret'));
  return res.json({
    access_token: token,
    user: user
  }
  );
}
router.post('/user', [bodyParser.json(), jwtauth], function(req, res, next) {
  var _id = req.body._id;
  if (!_id) {
    // user not found
    return res.json({
      status: 401,
      msg: "错误的id"
    });
  }
  User.findOne({
    _id: _id
  }, function(err, user) {
    if (err) {
      return res.json({
        status: 500,
        msg: "查询失败"
      });
    }
    for (var key in req.body) {
      if (key === _id) continue;
      user[key] = req.body[key];
    }
    user.save(function(err, user) {
      return res.json({
        status: 200,
        user: user
      })
    })
  });
});
router.post('/auth', function(req, res, next) {
  var username = req.body.username; // form-data 
  if (!username) {
    // user not found
    return res.json({
      status: 401,
      msg: "请输入用户名"
    });
  }
  User.findOne({
    username: username
  }, function(err, user) {
    if (err) {
      // user not found
      return res.json({
        status: 500,
        msg: "登录失败"
      });
    }
    if (!user) {
      return res.json({
        status: 401,
        msg: "用户名不存在"
      });
    }
    authUser(user, res)
  });
});
module.exports = router;

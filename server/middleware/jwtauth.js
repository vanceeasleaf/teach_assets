/*
 * @Author: YangZhou
 * @Date:   2017-07-08 16:06:49
 * @Last Modified by:   vance
 * @Last Modified time: 2017-08-02 00:56:31
 */
'use strict';
var models = require('../models');
var User = models.User;
var jwt = require('jwt-simple');
var express = require('express');
var app = express()
app.set('jwtTokenSecret', '$$dong.mom@2335');
module.exports = function(req, res, next) {
var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['access-token'];
if (token) {
  try {
    var decoded = jwt.decode(token, app.get('jwtTokenSecret'));
    // handle token here
    if (decoded.exp <= Date.now()) {
      res.end('Access token has expired', 400);
    }
    User.findOne({
      _id: decoded.iss
    }, function(err, user) {
      if (err) {
        res.sendStatus(401)
      }
      req.user = user;
      next()
    });
  } catch ( err ) {
    res.sendStatus(401)
  }
} else {
  res.sendStatus(401)
}
};

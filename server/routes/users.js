var express = require('express');
var router = express.Router();
var models = require('../models');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/parker');
var User = models.User;
/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find(function(err, doc) {
    res.json(doc);
  });
});
module.exports = router;

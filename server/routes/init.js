var express = require('express');
var router = express.Router();
var models = require('../models');
var User = models.User;
/* GET home page. */
router.get('/', function(req, res, next) {
  var user = new User({
    email: 'nowind_lee@qq.com',
    name: 'Freewind'
  });
  user.save();
  res.send('Data inited');
});
module.exports = router;

/*
 * @Author: YangZhou
 * @Date:   2017-07-08 15:55:44
 * @Last Modified by:   vance
 * @Last Modified time: 2017-08-03 02:51:17
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
var multiparty = require('multiparty');
var fs = require('fs');
var User = models.User;
var File = models.File;
app.set('jwtTokenSecret', '$$dong.mom@2335');
/* GET home page. */
router.get('/username', [bodyParser.json(), jwtauth], function(req, res, next) {
  return res.jsonp(req.user);
});
router.get('/users', [bodyParser.json(), jwtauth], function(req, res, next) {
  User.find(function(err, users) {
    return res.json(users)
  })
});
router.get('/files', [bodyParser.json(), jwtauth], function(req, res, next) {
  var filter = {
    userid: req.user._id
  };
  if (req.user.course == "paike")
    filter = {};
  File.find(filter, function(err, files) {
    return res.json(files)
  })
});
router.get('/download/:_id', [bodyParser.json(), jwtauth], function(req, res, next) {
  File.findOne({
    _id: req.params._id
  }, function(err, file) {
    if (file.path) {
      return res.download(file.path);
    }
    else return res.sendStatus(404);
  })
});
function mkdirsSync(dirname) {
  //console.log(dirname);  
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}
/* 上传*/
router.post('/upload', [bodyParser.json(), jwtauth], function(req, res, next) {
  console.log(req.user);
  //生成multiparty对象，并配置上传目标路径
  if (!fs.existsSync('./public/files/')) {
    mkdirsSync('./public/files/');
  }
  var form = new multiparty.Form({
    uploadDir: './public/files/'
  });
  //上传完成后处理
  form.parse(req, function(err, fields, files) {
    var filesTmp = JSON.stringify(files, null, 2);

    if (err) {
      console.log('parse error: ' + err);
    } else {
      console.log('parse files: ' + filesTmp);
      var inputFile = files.file[0];
      var uploadedPath = inputFile.path;
      var xx = inputFile.originalFilename.split('.')
      var ext = xx.length > 1 ? xx[xx.length - 1] : '';
      var filename = req.user.course + '_' + req.user.realname + '_' + moment().format('YYYYMMDD_hhmmss') + "." + ext; //inputFile.originalFilename;
      var dstPath = './public/files/' + filename;
      //重命名为真实文件名
      fs.rename(uploadedPath, dstPath, function(err) {
        if (err) {
          console.log('rename error: ' + err);
        } else {
          console.log('rename ok');
        }
      });
    }
    var file = new File({
      path: dstPath,
      filename: filename,
      userid: req.user._id
    })
    file.save(function(err, file) {
      res.json(file);
    });
  });
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

router.post('/del_user/:_id', [bodyParser.json(), jwtauth], function(req, res, next) {
  User.remove({
    _id: req.params._id
  }, function(err) {
    return res.json({
      status: 200
    })
  })
})
router.post('/del_file/:_id', [bodyParser.json(), jwtauth], function(req, res, next) {
  File.findOne({
    _id: req.params._id
  }, function(err, file) {
    if (!err) {
      fs.unlink(file.path, function(err) {
        if (!err) {
          File.remove({
            _id: req.params._id
          }, function(err) {
            return res.json({
              status: 200
            })
          })
        }
      })
    }
  });


})
router.post('/add_user', [bodyParser.json(), jwtauth], function(req, res, next) {
  var user = new User();
  for (var key in req.body) {
    user[key] = req.body[key];
  }
  user.save(function(err, user) {
    return res.json({
      status: 200,
      user: user
    })
  })
})
router.post('/file/:_id', [bodyParser.json(), jwtauth], function(req, res, next) {
  var _id = req.params._id;
  if (!_id) {
    // user not found
    return res.json({
      status: 401,
      msg: "错误的id"
    });
  }
  File.findOne({
    _id: _id
  }, function(err, file) {
    if (err) {
      return res.json({
        status: 500,
        msg: "查询失败"
      });
    }
    for (var key in req.body) {
      if (key === _id) continue;
      file[key] = req.body[key];
    }
    file.save(function(err, file) {
      return res.json(file)
    })
  });
});
router.post('/user/:_id', [bodyParser.json(), jwtauth], function(req, res, next) {
  var _id = req.params._id;
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

/*
 * @Author: YangZhou
 * @Date:   2017-07-07 11:36:52
 * @Last Modified by:   vance
 * @Last Modified time: 2017-08-02 15:38:13
 */
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Define User schema 
var _User = new Schema({
  username: String,
  password: String,
  realname: String,
  course: String,
  insert_time: Date
});
// export them 
exports.User = mongoose.model('User', _User);

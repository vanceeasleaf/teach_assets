/*
 * @Author: YangZhou
 * @Date:   2017-07-07 11:36:52
 * @Last Modified by:   YangZhou
 * @Last Modified time: 2017-07-10 23:39:40
 */
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Define User schema 
var _User = new Schema({
  phone: String,
  nickname: String,
  insert_time: Date,
  sex: String,
  grade: String,
  school: String,
  birthday: Date
});
// export them 
exports.User = mongoose.model('User', _User);

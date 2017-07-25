/*
* @Author: vance
* @Date:   2017-07-23 17:30:10
* @Last Modified by:   vance
* @Last Modified time: 2017-07-25 11:33:48
*/
import React, { Component } from 'react';
import logo from './images/logo.jpg';
import WrappedNormalLoginForm from './WrappedNormalLoginForm';
import './Login.css';
class Login extends Component {
  render() {
    return (
      <div className="Login">
        <div className="Login-header">
          <div className="Login-main">
            <img src={ logo }
                 className="Login-logo"
                 alt="logo" />
            <h2 className="Login-title">教学资源管理系统</h2>
            <div className="Login-login-form">
              <WrappedNormalLoginForm />
            </div>
          </div>
        </div>
      </div>);
  }
}
export default Login;

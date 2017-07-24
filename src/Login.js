import React, { Component } from 'react';
import logo from './images/logo.jpg';
import WrappedNormalLoginForm from './WrappedNormalLoginForm';
import './Login.css';
class Login extends Component {
  render() {
    return (
      <div className="Login">
        <div className="Login-header">
          <img
               src={ logo }
               className="Login-logo"
               alt="logo" />
          <h2 className="Login-title">教学资源管理系统</h2>
          <div className="Login-login-form">
            <WrappedNormalLoginForm />
          </div>
        </div>
      </div>);
  }
}
export default Login;

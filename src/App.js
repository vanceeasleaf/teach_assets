import React, { Component } from 'react';
import logo from './images/logo.jpg';
import WrappedNormalLoginForm from './Login';
import './App.css';
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img
               src={ logo }
               className="App-logo"
               alt="logo" />
          <h2 className="App-title">教学资源管理系统</h2>
          <div className="App-login-form">
            <WrappedNormalLoginForm />
          </div>
        </div>
      </div>);
  }
}
export default App;

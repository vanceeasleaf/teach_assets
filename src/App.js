import React, { Component } from 'react';
import logo from './logo.svg';
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
          <h2 className="App-title">欢迎使用家辉培优教学资源管理系统</h2>
          <p className="App-intro">
            <WrappedNormalLoginForm/>
          </p>
        </div>
      </div>);
  }
}
export default App;

/*
* @Author: vance
* @Date:   2017-07-23 17:30:10
* @Last Modified by:   vance
* @Last Modified time: 2017-08-03 02:45:51
*/
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Login';
import Home from './Home';
import TeacherHome from './teacher/Home';
import AdminHome from './admin/Home';
import PaikeHome from './paike/Home';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
ReactDOM.render(<Router>
                  <div>
                    <Route exact
                           path="/login"
                           component={ Login } />
                    <Route exact
                           path="/"
                           component={ Login } />
                    <Route path="/paike_home" component={ PaikeHome } />
                    <Route path="/teacher_home" component={ TeacherHome } />
                    <Route path="/admin_home" component={ AdminHome } />
                  </div>
                </Router>, document.getElementById('root'));
registerServiceWorker();

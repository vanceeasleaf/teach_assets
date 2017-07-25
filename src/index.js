import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Login';
import Home from './Home';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
ReactDOM.render(<Router>
                  <div>
                    <Route exact
                           path="/"
                           component={ Login } />
                    <Route path="/home" component={ Home } />
                    <Route path="/inbox" component={ Login } />
                  </div>
                </Router>, document.getElementById('root'));
registerServiceWorker();

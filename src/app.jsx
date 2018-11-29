/*global $*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { NotFound, Home, Dashboard, Login } from './pages';
import { Container } from './components';
import configureStore from './redux/store/configureStore';
import { Provider } from 'react-redux';
import { checkloginStatus } from './utils/authorization'

/* BASIC FUNCTIONALITY RULES written by  "He who must not be named" - do not alter ¯\_(ツ)_/¯  */

// Load the Data  
// Parse the Data and store it in appropriate data structures 
// Filter it for useful information and mine it to decide on what to represent 
// Create the plots 
// Add interactivity to the plots 
// Refine the plots 


//Root sass file for webpack to compile
import './sass/main.scss';

//Initial Default settings 
const store = configureStore();

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router history={hashHistory}>
          <Route path='/' component={Container}>
            <IndexRoute component={Home} />
            <Route path='Dashboard' component={Dashboard} onEnter={checkloginStatus} />
            <Route path='Login' component={Login} />
            <Route path='*' component={NotFound} />
          </Route>
        </Router>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))


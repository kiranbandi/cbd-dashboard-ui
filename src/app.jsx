/*global $*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Dashboard } from './pages';
import { Container } from './components';
import configureStore from './redux/store/configureStore';
import { Provider } from 'react-redux';
import { applyPolyfills, defineCustomElements } from "@seanwong24/s-tooltip/loader";

import './utils/libraries/toolkit.min.js';

//Root sass file for webpack to compile
import './sass/main.scss';
import './utils/css/toolkit-light.scss';

//Initial Default settings 
const store = configureStore();

class App extends Component {
  render() {
    return (<Provider store={store}><Container> <Dashboard /></Container></Provider>)
  }
}

ReactDOM.render(<App />, document.getElementById('custom-dashboard-mount'))

// For Sean's tooltip , might have to move this out of root 
// and probably into the tooltip defining component itself.
applyPolyfills().then(() => { defineCustomElements() });
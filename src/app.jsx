/*global $*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Dashboard } from './pages';
import { Container } from './components';
import configureStore from './redux/store/configureStore';
import { Provider } from 'react-redux';
import { applyPolyfills, defineCustomElements } from "@seanwong24/s-tooltip/loader";

//Root sass file for webpack to compile
import './sass/main.scss';
import './utils/css/toolkit-light.scss';

//Initial Default settings 
const store = configureStore();

class App extends Component {
  render() {
    return (<Provider store={store}><Container><Dashboard/></Container></Provider>)
  }
}

ReactDOM.render(<App />, document.getElementById('visual-summary-content-mount'));

// For custom tooltip support 
applyPolyfills().then(() => { defineCustomElements() });
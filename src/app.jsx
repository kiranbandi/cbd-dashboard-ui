/*global $*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Dashboard } from './pages';
import { Container } from './components';
import configureStore from './redux/store/configureStore';
import { Provider } from 'react-redux';
import { applyPolyfills, defineCustomElements } from "@seanwong24/s-tooltip/loader";
// Import and Initialize react-dates at the top of the app for use anywhere within
import 'react-dates/initialize';
//Root sass file for webpack to compile
import './sass/main.scss';
import 'react-dates/lib/css/_datepicker.css';
import './utils/css/toolkit-light.scss';

//Initial Default settings 
const store = configureStore();

class App extends Component {

  componentDidMount() {
    // For the first time get the size of the visual summary mount point width
    // and store it in a global variable used across the dashboard.
    //125px to offset the 30px margin on both sides and vertical scroll bar width
    window.dynamicDashboard = {};
    window.dynamicDashboard.mountWidth = document.getElementById('visual-summary-content-mount').getBoundingClientRect().width - 125;
  }


  render() {
    return (<Provider store={store}><Container><Dashboard /></Container></Provider>)
  }
}

ReactDOM.render(<App />, document.getElementById('visual-summary-content-mount'));

// For custom tooltip support 
applyPolyfills().then(() => { defineCustomElements() });
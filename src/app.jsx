/*global $*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Tools from './pages/Tools';
import configureStore from './redux/store/configureStore';
import { Provider } from 'react-redux';
import { applyPolyfills, defineCustomElements } from "@seanwong24/s-tooltip/loader";

//Root sass file for webpack to compile
import './sass/main.scss';
//Initial Default settings 
const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Tools />
      </Provider>)
  }
}

ReactDOM.render(<App />, document.getElementById('dashboard-content-mount'))

// For Sean's tooltip , might have to move this out of root 
// and probably into the tooltip defining component itself.
applyPolyfills().then(() => { defineCustomElements() });
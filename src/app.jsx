/*global $*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { NotFound, Home, Dashboard, ExportProcessor } from './pages';
import { Container } from './components';
import configureStore from './redux/store/configureStore';
import { Provider } from 'react-redux';
import processQueryParams from './utils/processQueryParams';
import { applyPolyfills, defineCustomElements } from "@seanwong24/s-tooltip/loader";

//Root sass file for webpack to compile
import './sass/main.scss';
//Initial Default settings 
const store = configureStore();
// Custom implementation , if a ticket is being passed it is consumed here 
// and the root path is set back to normal
//  This can be rewritten more gracefully in future with updated version of react-router
var pawsTicket = processQueryParams().ticket || false;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={hashHistory}>
          <Route path='/' component={Container} pawsTicket={pawsTicket}>
            <IndexRoute component={Home} />
            <Route path='export-processor' component={ExportProcessor} />
            <Route path='PGME/Dashboard' component={Dashboard} pawsTicket={pawsTicket}/>
            <Route path='*' component={NotFound} />
          </Route>
        </Router>
      </Provider>)
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

// For Sean's tooltip , might have to move this out of root 
// and probably into the tooltip defining component itself.
applyPolyfills().then(() => { defineCustomElements() });
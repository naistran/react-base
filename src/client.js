import React from 'react';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import Location from 'react-router/lib/Location';
import { App, routes, runRouter } from './app';

const history = new BrowserHistory();
const { pathname, search } = document.location;
const location = new Location(pathname, search);

runRouter(routes, App, location, history)
  .then(({ component }) => {
    React.render(component, document.getElementById('body'));
  })
  .catch(err => {
    // HANDLE ERROR HERE
    /* eslint no-console: 0 */
    console.error(err);
  });

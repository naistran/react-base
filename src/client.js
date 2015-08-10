import React from 'react';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import runRouter from './Root/runRouter';

const history = new BrowserHistory();
const { pathname, search } = document.location;

runRouter(pathname, search, history)
  .then(({ component }) => {
    React.render(component, document.getElementById('body'));
  })
  .catch(err => {
    // HANDLE ERROR HERE
    /* eslint no-console: 0 */
    console.error(err);
  });

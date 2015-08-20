import React from 'react';
import Router from 'react-router';
import Location from 'react-router/lib/Location';
import routes from './App/routes';
import Root from './Root';

const history = __CLIENT__ ?
  require('react-router/lib/BrowserHistory').history : undefined;

function run(path, query, store) {
  const location = new Location(path, query);
  return new Promise((resolve, reject) => {
    Router.run(routes, location, (err, routerState, transition) => {
      if (err) return reject(err);

      if (transition && transition.redirectInfo) {
        return resolve({
          redirectPath: transition.redirectInfo.pathname,
        });
      }

      const state = {
        ...routerState,
        history,
      };

      return resolve({
        component: <Root store={store} routerState={state}/>,
      });
    });
  });
}

export default run;

import React from 'react';
import Router from 'react-router';
import Location from 'react-router/lib/Location';
import Root from './';
import routes from './App/routes';

function runRouter(path, query, history, store) {
  const location = new Location(path, query);
  return new Promise((resolve, reject) => {
    Router.run(routes, location, (error, routerState, transition) => {
      if (error) return reject(error);

      if (transition && transition.redirectInfo) {
        return resolve({
          redirectPath: transition.redirectInfo.pathname,
        });
      }

      // for client only
      if (history) {
        routerState.history = history;
      }

      return resolve({
        component: <Root store={store} routes={routes} routerState={routerState}/>,
      });
    });
  });
}

export default runRouter;

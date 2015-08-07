import React from 'react';
import Router from 'react-router';

function runRouter(routes, App, location, history) {
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

      const component = <App routes={routes} routerState={routerState}/>;
      return resolve({ component });
    });
  });
}

export default runRouter;

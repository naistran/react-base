import React from 'react';
import Router from 'react-router';
import Location from 'react-router/lib/Location';
import routes from './routes';
import App from './components/App';
import Html from './components/Html';

export function route(path, query, history) {
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

      const component = <App routes={routes} routerState={routerState}/>;
      return resolve({ component });
    });
  });
}

export function renderHTML(component) {
  const html = <Html component={component}/>;
  return `<!DOCTYPE html>${React.renderToString(html)}`;
}

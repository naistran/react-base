import './css/index.css';

import React from 'react';
import { render } from 'react-dom';
import { RoutingContext, match } from 'react-router';
// import { Router } from 'react-router';
import { Provider } from 'react-redux';
import createHistory from 'history/lib/createBrowserHistory';
import createStore from '../shared/createStore';
import routes from '../shared/routes';
import createDevToolsWindow from './createDevToolsWindow';

const root = document.getElementById('root');
const store = createStore(window.__INITIAL_STATE__);
const history = createHistory();

// TODO: not complete. Waiting for official guide
history.listen(location => {
  match({ routes, history, location }, (err, redirectLocation, renderProps) => {
    render(
      <Provider store={store}>
        <RoutingContext {...renderProps}/>
      </Provider>,
      root
    );
  });
});

// render(
//   <Provider store={store}>
//     <Router history={history} routes={routes}/>
//   </Provider>,
//   root
// );

if (process.env.NODE_ENV !== 'production') {
  createDevToolsWindow(store);
}

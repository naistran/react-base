import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './App/reducer';

const middleware = [thunk];

let finalCreateStore = applyMiddleware(...middleware)(createStore);

if (__CLIENT__ && __DEV__) {
  const { devTools, persistState } = require('redux-devtools');
  finalCreateStore = compose(
    applyMiddleware(...middleware),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
    createStore
  );
}

function Store(initialState = {}) {
  return finalCreateStore(reducer, initialState);
}

export default Store;

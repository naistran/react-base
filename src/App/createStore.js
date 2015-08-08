import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers';

const finalCreateStore = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);

function Store(initialState = {}) {
  const store = finalCreateStore(reducer, initialState);
  return store;
}

export default Store;

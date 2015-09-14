import { combineReducers } from 'redux';
import Home from './routes/Home/reducer';

const rootReducer = combineReducers({
  Home,
});

export default rootReducer;

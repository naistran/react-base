import { handleActions } from 'redux-actions';

const initialState = {
  count: 0,
};

export default handleActions({
  COUNTER_INCREMENT: state => {
    const { count } = state;
    return { count: count + 1 };
  },
}, initialState);

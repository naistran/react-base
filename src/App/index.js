import React, { PropTypes } from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import createStore from './createStore';

const store = createStore();

class AppContainer extends React.Component {
  static propTypes = {
    routes: PropTypes.object.isRequired,
    routerState: PropTypes.object.isRequired,
  }

  static defaultProps = {
    routerState: {},
  }

  render() {
    const { routes, routerState } = this.props;
    return (
      <Provider store={store}>
        {() => <Router {...routerState} children={routes}/>}
      </Provider>
    );
  }
}

export default AppContainer;

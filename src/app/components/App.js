import React, { PropTypes } from 'react';
import { Router } from 'react-router';

class App extends React.Component {
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
      <Router {...routerState} children={routes}/>
    );
  }
}

export default App;

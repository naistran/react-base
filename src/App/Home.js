import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as counterActions from './actions/counter';

class Home extends React.Component {
  render() {
    return (
      <main role="main">
        <h1>You're Home</h1>
        <p>
          <button onClick={this.props.increment}>Increment</button> - {this.props.count}
        </p>
        <Link to="explore">Explore</Link>
      </main>
    );
  }
}

export default connect(
  state => ({
    count: state.counter.count,
  }),
  counterActions
)(Home);

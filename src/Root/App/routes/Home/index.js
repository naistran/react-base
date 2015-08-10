import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as counterActions from '../../actions/counter';

class Home extends React.Component {
  render() {
    const { increment, count } = this.props;
    return (
      <main role="main">
        <h1>You're Home</h1>
        <p>
          {count} <button onClick={increment}>Increment</button>
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

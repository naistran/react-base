import React, { PropTypes } from 'react';
import { Link } from 'react-router';

class Home extends React.Component {
  static propTypes = {
    children: PropTypes.element,
  }

  render() {
    return this.props.children || (
      <main role="main">
        <h1>You're Home</h1>
        <Link to="explore">Explore</Link>
      </main>
    );
  }
}

export default Home;

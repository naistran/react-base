import React from 'react';
import { Link } from 'react-router';

class Explore extends React.Component {
  render() {
    return this.props.children || (
      <main role="main">
        <h1>Explore</h1>
        <Link to="/explore/locations">Locations</Link>
      </main>
    );
  }
}

export default Explore;

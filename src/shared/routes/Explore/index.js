import React from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

class Explore extends React.Component {
  render() {
    return this.props.children || (
      <main role="main">
        <Helmet title="React Base: Explore"/>
        <h1>Explore</h1>
        <Link to="/explore/locations">Locations</Link>
      </main>
    );
  }
}

export default Explore;

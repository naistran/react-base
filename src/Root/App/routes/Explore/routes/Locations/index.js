import React from 'react';
import { Link } from 'react-router';

class Locations extends React.Component {
  render() {
    return (
      <main role="main">
        <h1>Locations</h1>
        <ul>
          <li>Sydney</li>
          <li>Gold Coast</li>
          <li>Melbourne</li>
        </ul>
        <Link to="/">Home</Link>
      </main>
    );
  }
}

export default Locations;

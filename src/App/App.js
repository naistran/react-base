import React from 'react';
import Home from './Home';

class Root extends React.Component {
  render() {
    return (
      <div>
        {this.props.children || <Home {...this.props}/>}
      </div>
    );
  }
}

export default Root;

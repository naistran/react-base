import React, {
  Component,
  PropTypes,
  renderToString,
} from 'react';
import serialize from 'serialize-javascript';

class Html extends Component {
  static propTypes = {
    component: PropTypes.element,
    store: PropTypes.object.isRequired,
  }

  render() {
    const { component, store } = this.props;
    const title = 'React Base';
    return (
      <html lang="en">
      <head>
        <meta charSet="UTF-8"/>
        <title>{title}</title>
        {/* <link rel="stylesheet" href="/build/index.css"/> */}
      </head>
      <body>
        <div id="body" dangerouslySetInnerHTML={{ __html: renderToString(component) }}/>
        <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__=${serialize(store.getState())}` }}/>
        <script src="/build/index.js"/>
      </body>
      </html>
    );
  }
}

export default Html;

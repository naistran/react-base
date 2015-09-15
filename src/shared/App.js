import React from 'react';
import Helmet from 'react-helmet';

const title = 'React Base';
const description = 'Modern React Base';
const image = 'https://avatars1.githubusercontent.com/u/1136800?v=3&s=200';

class App extends React.Component {
  render() {
    return (
      <div>
        <Helmet
          title={title}
          meta={[
            { name: 'description', 'content': description },
            { property: 'og:site_name', content: title },
            { property: 'og:image', content: image },
            { property: 'og:locale', content: 'en_US' },
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
            { property: 'twitter:card', content: 'summary' },
            { property: 'twitter:site', content: '@nthtran' },
            { property: 'twitter:creator', content: '@nthtran' },
            { property: 'twitter:title', content: title },
            { property: 'twitter:description', content: description },
            { property: 'twitter:image', content: image },
            { property: 'twitter:image:width', content: '200' },
            { property: 'twitter:image:height', content: '200' },
          ]}
        />
        {this.props.children}
      </div>
    );
  }
}

export default App;

import React from 'react';
import DocumentMeta from 'react-document-meta';

const title = 'React Base';
const description = 'Modern React Base';
const image = 'https://avatars1.githubusercontent.com/u/1136800?v=3&s=200';

const meta = {
  title,
  description,
  meta: {
    charSet: 'utf-8',
    property: {
      'og:site_name': title,
      'og:image': image,
      'og:locale': 'en_US',
      'og:title': title,
      'og:description': description,
      'twitter:card': 'summary',
      'twitter:site': '@nthtran',
      'twitter:creator': '@nthtran',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': image,
      'twitter:image:width': '200',
      'twitter:image:height': '200',
    },
  },
};

class App extends React.Component {
  render() {
    return (
      <div>
        <DocumentMeta {...meta}/>
        {this.props.children}
      </div>
    );
  }
}

export default App;

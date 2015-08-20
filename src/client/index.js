import './css/index.css';

import React from 'react';
import run from '../shared/run';

const { pathname, search } = document.location;

run(pathname, search)
  .then(({ component }) => {
    React.render(component, document.getElementById('body'));
  })
  .catch(err => {
    // HANDLE ERROR HERE
    /* eslint no-console: 0 */
    console.error(err);
  });

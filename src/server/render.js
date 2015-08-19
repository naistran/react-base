import createStore from '../shared/createStore';
import runRouter from '../assets/build/runRouter';
import renderHTML from './renderHTML';
const manifest = __DEV__ ? {
  'main.js': 'index.js',
  'main.css': 'index.css',
} : require('../assets/build/manifest');

function* render() {
  const store = createStore();
  const {
    component,
    redirectPath,
  } = yield runRouter(this.path, this.search, undefined, store);

  if (redirectPath) {
    return this.redirect(redirectPath);
  }

  this.body = renderHTML(component, store);
}

export default render;

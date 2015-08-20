import createStore from '../shared/createStore';
import run from '../shared/build/run';
import renderHTML from './renderHTML';

function* render() {
  const store = createStore();
  const { component, redirectPath } = yield run(this.path, this.search, store);

  if (redirectPath) {
    return this.redirect(redirectPath);
  }

  this.body = renderHTML(component, store.getState());
}

export default render;

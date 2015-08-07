export App from './components/App';
export Html from './components/Html';
export runRouter from './runRouter';

export const routes = {
  path: '/',
  component: require('./components/Home'),
  childRoutes: [
    require('./routes/Explore'),
    require('./routes/NotFound'),
  ],
};

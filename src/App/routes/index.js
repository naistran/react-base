export default {
  path: '/',
  component: require('../App'),
  childRoutes: [
    require('./Explore/routes'),
    require('./NotFound/routes'),
  ],
};

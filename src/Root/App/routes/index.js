export default {
  component: require('..'),
  childRoutes: [
    require('./Home/routes'),
    require('./Explore/routes'),
    require('./NotFound/routes'),
  ],
};

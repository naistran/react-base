export default {
  path: '/',
  component: require('../App'),
  indexRoute: { component: require('./Home') },
  childRoutes: [
    require('./Explore/routes'),
    { path: '*', component: require('./NotFound') },
  ],
};

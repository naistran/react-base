export default {
  path: '/',
  component: require('./components/Home'),
  childRoutes: [
    require('./routes/Explore'),
    require('./routes/NotFound'),
  ],
};

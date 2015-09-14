export default {
  path: 'explore',

  getComponents(location, cb) {
    require.ensure([], require => {
      cb(null, require('..'));
    });
  },

  getChildRoutes(location, cb) {
    require.ensure([], require => {
      cb(null, [
        require('./Locations/routes'),
      ]);
    });
  },
};

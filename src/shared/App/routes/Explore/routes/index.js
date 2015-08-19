if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

export default {
  path: 'explore',

  getComponents(cb) {
    require.ensure([], require => {
      cb(null, require('..'));
    });
  },

  getChildRoutes(state, cb) {
    require.ensure([], require => {
      cb(null, [
        require('./Locations/routes'),
      ]);
    });
  },
};

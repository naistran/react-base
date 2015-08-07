if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

export default {
  path: 'explore',

  getChildRoutes(state, cb) {
    require.ensure([], require => {
      cb(null, [
        require('./routes/Locations'),
      ]);
    });
  },

  getComponents(cb) {
    require.ensure([], require => {
      cb(null, require('./components/Explore'));
    });
  },
};

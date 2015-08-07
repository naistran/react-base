if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

export default {
  path: 'locations',

  getComponents(cb) {
    require.ensure([], require => {
      cb(null, require('./components/Locations'));
    });
  },
};

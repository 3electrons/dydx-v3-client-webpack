// https://stackoverflow.com/questions/64557638/how-to-polyfill-node-core-modules-in-webpack-5

module.exports = {
  target: 'web',
  mode: 'production',
  resolve: {
    // ... rest of the resolve config
    fallback: {
      fs: false,
      path: require.resolve('path-browserify'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
      http: require.resolve('stream-http'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
    },
  },
};

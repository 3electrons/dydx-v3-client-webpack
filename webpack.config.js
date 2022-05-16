// https://stackoverflow.com/questions/64557638/how-to-polyfill-node-core-modules-in-webpack-5
// https://github.com/browserify/node-util/issues/43 - getting rid of NODE_DEBUG
// https://viglucci.io/how-to-polyfill-buffer-with-webpack-5 - getting rid of Buffer 


const webpack = require("webpack")

module.exports = {
  target: 'web',
  mode: 'production',

  plugins: [
    // fix "process is not defined" error:
    // (do "npm install process" before running the build)
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
  }),
  ],

  resolve: {
    // ... rest of the resolve config
    fallback: {
      //fs: false,      
      buffer: require.resolve('buffer/'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
      http: require.resolve('stream-http'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),

    },    
  },
};

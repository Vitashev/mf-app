const sharedConfig = require('./shared-config');

module.exports = {
  output: {
    uniqueName: 'shell',
    publicPath: 'auto',
  },
  optimization: {
    runtimeChunk: false,
    minimize: false,
  },
  resolve: {
    alias: {
      ...sharedConfig.sharedMappings.getAliases(),
    },
  },
  plugins: [],
};

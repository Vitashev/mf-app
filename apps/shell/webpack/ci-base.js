const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const baseWebpackConfig = require('./base');
const sharedConfig = require('./shared-config');

module.exports = {
  ...baseWebpackConfig,
  plugins: [
    ...baseWebpackConfig.plugins,
    new ModuleFederationPlugin({
      ...sharedConfig.moduleFederationBaseConfig,
      remotes: sharedConfig.buildRemotes('/apps'),
    }),
  ],
};

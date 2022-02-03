const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const baseWebpackConfig = require('./base');
const sharedConfig = require('./shared-config');

function buildRemotes() {
  const remoteModules = sharedConfig.variables.remoteModulesMapping;
  const remotes = Object.keys(remoteModules).map((key) => ({
    remoteName: key,
    remotePath: remoteModules[key],
  }));

  return remotes.reduce((result, remote) => {
    return {
      ...result,
      [remote.remoteName]: `${remote.remoteName}@${remote.remotePath
        .trim()
        .replace(/\/$/g, '')}/remoteEntry.js`,
    };
  }, {});
}

module.exports = {
  ...baseWebpackConfig,
  plugins: [
    ...baseWebpackConfig.plugins,
    new ModuleFederationPlugin({
      ...sharedConfig.moduleFederationBaseConfig,
      remotes: buildRemotes(),
    }),
  ],
};

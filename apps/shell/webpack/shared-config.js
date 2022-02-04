const path = require('path');
const mf = require('@angular-architects/module-federation/webpack');
const webpack = require('webpack');

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, '../../../tsconfig.base.json'), [
  '@mf-app/shared/data-store',
]);

new webpack.EnvironmentPlugin({
  REMOTE_PATH: null,
  DEPLOY_PATH: null,
});

/** Here should be registered remote modules and their remote paths for serving. Name of module should correspond to the name in workspace.json */
const remoteModulesMapping = {
  gallery: 'http://localhost:5000/',
  auth: 'http://localhost:3500/',
  platform: 'http://localhost:3600/'
};

const variables = {
  /** Returns the list of remotes */
  remoteModules: Object.keys(remoteModulesMapping),

  /** Returns the mapping between remote name and its serving url */
  remoteModulesMapping,

  /**
   * The remote path that is assigned foreach remote module.
   * Env variable is used here because it may vary depending on environment in CI/CD process
   **/
  remotePath: process.env.REMOTE_PATH,
};

const moduleFederationBaseConfig = {
  shared: {
    '@angular/core': {
      singleton: true,
      strictVersion: true,
      requiredVersion: '12.2.9',
    },
    '@angular/common': {
      singleton: true,
      strictVersion: true,
      requiredVersion: '12.2.9',
    },
    '@angular/common/http': {
      singleton: true,
      strictVersion: true,
      requiredVersion: '12.2.9',
    },
    '@angular/router': {
      singleton: true,
      strictVersion: true,
      requiredVersion: '12.2.9',
    },
    ...sharedMappings.getDescriptors(),
  },
};

function buildRemotes(remotePath) {
  const remotes = variables.remoteModules;
  remotePath = remotePath.trim().replace(/\/$/g, '');

  return remotes.reduce((result, remoteName) => {
    return {
      ...result,
      [remoteName]: `${remoteName}@${remotePath}/${remoteName}/remoteEntry.js`,
    };
  }, {});
}

module.exports = {
  moduleFederationBaseConfig,
  sharedMappings,
  variables,
  buildRemotes,
};

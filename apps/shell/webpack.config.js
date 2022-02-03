const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');
const config = require('../../scripts/config.js');

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, '../../tsconfig.base.json'), [
  '@mf-app/shared/data-store',
]);

function buildRemotes() {
  const remotes = config.remoteModules;
  const remotePath = config.remotePath.trim().replace(/\/$/g, '');
  
  return remotes.reduce((result, remoteName) => {
    return {
      ...result,
      [remoteName]: `${remoteName}@${remotePath}/${remoteName}/remoteEntry.js`
    }
  }, {})
}

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
      ...sharedMappings.getAliases(),
      Scripts: path.resolve(__dirname, '../../scripts/')
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      remotes: {
        ...buildRemotes()
      },
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
    }),
    sharedMappings.getPlugin(),
  ],
};

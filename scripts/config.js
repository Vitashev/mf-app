const webpack = require('webpack');
new webpack.EnvironmentPlugin({
  REMOTE_PATH: null,
});

module.exports = {
  /** Here should be registered remote modules. Name of module should correspond to the name in workspace.json */
  remoteModules: ['gallery'],

  /** 
   * The remote path that is assigned foreach remote module. 
   * Env variable is used here because it may vary depending on environment in CI/CD process 
   **/
  remotePath: process.env.REMOTE_PATH || '/apps/',
};

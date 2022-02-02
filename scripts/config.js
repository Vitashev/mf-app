
const webpack = require('webpack')
new webpack.EnvironmentPlugin({
    REMOTE_PATH: null
})

module.exports = {
    remoteModules: ['gallery'], // Here should be registered remote modules. Name of module should correspond to the name in workspace.json
    remotePath: process.env.REMOTE_PATH || '/apps/'
}

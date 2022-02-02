
const webpack = require('webpack')
new webpack.EnvironmentPlugin({
    REMOTE_PATH: null
})

module.exports = {
    remotePath: process.env.REMOTE_PATH || '/apps/'
}

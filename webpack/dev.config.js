require('babel-polyfill')

// Webpack config for development
var path = require('path')
var webpack = require('webpack')
var assetsPath = path.resolve(__dirname, '../static/dist')
var host = (process.env.HOST || 'localhost')
var port = (+process.env.PORT + 1) || 3001
var DOCKER_HOST = process.env.DOCKER_HOST

var babelOptions = {
  cacheDirectory: true,
  presets: ['react-hmre']
}

if (process.env.VISUALIZER) {
  babelOptions.plugins = [['react-transform', {
    'transforms': [{
      'transform': 'react-transform-render-visualizer'
    }]
  }]]
}

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'))

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': [
      'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
      './src/client.js'
    ]
  },
  output: {
    path: assetsPath,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: 'http://' + host + ':' + port + '/dist/'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel?' + JSON.stringify(babelOptions), 'standard'] },
      {test: /\.json$/, loader: 'json'},
      {test: /\.styl$/, loader: 'style!css?modules!stylus'},
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
      { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url?limit=10240' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' }
    ]
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      __SERVER__: false,
      __DEVELOPMENT__: true,
      'process.env': {
        DOCKER_HOST: JSON.stringify(DOCKER_HOST)
      }
    }),
    webpackIsomorphicToolsPlugin.development()
  ]
}

const merge = require('webpack-merge');
const parts = require('./webpack.parts');
const webpack = require('webpack');
const PATHS = require('./path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';

module.exports = merge([
  {
    entry: [
      'react-hot-loader/patch',
      // activate HMR for React
      `webpack-dev-server/client?http://${HOST}:${PORT}`,
      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint
      'webpack/hot/only-dev-server',
      // bundle the client for hot reloading
      // only- means to only hot reload for successful updates
      'babel-polyfill',
      PATHS.app,
    ],
    output: {
      path: PATHS.build,
      publicPath: '/',
      filename: 'bundle.js',
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      // new BundleAnalyzerPlugin({
      //   analyzerMode: 'server',
      //   analyzerHost: '127.0.0.1',
      //   analyzerPort: 5030,
      //   reportFilename: 'report.html',
      //   defaultSizes: 'parsed',
      //   openAnalyzer: true,
      // }),
    ],
  },
  // parts.lintJavaScript({
  //   include: PATHS.project,
  //   options: {
  //     emitWarning: true,
  //   }
  // }),
  parts.loadSCSS(),
  parts.Babel({
    include: PATHS.project,
    options: {
      plugins: [
        'react-hot-loader/babel',
        'transform-decorators-legacy',
        'transform-class-properties'
      ],
      presets: ['env', 'stage-2', 'react']
    },
    exclude: [/node_modules/, /\.test\.jsx?$/, /\.story\.(js|jsx)$/],
  }),
  parts.generateSourceMaps({ type: 'cheap-module-eval-source-map' }),
  parts.devServer({
    // Customize host/port here if needed
    host: HOST,
    port: PORT,
    overlay: {
      errors: true,
      warnings: true,
    }
  }),
  parts.npmInstall()
]);

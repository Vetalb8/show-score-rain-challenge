const webpack = require('webpack');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const PATHS = require('./path');


module.exports = merge([
  {
    plugins: [
      new HtmlWebpackPlugin({
        template: PATHS.appHtml,
        hash: false,
        inject: 'body',
        title: 'cupIphone',
      }),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new WebpackChunkHash(),
    ],
  },
  parts.loadFonts({
    options: {
      name: 'static/[name].[hash:8].[ext]',
    },
  }),
  parts.loadImages({
    options: {
      limit: 10000,
      name: 'static/img/[name].[hash:8].[ext]',
    },
  }),
  parts.loadSVG({
    options: {
      name: 'static/img/svg/[name].[hash:8].[ext]',
    }
  })
]);

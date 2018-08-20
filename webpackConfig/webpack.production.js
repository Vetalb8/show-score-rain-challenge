const merge = require('webpack-merge');
const webpack = require('webpack');

const PATHS = require('./path');
const parts = require('./webpack.parts');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');

module.exports = merge([
  {
    entry: [
      'babel-polyfill',
      PATHS.app,
    ],
    output: {
      path: PATHS.build,
      filename: '[name]-[hash].js',
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),
      new ExtractTextPlugin('[name]-[hash].min.css'),
      new StatsPlugin('webpack.stats.json', {
        source: false,
        modules: false,
      }),
    ],
  },
  parts.Babel({
    include: PATHS.project,
    options: {
      plugins: [
        'transform-runtime',
        'transform-decorators-legacy',
        'transform-class-properties',
        'transform-react-remove-prop-types',
        'transform-react-constant-elements',
        'transform-react-inline-elements'
      ],
      presets: ['env', 'stage-2', 'react']
    }
  }),
  parts.generateSourceMaps({ type: 'source-map' }),
  parts.minify(),
  parts.setFreeVariable(
    'process.env.NODE_ENV',
    'production'
  ),
  parts.extractSCSS({
    use: [
      { loader: 'css-loader', options: { sourceMap: true } },
      parts.autoprefix(),
      'resolve-url-loader',
      { loader: 'sass-loader', options: { sourceMap: true } }
    ],
  }),
  parts.extractBundles([
    {
      name: 'vendor',
      minChunks: ({ resource }) => (
        resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/\.js$/)
      ),
    },
    {
      name: 'manifest',
    },
  ]),
]);

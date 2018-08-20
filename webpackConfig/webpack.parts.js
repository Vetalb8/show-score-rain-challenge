const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const NpmInstallPlugin = require('npm-install-webpack-plugin');

/**
 * Babel
 * @param include
 * @param exclude
 * @param options
 * @constructor
 */
exports.Babel = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        // **Conditions**
        // Match files against RegExp or a function.
        test: /\.js$/,
        // **Restrictions**
        // Restrict matching to a directory. This
        // also accepts an array of paths or a function.
        // The same applies to `exclude`.
        include,
        exclude,
        // **Actions**
        // Apply loaders the matched files.
        // use: 'babel-loader',
        use: [
          {
            loader: 'babel-loader',
            options,
          }
        ],
      },
    ],
  },
});

/**
 * loadSCSS
 * @param include
 * @param exclude
 */
exports.loadSCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.scss$/,
        include,
        exclude,
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          },
        ],
      },
    ],
  },
});

/**
 * loadCSS
 * @param include
 * @param exclude
 */
exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
        ],
      },
    ],
  },
});

/**
 * autoprefix
 */
exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    plugins: () => ([
      require('autoprefixer'),
    ]),
  },
});

/**
 * extractCSS
 * @param include
 * @param exclude
 * @param use
 * @returns {{module: {rules: [*]}, plugins: [*]}}
 */
exports.extractCSS = ({ include, exclude, use }) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use,
        }),
      },
    ],
  },
});

/**
 * extractSCSS
 * @param include
 * @param exclude
 * @param use
 * @returns {{module: {rules: [*]}, plugins: [*]}}
 */
exports.extractSCSS = ({ include, exclude, use }) => ({
  module: {
    rules: [
      {
        test: /\.scss$/,
        include,
        exclude,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use,
        }),
      },
    ],
  },
});

/**
 * Load images
 * @param include folder path
 * @param exclude folder path
 * @param options
 */
exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif)$/,
        include,
        exclude,
        use: [
          {
            loader: 'url-loader',
            options,
          },
        ],
      },
    ],
  },
});

/**
 * loadFonts
 * @param include
 * @param exclude
 * @param options
 */
exports.loadFonts = ({ include, exclude, options }) => ({
  module: {
    rules: [
      {
        test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        include,
        exclude,
        use: {
          loader: 'file-loader',
          options,
        },
      },
    ],
  },
});

/**
 * loadSVG
 * @param include
 * @param exclude
 * @param options
 */
exports.loadSVG = ({ include, exclude, options }) => ({
  module: {
    rules: [
      {
        test: /\.svg$/,
        include,
        exclude,
        use: {
          loader: 'file-loader',
          options,
        },
      },
    ],
  },
});

/**
 * lintJavaScript
 * @param include
 * @param exclude
 * @param options
 */
exports.lintJavaScript = ({ include, exclude, options }) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre', // 'post' too
        include,
        exclude,
        loader: 'eslint-loader',
        options,
      },
    ],
  },
});

/**
 * Lint SCSS
 * @param include
 * @param exclude
 */
exports.lintSCSS = ({ include, exclude }) => ({
  module: {
    rules: [
      {
        test: /\.scss$/,
        include,
        exclude,
        enforce: 'pre',
        loader: 'postcss-loader',
        options: {
          plugins: () => ([
            require('stylelint')({
              // Ignore node_modules CSS
              ignoreFiles: 'node_modules/**/*.scss',
            }),
          ]),
        },
      },
    ],
  },
});

/**
 * generateSourceMaps
 * @param type
 */
exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
});

/**
 * extractBundles
 * @param bundles
 */
exports.extractBundles = bundles => ({
  plugins: bundles.map(bundle => (
    new webpack.optimize.CommonsChunkPlugin(bundle)
  )),
});

/**
 * minify
 */
exports.minify = () => ({
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      minimize: true,
      output: {
        beautify: false,
        comments: false,
      },
      compress: {
        screw_ie8: true,
        warnings: false,
        drop_console: true,
        sequences: true,
        booleans: true,
        loops: true,
        unused: true,
        unsafe: true
      },
    })
  ]
});

exports.devServer = (options) => {
  const config = {
    devServer: {
      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      historyApiFallback: true,

      // Unlike the cli flag, this doesn't set
      // HotModuleReplacementPlugin!
      hot: true,
      progress: true,
      headers: { 'Access-Control-Allow-Origin': '*' },

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',

      // Parse host and port from env to allow customization.
      //
      // If you use Vagrant or Cloud9, set
      // host: options.host || '0.0.0.0';
      //
      // 0.0.0.0 is available to all network devices
      // unlike default `localhost`.
      host: options.host, // Defaults to `localhost`
      port: options.port, // Defaults to 8080
      // overlay: true captures only errors
      overlay: options.overlay,
    },
    // plugins: [
    // Enable multi-pass compilation for enhanced performance
    // in larger projects. Good default.
    //   new webpack.HotModuleReplacementPlugin({
    //     multiStep: true
    //   })
    // ]
  };

  if(options.poll) {
    config.watchOptions = {
      // Delay the rebuild after the first change
      aggregateTimeout: 300,
      // Poll using interval (in ms, accepts boolean too)
      poll: 1000
    };
  }

  return config;
};

exports.npmInstall = (options) => {
  options = options || {};

  return {
    plugins: [
      new NpmInstallPlugin(options)
    ]
  };
};

/**
 * Set Variable
 * @param key
 * @param value
 * @returns {{plugins: [null]}}
 */
exports.setFreeVariable = (key, value) => {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [
      new webpack.DefinePlugin(env)
    ]
  };
};

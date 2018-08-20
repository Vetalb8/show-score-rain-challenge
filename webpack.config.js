const merge = require('webpack-merge');
// Configs
const commonConfig = require('./webpackConfig/webpack.common');
const developmentConfig = require('./webpackConfig/webpack.development');
const productionConfig = require('./webpackConfig/webpack.production');

module.exports = (env) => {
  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  }

  return merge(commonConfig, developmentConfig);
};

const babelJest = require('babel-jest');


module.exports = babelJest.createTransformer(require('./babelConfig'));

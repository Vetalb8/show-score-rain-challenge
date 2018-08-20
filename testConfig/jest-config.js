const babelJest = require('babel-jest');
const path = require('path');

const config = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!<rootDir>/node_modules/',
  ],
  testPathIgnorePatterns: ['<rootDir>[/\\\\](build|docs|node_modules|scripts|testConfig|webpackConfig)[/\\\\]'],
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(js|jsx)$': path.resolve(__dirname, './babelTransform.js'),
    '^.+\\.(css|scss)$': path.resolve(__dirname, './cssTransform.js'),
    '^(?!.*\\.(js|jsx|css|scss|json)$)': path.resolve(__dirname, './fileTransform.js'),
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$',
  ],
  modulePaths: [
    path.resolve(__dirname, '../node_modules'),
  ],
  rootDir: path.resolve(__dirname, '../src'),
};

module.exports = config;

module.exports = {
  presets: [
    require.resolve('babel-preset-env'),
    require.resolve('babel-preset-react'),
    require.resolve('babel-preset-stage-0'),
  ],
  plugins: [
    require.resolve('babel-plugin-transform-decorators-legacy'),
    require.resolve('babel-plugin-transform-class-properties'),
    require.resolve('babel-plugin-transform-react-constant-elements'),
    require.resolve('babel-plugin-transform-react-inline-elements'),
  ],
};

const path = require('path');

module.exports = {
  mode: 'development',
  context: path.join(__dirname, 'load-tests'),
  entry: {
    'collections.k6.test': './collections.k6.test.ts',
    'eventSearchPage.k6.test': './eventSearchPage.k6.test.ts',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'commonjs',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'babel-loader',
      },
    ],
  },
  target: 'web',
  externals: /^k6(\/.*)?/,
  stats: {
    colors: true,
  },
};

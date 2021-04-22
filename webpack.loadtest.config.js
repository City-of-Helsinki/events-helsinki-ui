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
    // .mjs needed for https://github.com/graphql/graphql-js/issues/1272
    extensions: ['.ts', '.js', '.mjs'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'babel-loader',
      },
      // fixes https://github.com/graphql/graphql-js/issues/1272
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      }
    ],
  },
  target: 'web',
  externals: /^k6(\/.*)?/,
  stats: {
    colors: true,
  },
};

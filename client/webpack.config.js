var path = require('path');

module.exports = {
  entry: {
    'client/src/index': path.resolve(__dirname, './src/index.js'),
  },
  output: {
    path : __dirname + '/output/js/',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude:path.resolve(__dirname, "node_modules"),
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude:path.resolve(__dirname, "node_modules"),
        loader: 'style-loader!css-loader'
      }
    ]
  }
};

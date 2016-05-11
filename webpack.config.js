var precss       = require('precss');
var autoprefixer = require('autoprefixer');

module.exports = {
  module: {
    loaders: [
      {
        test:   /\.css$/,
        loader: "style-loader!css-loader!postcss-loader"
      }
    ]
  },
  postcss: function () {
    return [precss, autoprefixer];
  }
}
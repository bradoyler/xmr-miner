const path = require('path')

module.exports = function () {
  return {
    context: path.resolve(__dirname, 'js/'),
    entry: {
      main: './main.js',
    },
    devtool: false,
    output: {
      path: path.resolve(__dirname, 'js/'),
      filename: '[name].bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: [{
            loader: 'babel-loader',
            options: {
              presets: ['stage-0']
            }
          }
          ]
        }
      ]
    },
    plugins: []
  }
}

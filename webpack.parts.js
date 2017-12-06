const ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.lintJS = ({ options }) => ({
  module: {
    rules: [
      {
        enforce: 'pre', // pre loader (https://github.com/MoOx/eslint-loader)
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options
      },
      {
        test: /\.js$/, // What files run through this loader
        exclude: /node_modules/,
        loader: 'babel-loader',
        options
      }
    ]
  }
})

exports.lintSass = ({ options }) => ({
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          use: [
            { loader: 'css-loader', options },
            { loader: 'postcss-loader', options }, // for autoprefixing
            { loader: 'sass-loader', options }
          ],
          fallback: 'style-loader'
        })
      }
    ]
  }
})

exports.devTool = option => ({
  devtool: option
})

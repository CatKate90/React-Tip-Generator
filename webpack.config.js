const path = require('path')
const Webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const parts = require('./webpack.parts')

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'dist')
}

const commonConfig = merge([
  {
    context: PATHS.app,
    entry: {
      index: './index.js'
    },

    output: {
      path: PATHS.build,
      filename: '[name].js'
    },

    devServer: {
      contentBase: PATHS.app
    },

    module: {
      rules: [
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract({
            use: ['style-loader', 'css-loader']
          })
        },
        {
          test: /\.(ttf|eot|woff|woff2)$/,
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]'
          }
        }
      ]
    },

    resolve: {
      extensions: ['.js', '.es6']
    },

    plugins: [
      new Webpack.optimize.CommonsChunkPlugin('shared'), // writes basic webpack code in shared.bundle.js
      new ExtractTextPlugin('styles.css'),
      new HtmlWebpackPlugin({
        title: 'First steps webpack',
        filename: 'index.html',
        template: 'index.html'
      })
    ]
  },

  parts.lintJS({ options: { presets: ['react', 'es2015'] } })
])

const productionConfig = merge([parts.lintSass({})])

const developmentConfig = merge([
  parts.devTool('source-map'),
  parts.lintSass({ options: { sourceMap: true } })
])

module.exports = env => {
  if (env === 'production') {
    return merge(commonConfig, productionConfig)
  }

  return merge(commonConfig, developmentConfig)
}

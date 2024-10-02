const path = require('path');
const webpackMerge = require('webpack-merge');
const webpackCommon = require('./common.config');

const env = require('../env');
const proxyRules = require('../proxy/rules');

// webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');

module.exports = webpackMerge(webpackCommon, {

  devtool: 'inline-source-map',
  mode: 'development',
  output: {
  
    path: path.resolve(__dirname, '../static/dist'),

    filename: '[name].js',

    sourceMapFilename: '[name].map',

    chunkFilename: '[id]-chunk.js',

    publicPath: '/'

  },

  module: {

    rules: [
      {
        test: /\.s?css$/, // Soporta tanto .css como .scss
        use: [
          {
            loader: 'style-loader' // Inserta CSS en el DOM
          },
          {
            loader: 'css-loader', // Interpreta @import y url() como import/require
            options: {
              outputStyle: process.env.NODE_ENV === 'production' ? 'compressed' : 'expanded',
              sourceMap: true,
              sourceMapContents: true
            }
          },
          {
            loader: 'postcss-loader', // Añadir PostCSS para autoprefixing y optimizaciones
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer')({ /* opciones de autoprefixer */ })
                ]
              }
            }
          },
          {
            loader: 'sass-loader', // Compila Sass a CSS
            options: {
              outputStyle: 'expanded', // Utiliza 'compressed' en producción para reducir tamaño
              sourceMap: true,
              sourceMapContents: true
            }
          }
        ]
      }
    ]

  },

  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: "'development'"
      }
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../static/index.html'),
      favicon: path.resolve(__dirname, '../static/favicon.ico')
    }),
    new HotModuleReplacementPlugin()
  ],

  devServer: {
    host: env.devServer.host || 'localhost',
    port: env.devServer.port || 3000,
    contentBase: path.resolve(__dirname, '../static'),
    watchContentBase: true,
    compress: true,
    hot: true,
    historyApiFallback: true, 
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: proxyRules
  }

});

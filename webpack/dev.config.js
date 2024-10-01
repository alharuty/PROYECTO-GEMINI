// dev.config.js
const path = require('path');
const webpackMerge = require('webpack-merge');
const webpackCommon = require('./common.config');

// webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');

module.exports = webpackMerge(webpackCommon, {
  mode: 'development',
  devtool: 'inline-source-map', // Habilitar source maps en desarrollo
  output: {
    path: path.resolve(__dirname, '../static/dist'),
    filename: '[name].js',
    chunkFilename: '[id]-chunk.js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          'style-loader', // Inserta CSS en el DOM
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer')({}),
                ],
              },
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'), // Ajustar para la variable de entorno
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../static/index.html'),
      favicon: path.resolve(__dirname, '../static/favicon.ico'),
    }),
    new HotModuleReplacementPlugin(),
  ],

  devServer: {
    host: 'localhost',
    port: 3000,
    contentBase: path.resolve(__dirname, '../static'),
    watchContentBase: true,
    compress: true,
    hot: true,
    historyApiFallback: true,
    overlay: true,
    proxy: {}, // Agregar reglas de proxy según sea necesario
  },
});

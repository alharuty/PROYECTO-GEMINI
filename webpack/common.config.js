// common.config.js
const SplitChunksPlugin = require('webpack/lib/optimize/SplitChunksPlugin');

module.exports = {
  entry: {
    app: './src/bootstrap.js',  // Se eliminó el array para simplificar
    vendor: './src/vendor.js',
  },

  resolve: {
    extensions: ['.js', '.scss'],
    modules: ['node_modules'],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
        type: 'asset/resource', // Usar asset/resource para archivos
      },
      {
        test: /\.(mp4|webm)$/,
        type: 'asset', // Utiliza 'asset' para manejar archivos multimedia
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 10 KB
          },
        },
      },
    ],
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};

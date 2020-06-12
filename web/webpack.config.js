const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist' //where contents are served from
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'images/**/*',
          to: path.resolve(__dirname, 'dist'),
          force: true
        },
        {
          from: 'css/**/*',
          to: path.resolve(__dirname, 'dist'),
          force: true
        },
        {
          from: 'service-worker.js',
          to: path.resolve(__dirname, 'dist'),
          force: true
        },
        {
          from: 'manifest.json',
          to: path.resolve(__dirname, 'dist'),
          force: true
        },
        {
          from: 'models/**/*',
          to: path.resolve(__dirname, 'dist'),
          force: true
        }
      ]
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve('./index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/, //using regex to tell babel exactly what files to transcompile
        include: path.resolve('./js/index.js'), // file to transpile
        exclude: /node_modules/, // files to be ignored
        use: {
          loader: 'babel-loader' // specify the loader
        }
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(jpg|png|webp)$/,
        use: 'file-loader'
      }
    ]
  }
}

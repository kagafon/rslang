const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PATHS = {
  dist: path.resolve(__dirname, 'dist'),
  src: path.resolve(__dirname, 'src'),
};

module.exports = (env, options) => {
  const isProduction = options.mode === 'production';
  return {
    mode: options.mode,
    devtool: 'inline-source-map',
    entry: {
      script: './src/index.js',
    },
    output: {
      path: PATHS.dist,
      filename: 'js/[name].[contenthash:8].js',
    },
    resolve: {
      modules: [path.resolve(__dirname, './src/'), 'node_modules'],
      extensions: ['.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: ['/node_modules/', '/postcss.config.js'],
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'style-loader',
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: !isProduction,
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: !isProduction,
              },
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: !isProduction,
                webpackImporter: true,
              },
            },
          ],
        },
        {
          test: /\.(svg|png|jpg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'assets/images/[name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash:8].css',
      }),
      new HtmlWebpackPlugin({
        title: 'RS Lang',
        template: './src/html/index.html',
        favicon: 'src/html/favicon.ico',
        meta: {
          charset: 'UTF-8',
          viewport: 'width=device-width, initial-scale=1.0',
        },
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
        },
        environment: process.env,
      }),
      new CopyWebpackPlugin([
        {
          from: 'src/assets/images/',
          to: 'assets/images/',
        },
        {
          from: 'src/assets/audio/',
          to: 'assets/audio/',
        },
      ]),
      new CleanWebpackPlugin(),
    ],
    devServer: {
      contentBase: PATHS.dist,
      watchContentBase: true,
      compress: true,
      port: 9000,
    },
  };
};

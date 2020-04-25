const { CheckerPlugin } = require('awesome-typescript-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { optimize } = require('webpack');
const { join } = require('path');
const CopyPlugin = require('copy-webpack-plugin');

let prodPlugins = [];
if (process.env.NODE_ENV === 'production') {
  prodPlugins.push(
    new optimize.AggressiveMergingPlugin(),
    new optimize.OccurrenceOrderPlugin()
  );
}
module.exports = {
  mode: process.env.NODE_ENV,
  devtool: 'inline-source-map',
  entry: {
    contentscript: join(__dirname, 'src/contentscript/contentscript.ts'),
    options: join(__dirname, 'src/options/options.ts'),
    popup: join(__dirname, 'src/popup/popup.ts'),
    background: join(__dirname, 'src/background/background.ts'),
  },
  output: {
    path: join(__dirname, 'dist'),
    filename: '[name]/[name].js',
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts?$/,
        use: 'awesome-typescript-loader?{configFileName: "tsconfig.json"}',
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new CheckerPlugin(),
    ...prodPlugins,
    new MiniCssExtractPlugin({
      filename: '[name]/[name].css',
      chunkFilename: '[id].css',
    }),
    new CopyPlugin([{
      from: 'src/popup',
      to: 'popup',
      ignore: ['*.ts'],
    }, {
      from: 'src/options',
      to: 'options',
      ignore: ['*.ts'],
    }, {
      from: 'src/assets',
      to: 'assets'
    }, {
      from: 'manifest.json',
      to: 'manifest.json'
    }])
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
};

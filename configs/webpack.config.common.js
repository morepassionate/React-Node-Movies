const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const pug = require('pug');

const srcPath = path.resolve(__dirname, '../src');
const getAlias = require('./webpack_common/alias.js');
const getOptimization = require('./webpack_common/optimization.js');
const namedChunksPluginConfig = require('./webpack_common/named-chunks-plugin-config.js');
const getDefinePluginConfig = require('./webpack_common/define-plugin-config.js');
const rules = require('./webpack_common/rules.js');
const indexTemplate = require('./templates/index.tpl.js');

module.exports = {
  context: path.resolve(__dirname),
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json', '.scss', '.css'],
    alias: getAlias({ srcPath })
  },
  entry: [
    'react-hot-loader/patch',
    `${srcPath}/app/index.client.js`
  ],
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[id].[chunkhash].chunk.js'
  },
  // optimization: getOptimization({ splitBy: 'packageName' }),
  optimization: getOptimization({ splitBy: 'loadType' }),
  module: {
    rules: rules
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.NamedChunksPlugin(namedChunksPluginConfig),
    new webpack.DefinePlugin(getDefinePluginConfig(process.env)),
    new HtmlWebpackPlugin({
      favicon: `${srcPath}/assets/img/favicon.ico`,
      minify: false,
      templateContent: function () {
        return pug.render(indexTemplate(), { pretty: true });
      },
    }),
  ]
};
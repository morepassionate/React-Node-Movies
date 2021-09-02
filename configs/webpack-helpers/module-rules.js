const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const regexes = {
  scripts: /\.(js|jsx)$/,
  images: /\.(jpe?g|jpg|png|gif|svg)$/,
  fonts: /\.(ttf|svg|woff|woff2)$/,
  css: /\.(sa|sc|c)ss$/,
  cssModules: /.*module\.(sa|sc|c)ss$/
};

const common = {
  scripts: {
    test: regexes.scripts,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
      configFile: path.resolve(__dirname, '../../.babelrc.js'),
    }
  }
};

const styling = {
  cssLoader(params = {}) {
    const {
      cssModules = false,
      exportOnlyLocals = false
    } = params;

    return {
      loader: 'css-loader',
      options: cssModules
        ? {
          modules: {
            // load as css modules only regex suitable files
            auto: (resourcePath) => regexes.cssModules.test(resourcePath),

            // css modules naming format
            localIdentName: '[name]__[local]___[hash:base64:5]',

            // "exportOnlyLocals: 1" allows not to bundle styles without css modules
            exportOnlyLocals
          }
        }

        // compileType: 'icss'allows interoperable css (required for sass :export syntax)
        : {
          importLoaders: 1,
          modules: {
            compileType: 'icss'
          },
        }
    };
  },

  styleLoader(params = {}) {
    const { extract = false } = params;

    return extract
      ? MiniCssExtractPlugin.loader
      : 'style-loader';
  },
};

const client = {
  images: {
    test: regexes.images,
    exclude: /assets[\\/]fonts/,
    type: 'asset/resource',
    generator: {
      filename: 'assets/img/[name][ext]'
    }
  },
  fonts: {
    test: regexes.fonts,
    exclude: /assets[\\/]img/,
    type: 'asset/resource',
    generator: {
      filename: 'assets/fonts/[name][ext]'
    }
  },
  css(params = {}) {
    return {
      test: regexes.css,
      use: [
        styling.styleLoader(params),
        styling.cssLoader({ cssModules: true }),
        'sass-loader'
      ]
    };
  }
};

const server = {
  imagesByUrl: {
    test: regexes.images,
    exclude: /assets[\\/]fonts/,
    type: 'asset/inline'
  },
  fontsByUrl: {
    test: regexes.fonts,
    exclude: /assets[\\/]img/,
    type: 'asset/inline'
  },
  cssByUrl: {
    test: regexes.css,
    exclude: regexes.cssModules,
    type: 'asset/inline'
  },
  cssModules() {
    return {
      test: regexes.cssModules,
      use: [
        styling.cssLoader({
          cssModules: true,
          exportOnlyLocals: true
        }),
        'sass-loader'
      ]
    };
  }
};

module.exports = {
  common,
  client,
  server
};
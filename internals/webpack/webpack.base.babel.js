// Common webpack config based on:
// https://github.com/react-boilerplate/react-boilerplate

const path = require('path')
const webpack = require('webpack')
require('dotenv').config()

module.exports = (options) => ({
  entry: options.entry,
  output: Object.assign({ // Compile into js/build.js
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/'
  }, options.output), // Merge with env dependent settings
  module: {
    rules: [
      {
        test: /\.js$/, // Transform all .js files required somehwere with Babel
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: options.babelQuery
        }
      }, {
        // Preprocess your .css files
        // This is the place to add your own loaders (sass/less/etc.)
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      }, {
        // Preprocess 3rd party .css files in node_modules
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader']
      }, {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: 'file-loader'
      }, {
        test: /\.(jpg|png|gif)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              pngquant: {
                quality: '65-90',
                speed: 4,
                progressive: true,
                optimizationLevel: 7,
                interlaced: false
              },
              gifsicle: {
                interlaced: false
              },
              optipng: {
                optimizationLevel: 7
              }
            }
          }
        ]
      }, {
        test: /\.html$/,
        use: 'html-loader'
      }, {
        test: /\.json$/,
        use: 'json-loader'
      }, {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }
      }, {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      }
    ]
  },
  plugins: options.plugins.concat([
    new webpack.ProvidePlugin({
      // Make fetch available
      fetch: 'exports-loader?self.fetch!whatwg-fetch'
    }),

    // Always expose NODE_ENV to webpack to use `process.env.NODE_ENV`
    // inside your code for any env checks. UglifyJS will auto
    // drop any unreachable code
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        AUTH0_DOMAIN: JSON.stringify(process.env.AUTH0_DOMAIN),
        AUTH0_CLIENT_ID: JSON.stringify(process.env.AUTH0_CLIENT_ID),
        AUTH0_REDIRECT_URI: JSON.stringify(process.env.AUTH0_REDIRECT_URI),
        AUTH0_RESPONSE_TYPE: JSON.stringify(process.env.AUTH0_RESPONSE_TYPE),
        AUTH0_SCOPE: JSON.stringify(process.env.AUTH0_SCOPE)
      },
      'typeof window': '\'object\''
    }),
    new webpack.NamedModulesPlugin()
  ]),
  resolve: {
    modules: ['app', 'node_modules'],
    extensions: [
      '.js',
      '.jsx',
      '.react.js'
    ],
    mainFields: [
      'browser',
      'jsnext:main',
      'main'
    ]
  },
  devtool: options.devtool,
  target: 'web',
  node: {
    fs: 'empty',
    child_process: 'empty',
    net: 'empty',
    dns: 'empty',
    tls: 'empty',
    module: 'empty'
  },
  externals: [
    function (context, request, callback) {
      if (request.indexOf('apollo-engine-binary') > -1) {
        return callback(null, 'commonjs ' + request)
      }
      callback()
    },
    function (context, request, callback) {
      if (request.indexOf('mongodb') > -1) {
        return callback(null, 'commonjs ' + request)
      }
      callback()
    }
  ],
  performance: options.performance || {}
})

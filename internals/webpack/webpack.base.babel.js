// Common webpack config based on:
// https://github.com/react-boilerplate/react-boilerplate

const path = require('path')
const webpack = require('webpack')

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
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
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
  performance: options.performance || {}
})

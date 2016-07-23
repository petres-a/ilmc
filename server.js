#!/usr/bin/env node
/* global __DEVELOPMENT__:true */
require('babel-register')
var Bluebird = require('bluebird')
var path = require('path')
var rootDir = path.resolve(__dirname, '.')
/**
 * Define isomorphic constants.
 */
global.__SERVER__ = true
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production'

// bluebirdjs.com/docs/why-bluebird.html
global.Promise = Bluebird
// Warnings are useful for user code, but annoying for third party libraries.
Bluebird.config({ warnings: false })

function start () {
  // https://github.com/halt-hammerzeit/webpack-isomorphic-tools
  var WebpackIsomorphicTools = require('webpack-isomorphic-tools')
  global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('./webpack/webpack-isomorphic-tools'))
    .development(__DEVELOPMENT__)
    .server(rootDir, function () {
      require('./src/server')
    })
}

if (__DEVELOPMENT__) {
  if (require('piping')({ hook: true, ignore: /(\/\.|~$|\.json$)/i })) {
    start()
  }
} else {
  start()
}

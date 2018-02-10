/* eslint-env node */
'use strict'
var Funnel = require('broccoli-funnel')
var MergeTrees = require('broccoli-merge-trees')
var path = require('path')
var debug = require('broccoli-stew').debug
var Rollup = require('broccoli-rollup')
var alias = require('rollup-plugin-alias')
var fs = require('fs')

module.exports = {
  name: 'ember-fontawesome',

//  treeForApp(appTree) {
//    return debug(
//      new MergeTrees([
//        appTree,
//        new Funnel(path.dirname(require.resolve('@fortawesome/fontawesome')), {
//          destDir: 'fontawesome'
//        }),
//        new Funnel(path.dirname(require.resolve('@fortawesome/fontawesome-free-solid')), {
//          destDir: 'fontawesome-free-solid'
//        })
//      ]), 
//      {name: 'ember-font-awesome-app-tree'}
//    )
//  },

  treeForVendor(vendorTree) {
    const packageContents = `
      //export { ${this.fontawesome.fas.join(',')} }  from '@fortawesome/fontawesome-free-solid'
      console.log('foo')
    `
    const libTemp = fs.mkdtempSync('ember-fontawesome-pack-')
    const entryFileName = 'free-solid-entry.js'
    const entryFilePath = `${libTemp}/${entryFileName}`
    fs.appendFileSync(entryFilePath, packageContents)

    // @TODO: pass in a MergeTrees thing?
    debugger
    const rollupResults = new Rollup(libTemp, {
      rollup: {
        input: entryFileName,
        output: {
          file: 'fas-rolled.js',
          format: 'cjs'
        }
      //  plugins: [
      //    alias({
      //      '@fortawesome/fontawesome-free-solid': '@fortawesome/fontawesome-free-solid/shakable.es.js'
      //    })
      //  ]
      },
      name: 'fontawesome-free-solid-rollup'
    })

    return debug(new MergeTrees([
      vendorTree,
      new Funnel(path.dirname(require.resolve('@fortawesome/fontawesome')), {
        destDir: '@fortawesome/fontawesome'
      }),
      new Funnel(path.dirname(require.resolve('@fortawesome/fontawesome-free-solid')), {
        destDir: '@fortawesome/fontawesome-free-solid'
      }),
      rollupResults
    ]), {name: 'ember-fontawesome-vendor-tree'})
  },

  included(app) {
    this._super.included.apply(this, arguments)
    this.ui.writeLine('in ember-fontawesome:included()')
    this.fontawesome = app.options.fontawesome
    //debugger
    app.import('vendor/shims/fontawesome-shim.js')
  },
}

function memory (config = {}) {
  let filePath = isPath(config.path) ? config.path : null
  let contents = isContents(config.contents) ? String(config.contents) : null

  return {
    options (options) {
      debugger
      const { input } = options
      if (input && typeof input === 'object') {
        if (isPath(input.path)) {
          filePath = input.path
        }
        if (isContents(input.contents)) {
          contents = String(input.contents)
        }
      }
      options.input = filePath
    },

    resolveId (id) {
      debugger
      if (filePath === null || contents === null) {
        throw Error('\'path\' should be a string and \'contents\' should be a string of Buffer')
      }
      if (id === filePath) {
        return path.resolve(filePath)
      }
    },

    load (id) {
      debugger
      if (id === path.resolve(filePath)) {
        return contents
      }
    }
  }
}

function isPath (path) {
  return typeof path === 'string'
}

function isContents (contents) {
  return typeof contents === 'string' || Buffer.isBuffer(contents)
}

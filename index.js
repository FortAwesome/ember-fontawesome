/* eslint-env node */
'use strict'
var Funnel = require('broccoli-funnel')
var MergeTrees = require('broccoli-merge-trees')
var path = require('path')
var stew = require('broccoli-stew')
var Rollup = require('broccoli-rollup')
var fs = require('fs')
var rimraf = require('rimraf');
var resolve = require('rollup-plugin-node-resolve')
var FontAwesomePack = require('./broccoli-fontawesome-pack')

module.exports = {
  name: 'ember-fontawesome',

  treeForVendor(vendorTree) {
    const iconPackTree = new MergeTrees([
      new FontAwesomePack(this.app.options.fontawesome || {}),
      // @TODO: This may be where we'd enumerate all of the icon packages that may
      // contain declared icons
      path.dirname(require.resolve('@fortawesome/fontawesome-free-solid'))
    ])

    const rollupNode = new Rollup(iconPackTree, {
      rollup: {
        // @TODO: this is a hack, using a string literal for an internal file name from the FontAwesomePack
        // plugin. Need to parameterize this appropriately somehow.
        input: 'fontawesome-fas.js',
        output: {
          file: 'fa-icons.js',
          format: 'amd',
          amd: {
            id:'@fortawesome/ember-fontawesome/icons'
          }
        },
        plugins: [
          resolve()
        ]
      },
      name: 'fontawesome-free-solid-rollup'
    })
    
    const apiRollupAMD = new Rollup('node_modules/@fortawesome/fontawesome', {
      rollup: {
        input: 'index.es.js',
        output: {
          file: 'fontawesome-amd.js',
          exports: 'named',
          format: 'amd',
          amd: {
            id:'@fortawesome/fontawesome'
          }
        },
        plugins: [
          resolve()
        ]
      },
      name: 'fontawesome'
    })

    return stew.debug(new MergeTrees([
      vendorTree,
      // @TODO: figure out whether styles.css needs to be copied over.
//      new Funnel(path.dirname(require.resolve('@fortawesome/fontawesome')), {
//        include: ['index.js', 'styles.css'],
//        destDir: '@fortawesome/fontawesome'
//      }),
      rollupNode,
      apiRollupAMD
    ]), {name: 'ember-fontawesome-vendor-tree'})
  },
  
  included(app) {
    this._super.included.apply(this, arguments)
 //   app.import('vendor/@fortawesome/fontawesome/index.js')
    app.import('vendor/fontawesome-amd.js')
    app.import('vendor/fa-icons.js')
//    app.import('vendor/shims/fontawesome-shim.js')
  },
}


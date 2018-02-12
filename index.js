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
          format: 'cjs'
        },
        plugins: [
          resolve()
        ]
      },
      name: 'fontawesome-free-solid-rollup'
    })

    return stew.debug(new MergeTrees([
      vendorTree,
      new Funnel(path.dirname(require.resolve('@fortawesome/fontawesome')), {
        destDir: '@fortawesome/fontawesome'
      }),
      rollupNode
    ]), {name: 'ember-fontawesome-vendor-tree'})
  },
  
  included(app) {
    this._super.included.apply(this, arguments)
    app.import('vendor/shims/fontawesome-shim.js')
  },
}


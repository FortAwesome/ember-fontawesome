/* eslint-env node */
'use strict'
var Funnel = require('broccoli-funnel')
var MergeTrees = require('broccoli-merge-trees')
var path = require('path')

module.exports = {
  name: '@fortawesome/ember-fontawesome',

  treeForVendor(vendorTree) {
    return new MergeTrees([
      vendorTree,
      new Funnel(path.dirname(require.resolve('@fortawesome/fontawesome')), {
        destDir: 'fontawesome'
      })
    ])
  },

  included() {
    this._super.included.apply(this, arguments)
    this.import('vendor/fontawesome/index.js')
    this.import('vendor/shims/fontawesome-shim.js')
  },
}

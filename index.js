/* eslint-env node */
'use strict'
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: '@fortawesome/ember-fontawesome',

  included() {
    this._super.included.apply(this, arguments);
    this.import('node_modules/@fortawesome/fontawesome/index.js', {
      exports: {
        fontawesome: ['default']
      }
    })
  },

  treeForVendor(vendorTree) {
    var fontawesomeTree = new Funnel('node_modules/@fortawesome/fontawesome',
      {
        destDir: 'vendor',
        files: ['index.js', 'index.es.js']
      }
    )
    return new MergeTrees([vendorTree, fontawesomeTree]);
  },
}

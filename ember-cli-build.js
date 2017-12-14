/* eslint-env node */
'use strict'

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon')
const Funnel = require('broccoli-funnel');
const path = require('path');

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    // Add options here
    trees: {
      vendor: new Funnel(path.dirname(require.resolve('@fortawesome/fontawesome-free-solid')), {
        destDir: 'fontawesome-free-solid'
      })
    }
  })

  app.import('vendor/shims/fontawesome-shim.js')


  app.import('vendor/fontawesome-free-solid/index.js')
  app.import('vendor/shims/fontawesome-free-solid-shim.js')
  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return app.toTree()
}

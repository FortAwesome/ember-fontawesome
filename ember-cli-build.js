/* eslint-env node */
'use strict'

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon')

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    // Add options here
    fontawesome: {
      enableExperimentalBuildTimeTransform: true,
      icons: {
        'free-solid-svg-icons': [
          'coffee',
          'magic',
          'circle',
          'square',
          'home',
          'info',
          'book',
          'pencil-alt',
          'cog',
          'spinner',
          'checkSquare',
          'fax',
          'sync'
        ],
        'free-regular-svg-icons': 'all',
      }
    }
  })

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return app.toTree()
}

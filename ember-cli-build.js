/* eslint-env node */
'use strict'

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon')
const Funnel = require('broccoli-funnel');
const path = require('path');

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    // Add options here
    fontawesome: {
      icons: {
        'fontawesome-free-solid': [
          'faCoffee',
          'faMagic',
          'faCircle',
          'faSquare',
          'faHome',
          'faInfo',
          'faBook',
          'faPencilAlt',
          'faCog',
          'faSpinner',
          'faCheckSquare',
          'faSync'
        ],
        'fontawesome-free-regular': 'all',
        'fontawesome-pro-light': [
          'faAdjust'
        ]
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

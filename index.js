/* eslint-env node */
'use strict'
var broccoliSource = require('broccoli-source')
var UnwatchedDir = broccoliSource.UnwatchedDir
var Funnel = require('broccoli-funnel')
var MergeTrees = require('broccoli-merge-trees')
var path = require('path')
var Rollup = require('broccoli-rollup')
var fs = require('fs')
var resolve = require('rollup-plugin-node-resolve')
var FontAwesomePack = require('./vendor/broccoli-fontawesome-pack')
var FontAwesomeAutoLibrary = require('./vendor/broccoli-fontawesome-auto-library')
var glob = require('glob')

module.exports = {
  name: '@fortawesome/ember-fontawesome',

  treeForVendor(vendorTree) {
    const iconRollups = []

    Object.keys(this.fontawesomeConfig.icons).forEach(pack => {
      const iconExportsFile = `exports-${pack}.js`
      const iconPackTree = new FontAwesomePack(
        [new UnwatchedDir('node_modules/@fortawesome')],
        {
          pack,
          icons: this.fontawesomeConfig.icons[pack],
          output: iconExportsFile
        }
      )
      const rolledIconPackFile = `${pack}.js`
      const rollupNode = new Rollup(iconPackTree, {
        rollup: {
          input: iconExportsFile,
          output: {
            file: rolledIconPackFile,
            format: 'amd',
            interop: false,
            amd: {
              id:`@fortawesome/${pack}`
            }
          },
          plugins: [
            resolve()
          ]
        },
        name: `${pack}-rollup`
      })
      iconRollups.push(rollupNode)
    })

    const fontawesomeRollup = new Rollup(new UnwatchedDir('node_modules/@fortawesome/fontawesome'), {
      rollup: {
        input: 'index.es.js',
        output: {
          file: 'fontawesome.js',
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

    const autoLibraryNode = new FontAwesomeAutoLibrary({
      icons: this.fontawesomeConfig.icons,
      output: 'autoLibrary.js'
    })

    return new MergeTrees([
      vendorTree,
      fontawesomeRollup,
      autoLibraryNode,
      ...iconRollups
    ])
  },

  buildConfig() {
    // 1. start with this.app.options.fontawesome (what the host app configs in ember-cli-fontawesome)
    // 2. in some circumstance (when nothing is defined?), automatically configure whatever is there under node_modules
    // @TODO: look for any addons contributing config. maybe enumerated in this.app.options.addons
    let fontawesomeConfig
    if(! (fontawesomeConfig = this.app.options.fontawesome) ) {
      fontawesomeConfig = glob.sync('node_modules/@fortawesome/fontawesome-@(free|pro)*')
        .map(i => i.split('/').pop())
        .reduce((acc, cur) => {
          acc.icons[cur] = 'all'
          return acc}, {icons: {}})
    }
    if(Object.keys(fontawesomeConfig.icons).length === 0) {
      this.ui.writeWarnLine(
        'No icons are included in your build configuration.\n'+
        'Any icon packs you install under node_modules will be bundled into vendor.js\n'+
        'and added to the icon library by default.\n\n'+
        "For example, 'yarn add @fortawesome/fontawesome-free-solid' would add all of the icons in that pack.\n\n"+
        'To declare a subset of icons, after adding some icon packs as shown above,\n'+
        'modify your ember-cli-build.js and add a fontawesome config object.\n'+
        'The following example declares that all icons in fontawesome-free-solid should be\n'+
        'included in the vendor.js bundle add added to the library,\n'+
        'and for fontawesome-pro-light, only faAdjust and faAmbulance are to be included in the\n'+
        'bundle and added to the library.\n'+
        '// ...\n'+
        'let app = new EmberApp(defaults, {\n'+
        '  // Add options here\n'+
        '  fontawesome: {\n'+
        '    icons: {\n'+
        "      'fontawesome-free-solid': 'all'\n"+
        "      'fontawesome-pro-light': [\n"+
        "        'faAdjust',\n"+
        "        'faAmbulance'\n"+
        '       ]\n'+
        '    }\n'+
        '});'
      )
    }
    return fontawesomeConfig
  },
  contentFor(type) {
    if (type === 'head') {
      return '<script type="text/javascript">window.FontAwesomeConfig = { autoReplaceSvg: false, observeMutations: false }</script>';
    }
  },
  included(app) {
    this._super.included.apply(this, arguments)
    this.fontawesomeConfig = this.buildConfig()
    app.import('vendor/fontawesome.js')
    Object.keys(this.fontawesomeConfig.icons).forEach(pack => {
      app.import(`vendor/${pack}.js`)
    })
    app.import('vendor/autoLibrary.js')
  }

}


/* eslint-env node */
'use strict'
var Funnel = require('broccoli-funnel')
var MergeTrees = require('broccoli-merge-trees')
var path = require('path')
var stew = require('broccoli-stew')
var Rollup = require('broccoli-rollup')
var fs = require('fs')
var resolve = require('rollup-plugin-node-resolve')
var FontAwesomePack = require('./vendor/broccoli-fontawesome-pack')
var FontAwesomeAutoLibrary = require('./vendor/broccoli-fontawesome-auto-library')

module.exports = {
  name: 'ember-fontawesome',

  treeForVendor(vendorTree) {
    const iconRollups = [] 
    debugger

    Object.keys(this.app.options.fontawesome.icons).forEach(pack => {
      const iconExportsFile = `exports-${pack}`
      const iconPackTree = new MergeTrees([
        new FontAwesomePack({
          pack,
          icons: this.app.options.fontawesome.icons[pack],
          output: iconExportsFile
        }),
        path.dirname(require.resolve(`@fortawesome/${pack}`))
      ])
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

    const autoLibraryNode = new FontAwesomeAutoLibrary({
      icons: this.app.options.fontawesome.icons,
      output: 'autoLibrary.js'
    })

    return stew.debug(new MergeTrees([
      vendorTree,
      // @TODO: confirm whether styles.css needs to be copied over.
//      new Funnel(path.dirname(require.resolve('@fortawesome/fontawesome')), {
//        include: ['styles.css'],
//        destDir: 'fa-styles'
//      }),
      apiRollupAMD,
      autoLibraryNode,
      ...iconRollups
    ]), {name: 'ember-fontawesome-vendor-tree'})
  },
  
  included(app) {
    this._super.included.apply(this, arguments)
    app.import('vendor/fontawesome-amd.js')
    Object.keys(app.options.fontawesome.icons).forEach(pack => {
      app.import(`vendor/${pack}.js`)
    })
    app.import('vendor/autoLibrary.js')
    // app.import('vendor/fa-styles/styles.css')
  }
}


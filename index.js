/* eslint-env node */
'use strict'
var Funnel = require('broccoli-funnel')
var MergeTrees = require('broccoli-merge-trees')
var path = require('path')
var debug = require('broccoli-stew').debug
var Rollup = require('broccoli-rollup')
var fs = require('fs')
var rimraf = require('rimraf');
var resolve = require('rollup-plugin-node-resolve')

module.exports = {
  name: 'ember-fontawesome',

  treeForVendor(vendorTree) {
    const packageContents = `
      export { ${this.fontawesome.fas.join(',')} }  from '@fortawesome/fontawesome-free-solid/shakable.es.js'
    `
    this._tmpDir = `${this.project.root}/${fs.mkdtempSync('ember-fontawesome-pack-')}`
    const entryFileName = 'free-solid-entry.js'
    const entryFilePath = `${this._tmpDir}/${entryFileName}`
    fs.appendFileSync(entryFilePath, packageContents)

    const merged = new MergeTrees([
      new Funnel(this._tmpDir),
      new Funnel(path.dirname(require.resolve('@fortawesome/fontawesome-free-solid')), {
        destDir: '@fortawesome/fontawesome-free-solid'
      }),
    ])

    const rollupNode = new Rollup(merged, {
      rollup: {
        input: entryFileName,
        output: {
          file: 'fas-rolled.js',
          format: 'cjs'
        },
        plugins: [
          resolve()
        ]
      },
      name: 'fontawesome-free-solid-rollup'
    })

    return debug(new MergeTrees([
      vendorTree,
      new Funnel(path.dirname(require.resolve('@fortawesome/fontawesome')), {
        destDir: '@fortawesome/fontawesome'
      }),
      rollupNode
    ]), {name: 'ember-fontawesome-vendor-tree'})
  },
  
  postBuild() {
    this.ui.writeLine(`attempting to delete ${this._tmpDir}`)
    // @TODO: figure out why this isn't deleting
    rimraf(this._tmpDir, () => {this.ui.writeLine(`failed to remove temp dir: ${this._tmpDir}`)});
  },

  included(app) {
    this._super.included.apply(this, arguments)
    this.ui.writeLine('in ember-fontawesome:included()')
    this.fontawesome = app.options.fontawesome
    app.import('vendor/shims/fontawesome-shim.js')
  },
}


'use strict';

var Plugin = require('broccoli-plugin')
var path = require('path')
var fs = require('fs')

module.exports = FontAwesomeAutoLibrary
FontAwesomeAutoLibrary.prototype = Object.create(Plugin.prototype)
FontAwesomeAutoLibrary.prototype.constructor = FontAwesomeAutoLibrary
function FontAwesomeAutoLibrary(options) {
  if (!(this instanceof FontAwesomeAutoLibrary)) return new FontAwesomeAutoLibrary(options)

  const { 
    icons,
    output
  } = options
  if(!(icons && typeof icons === 'object')) throw new Error("Required 'icons' option not given") 
  if(!output) throw new Error("Required 'output' option not given")

  this._isBuilt = false

  this.options = {
    icons,
    output,
    name: 'broccoli-fontawesome-auto-library',
    annotation: ''
  }

  Plugin.call(this, [], {
    persistentOutput: true,
    annotation: this.options.annotation,
    name: this.options.name
  })
}

FontAwesomeAutoLibrary.prototype.build = function() {
  if(this._isBuilt) return

  const _thisPlugin = this
  const moduleContents = `
    (function(){
      var _fontawesome = require('@fortawesome/fontawesome-svg-core');
      var pack;
      ${Object.keys(_thisPlugin.options.icons).map(function(i){
        const addAll = _thisPlugin.options.icons[i] === 'all'
        return `
        pack = require('@fortawesome/${i}'); 
        delete pack['default']; 
        _fontawesome.library.add(pack);`}).join('\n')}
    })()
  `
  return new Promise(function(resolve, reject) {
    fs.writeFile(path.join(_thisPlugin.outputPath, _thisPlugin.options.output), moduleContents, (err) => {
      if (err) reject(err)
      else {
        _thisPlugin._isBuilt = true
        resolve()
      }
    })
  })
}


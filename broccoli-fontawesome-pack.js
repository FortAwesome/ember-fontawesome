'use strict';

var Plugin = require('broccoli-plugin')
var path = require('path')
var fs = require('fs')

module.exports = FontAwesomePack
FontAwesomePack.prototype = Object.create(Plugin.prototype)
FontAwesomePack.prototype.constructor = FontAwesomePack
function FontAwesomePack(options) {
  debugger
  if (!(this instanceof FontAwesomePack)) return new FontAwesomePack(options);
  options = options || {};
  var name = 'broccoli-fontawesome-pack:' + (options.annotation || '');
  Plugin.call(this, [], {
    persistentOutput: true,
    annotation: options.annotation,
    name: options.name
  });
  this.options = options;
}

FontAwesomePack.prototype.build = function() {
  // @TODO: use inputNodes to setup the dependencies for the import, and generalize
  // the import for any set of icon packs.
  const packageContents = `
    export { ${this.options.fas.join(',')} }  from '@fortawesome/fontawesome-free-solid/shakable.es.js'
  `
  const entryFileName = 'fontawesome-fas.js'
  const _thisPlugin = this
  return new Promise(function(resolve, reject) {
    fs.writeFile(path.join(_thisPlugin.outputPath, entryFileName), packageContents, (err) => {
      if (err) reject(err)
      else {
        resolve()
      }
    })
  })
}


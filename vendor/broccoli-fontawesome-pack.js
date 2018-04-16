'use strict';

var Plugin = require('broccoli-plugin')
var path = require('path')
var fs = require('fs')
var { config } = require('@fortawesome/fontawesome-svg-core');

module.exports = FontAwesomePack
FontAwesomePack.prototype = Object.create(Plugin.prototype)
FontAwesomePack.prototype.constructor = FontAwesomePack
function FontAwesomePack(inputNodes, options) {
  if (!(this instanceof FontAwesomePack)) return new FontAwesomePack(inputNodes, options)
  const {
    pack,
    icons,
    output
  } = options

  if(!pack) throw new Error("Required 'pack' option not specified")
  if(!(icons === 'all' || Array.isArray(icons)))
    throw new Error("icons option must be either 'all' or an array of icon names like 'coffee'")
  if(!output) throw new Error("Required 'output' option not specified")

  this.options = {
    pack,
    icons,
    output,
    name: `broccoli-fontawesome-pack: ${pack}`,
    annotation: pack
  }

  this._isBuilt = false

  Plugin.call(this, inputNodes, {
    persistentOutput: true,
    annotation: this.options.annotation,
    name: this.options.name
  })
}

FontAwesomePack.prototype.build = function() {
  if(this._isBuilt) return

  const pack = require(`@fortawesome/${this.options.pack}`)
  let selectedIcons;

  if(this.options.icons === 'all'){
    selectedIcons = Object.keys(pack[pack.prefix])
  } else {
    selectedIcons = this.options.icons.map(iconName => {
      const prefix = config.familyPrefix;
      if (iconName.substr(0, 2) === prefix) {
        return iconName;
      }

      return prefix + iconName.charAt(0).toUpperCase() + iconName.substr(1);
    });
  }

  const packageContents = `
    export {
      ${ selectedIcons.join(',') }
    }  from '@fortawesome/${this.options.pack}/index.es.js'
  `
  const _thisPlugin = this
  return new Promise(function(resolve, reject) {
    fs.writeFile(path.join(_thisPlugin.outputPath, _thisPlugin.options.output), packageContents, (err) => {
      if (err) reject(err)
      else {
        _thisPlugin._isBuilt = true
        resolve()
      }
    })
  })
}


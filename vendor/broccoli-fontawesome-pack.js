'use strict';

var Plugin = require('broccoli-plugin')
var path = require('path')
var fs = require('fs')

module.exports = FontAwesomePack
FontAwesomePack.prototype = Object.create(Plugin.prototype)
FontAwesomePack.prototype.constructor = FontAwesomePack
function FontAwesomePack(options) {
  if (!(this instanceof FontAwesomePack)) return new FontAwesomePack(options)

  const { 
    pack,
    icons,
    output
  } = options
  
  if(!pack) throw new Error("Required 'pack' option not specified")
  if(!(icons === 'all' || Array.isArray(icons))) 
    throw new Error("icons option must be either 'all' or an array of icon names like 'faCoffee'")
  if(!output) throw new Error("Required 'output' option not specified")

  this.options = {
    pack,
    icons,
    output,
    name: `broccoli-fontawesome-pack: ${pack}`,
    annotation: pack
  }

  Plugin.call(this, [], {
    persistentOutput: true,
    annotation: this.options.annotation,
    name: this.options.name
  })
}

FontAwesomePack.prototype.build = function() {
  const pack = require(`@fortawesome/${this.options.pack}`)
  let selectedIcons;

  if(this.options.icons === 'all'){
    selectedIcons = Object.keys(pack[pack.prefix])
  } else {
    selectedIcons = this.options.icons
  }

  const packageContents = `
    export { 
      ${ selectedIcons.join(',') } 
    }  from '@fortawesome/${this.options.pack}/shakable.es.js'
  `
  const _thisPlugin = this
  return new Promise(function(resolve, reject) {
    fs.writeFile(path.join(_thisPlugin.outputPath, _thisPlugin.options.output), packageContents, (err) => {
      if (err) reject(err)
      else {
        resolve()
      }
    })
  })
}


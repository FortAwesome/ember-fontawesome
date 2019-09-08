'use strict';

var Plugin = require('broccoli-plugin')
var path = require('path')
var fs = require('fs')
var camelCase = require('camel-case')
var { config } = require('@fortawesome/fontawesome-svg-core');

class FontAwesomePack extends Plugin {
  constructor(inputNodes, options = {}) {
    const {
      pack,
      icons,
      output
    } = options

    if(!pack) throw new Error("Required 'pack' option not specified")
    if(!(icons === 'all' || Array.isArray(icons)))
      throw new Error("icons option must be either 'all' or an array of icon names like 'coffee'")
    if(!output) throw new Error("Required 'output' option not specified")

    const builtOptions = {
      pack,
      icons,
      output,
      name: `broccoli-fontawesome-pack: ${pack}`,
      annotation: pack
    }

    super(inputNodes, {
      persistentOutput: true,
      annotation: builtOptions.annotation,
      name: builtOptions.name
    });

    this._isBuilt = false
    this.options = builtOptions;
  }

  build() {
    if(this._isBuilt) return

    const pack = require(`@fortawesome/${this.options.pack}`)
    let selectedIcons;

    if(this.options.icons === 'all'){
      selectedIcons = Object.keys(pack[pack.prefix])
    } else {
      const prefix = config.familyPrefix;
      //Look for icons which already contain the prefix as eg `faPencil` or `fa-pencil` without catching `fax`
      const regexp = new RegExp(`^${prefix}([A-Z]|-)`);
      selectedIcons = this.options.icons.map(iconName => {
        if (!regexp.test(iconName)) {
          iconName = `${prefix}-${iconName}`;
        }

        return camelCase(iconName);
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
}
module.exports = FontAwesomePack

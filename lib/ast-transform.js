/* eslint-env node */
"use strict";

const FaIconComponent = require('./build-time-components/fa-icon');
const { getAbstractIcon } = require('./fontawesome-helpers');

class AstTransform {
  constructor(options) {
    this.options = options;
  }

  transform(ast) {
    this.syntax.traverse(ast, {
      BlockStatement: (node) => {
        return this._applyTransform(node);
      },

      MustacheStatement: (node) => {
        return this._applyTransform(node);
      }
    });

    return ast;
  }

  _applyTransform(node) {
    if (
      node.path.original === 'fa-icon' &&
      this._hasStaticIconName(node) &&
      !this._hasUnsupportedProperty(node) &&
      this._iconExists(node)
    ) {
      return new FaIconComponent(node, { transform: this }).toElement()
    }
  }

  _hasStaticIconName(node) {
    if (node.params.length && node.params[0].type === 'StringLiteral') {
      //icon is given as a positional param {{fa-icon 'coffee'}}
      return true;
    }
    const hash = node.hash.pairs.find(obj => obj.key === 'icon');
    if (hash) {
      return hash.value.type === 'StringLiteral';
    }

    return false;
  }

  _iconExists(node) {
    let icon, prefix;
    if (node.params.length && node.params[0].type === 'StringLiteral') {
      //icon is given as a positional param {{fa-icon 'coffee'}}
      icon = node.params[0].value;
    } else {
      const iconHash = node.hash.pairs.find(obj => obj.key === 'icon');
      if (iconHash) {
        icon = iconHash.value.value;
      }
    }
    const prefixHash = node.hash.pairs.find(obj => obj.key === 'prefix');
    prefix = prefixHash ? prefixHash.value.value : this.addon.fontawesomeConfig.defaultPrefix;

    if (!getAbstractIcon(icon, prefix)) {
      this.addon.ui.writeWarnLine(`${this.addon.name}: Unable to load icon '${icon}' with prefix '${prefix}'.`);
      return false;
    }

    return true;
  }

  _hasUnsupportedProperty(node) {
    const transform = node.hash.pairs.find(obj => obj.key === 'transform');
    const mask = node.hash.pairs.find(obj => obj.key === 'mask');
    const flip = node.hash.pairs.find(obj => obj.key === 'flip');

    return (transform || mask || flip);
  }
}

function buildAstTransform(addon) {
  return class EmberFontAwesomeAstTransform extends AstTransform {
    constructor(options) {
      super(options);
      this.addon = addon;
    }
  }
}

module.exports = buildAstTransform;

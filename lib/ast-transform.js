/* eslint-env node */
"use strict";

const FaIconComponent = require('./build-time-components/fa-icon');

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
    if (node.path.original === 'fa-icon' && this._hasStaticIconName(node)) {
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

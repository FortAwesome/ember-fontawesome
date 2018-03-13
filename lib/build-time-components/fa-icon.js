/* eslint-env node */
"use strict";

const { default: BuildTimeComponent, interpolateProperties } = require('ember-ast-helpers/build-time-component');
const { getAbstractIcon } = require('../fontawesome-helpers');

module.exports = class FaIconComponent extends BuildTimeComponent {
  constructor(node, opts = {}) {
    super(node, Object.assign({ tagName: 'svg', ariaHidden: true }, opts));
    this._syntax = opts.transform.syntax;
    this.classNames = ['svg-inline--fa'];
    this.classNameBindings = [
      'pull',
      'rotate',
      'flip',
      'fixedWidth:fa-fw',
      'pulse:fa-pulse',
      'inverse:fa-inverse',
      'border:fa-border',
      'spin:fa-spin',
      'listItem:fa-li'
    ];
    this.attributeBindings = [
      'title',
      'ariaLabel:aria-label',
      'ariaHidden:aria-hidden:true',
      'click:onclick',
      'role',
      'xmlns',
      'viewBox',
      'dataIcon:data-icon',
      'dataPrefix:data-prefix',
    ];
    this.layout`<path d={{iconPath}} fill=currentColor></path>`;
    this.positionalParams = ['icon'];
    this.role = 'img';
    this.xmlns = this.svgAttribute('xmlns');
    this.viewBox = this.svgAttribute('viewBox');
    this.dataIcon = this.svgAttribute('data-icon');
    this.dataPrefix = this.svgAttribute('data-prefix');
    this.pullContent = interpolateProperties('fa-pull-:pull:');
    this.rotateContent = interpolateProperties('fa-rotate-:rotate:');
    this.flipContent = interpolateProperties('fa-flip-:flip:');
    this.styleContent = interpolateProperties('color:$color$', { divisor: '$', skipIfMissingDynamic: true });
  }

  svgAttribute(what) {
    const obj = this.getIconObject();
    if (obj) {
      return obj.attributes[what];
    }

    return null;
  }

  iconPathContent() {
    const obj = this.getIconObject();
    if (obj) {
      return obj.children[0].attributes['d'];
    }

    return null;
  }

  getIconObject() {
    const iconObject = this.invocationAttrs.icon;
    const iconName = iconObject.original ? iconObject.original : null;

    const prefixObject = this.invocationAttrs.prefix;
    const prefix = (prefixObject && prefixObject.original) ? prefixObject.original : 'fas';
    if (iconName && iconName !== 'icon') {
      return getAbstractIcon(iconName, prefix);
    }
  }
}

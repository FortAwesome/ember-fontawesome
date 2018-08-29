/* eslint-env node */
"use strict";

const { default: BuildTimeComponent, interpolateProperties } = require('ember-ast-helpers/build-time-component');
const { getAbstractIcon, getReplacementClass } = require('../fontawesome-helpers');
const { interpolateSize } = require('./utils');

module.exports = class FaIconComponent extends BuildTimeComponent {
  constructor(node, opts = {}) {
    super(node, Object.assign({ tagName: 'svg', ariaHidden: true }, opts));
    this._syntax = opts.transform.syntax;
    this._defaultPrefix = opts.transform.addon.fontawesomeConfig.defaultPrefix;
    this.classNames = [getReplacementClass()];
    this.classNameBindings = [
      'icon',
      'spin:fa-spin',
      'pulse:fa-pulse',
      'fixedWidth:fa-fw',
      'border:fa-border',
      'listItem:fa-li',
      'size',
      'rotation',
      'pull',
    ];
    this.attributeBindings = [
      'ariaLabel:aria-label',
      'ariaHidden:aria-hidden:true',
      'click:onclick',
      'role',
      'xmlns',
      'viewBox',
      'dataIcon:data-icon',
      'dataPrefix:data-prefix',
    ];
    this.layout`
      <title>{{title}}</title>
      <path d={{iconPath}} fill=currentColor></path>
    `;
    this.positionalParams = ['icon'];
    this.role = 'img';
    this.xmlns = this.svgAttribute('xmlns');
    this.viewBox = this.svgAttribute('viewBox');
    this.dataIcon = this.svgAttribute('data-icon');
    this.dataPrefix = this.svgAttribute('data-prefix');
    this.iconContent = interpolateProperties('fa-:icon:');
    this.pullContent = interpolateProperties('fa-pull-:pull:');
    this.rotationContent = interpolateProperties('fa-rotate-:rotation:');
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

  sizeContent() {
    return interpolateSize(this);
  }

  getIconObject() {
    const iconObject = this.invocationAttrs.icon;
    const iconName = iconObject.original ? iconObject.original : null;

    const prefixObject = this.invocationAttrs.prefix;
    const prefix = (prefixObject && prefixObject.original) ? prefixObject.original : this._defaultPrefix;
    if (iconName && iconName !== 'icon') {
      return getAbstractIcon(iconName, prefix);
    }
  }
}

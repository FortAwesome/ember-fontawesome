/* eslint-env node */
'use strict';

const path = require('path');
const { getAbstractIcon } = require('./fontawesome-helpers');

const prefixToSpriteFile = {
  fas: 'solid',
  far: 'regular',
  fal: 'light',
  fad: 'duotone',
  fab: 'brands',
};

/*
  ```hbs
  <FaStaticIcon @prefix="fas" @icon="coffee" />
  ```

  becomes

  ```hbs
  <svg>
    <use xlink:href="fa-solid.svg#coffee"></use>
  </svg>
  ```
*/
module.exports = class FaStaticSpriteTransformPlugin {
  constructor(env, options) {
    this.syntax = env.syntax;
    this.builders = env.syntax.builders;
    this.options = options;
    this.visitor = this.buildVisitor();
  }

  static instantiate({ options }) {
    return {
      name: 'fontawesome-static-sprite-transform',
      plugin: env => new this(env, options),
      parallelBabel: {
        requireFile: __filename,
        buildUsing: 'instantiate',
        params: { options },
      },
      baseDir() {
        return `${__dirname}/..`;
      }
    };
  }

  buildVisitor() {
    return {
      ElementNode: node => this.transformElementNode(node),
    };
  }

  transformElementNode(node) {
    if (node.tag === 'FaStaticSprite') {
      const controlAttrs = node.attributes.filter(attr => attr.name.startsWith('@'));
      const passedAttributes = node.attributes.filter(attr => {
        return attr.name !== 'class' && !controlAttrs.includes(attr)
      });
      const mappedAttributes = controlAttrs.reduce((obj, attr) => {
        obj[attr.name] = attr.value;
        return obj;
      }, {});
      if (!mappedAttributes.hasOwnProperty('@icon')) {
        throw new Error(
          '<FaStaticSprite /> requires an @icon parameter');
      }
      const iconName = mappedAttributes['@icon'].chars;
      const prefix = mappedAttributes.hasOwnProperty('@prefix') ? mappedAttributes['@prefix'].chars : this.options.defaultPrefix;

      //use a set to force uniqueness
      const cssClasses = new Set();
      const icon = getAbstractIcon(iconName, prefix);
      if (!icon) {
        throw new Error(`icon "${iconName}" with prefix "${prefix}" could not be found.`);
      }
      icon.attributes.class.split(' ').forEach(str => cssClasses.add(str));

      const passedCssClassAttr = node.attributes.find(attr => attr.name === 'class');
      if (passedCssClassAttr) {
        //filter out any null/undefined/empty string falsey values
        const values = passedCssClassAttr.value.chars.split(' ').filter(Boolean);
        values.forEach(str => cssClasses.add(str));
      }
      const hasTitle = mappedAttributes.hasOwnProperty('@title');

      const defaultAttributes = [
        { key: 'class', value: [...cssClasses.values()].join(' ') },
        { key: 'role', value: 'img' },
        { key: 'focusable', value: String(hasTitle) },
        { key: 'aria-hidden', value: String(!hasTitle) },
        { key: 'xmlns', value: icon.attributes.xmlns },
      ].map(({key, value}) => {
        return this.builders.attr(key, this.builders.text(value));
      });
      const spriteFile = `${prefixToSpriteFile[prefix]}.svg`;
      const spritePath = path.join('assets', 'fa-sprites', spriteFile)

      const children = [];
      if (hasTitle) {
        const title = this.builders.text(mappedAttributes['@title'].chars);
        children.push(this.builders.element('title', null, null, [title]));
      }
      const xlink = this.builders.attr('xlink:href', this.builders.text(`${spritePath}#${iconName}`));
      children.push(this.builders.element('use', [xlink]));

      return this.builders.element('svg', [...defaultAttributes, ...passedAttributes], null, children);
    }
  }
}

import Component from '@glimmer/component';
import { icon, parse, toHtml } from '@fortawesome/fontawesome-svg-core';
import { htmlSafe } from '@ember/template';
import appConfig from 'ember-get-config';

function objectWithKey(key, value) {
  return (Array.isArray(value) && value.length > 0) ||
    (!Array.isArray(value) && value)
    ? { [key]: value }
    : {};
}

function normalizeIconArgs(prefix, icon) {
  const defaultPrefix = appConfig?.fontawesome?.defaultPrefix ?? 'fas';

  if (!icon) {
    return { prefix: defaultPrefix, iconName: null };
  }

  if (typeof icon === 'object' && icon.prefix && icon.iconName) {
    return icon;
  }

  if (parse.icon) {
    if (typeof prefix === 'string' && typeof icon === 'string') {
      return parse.icon({ prefix: prefix, iconName: icon });
    }

    if (typeof icon === 'string') {
      return parse.icon({ prefix: defaultPrefix, iconName: icon });
    }
  }

  if (typeof prefix === 'string' && typeof icon === 'string') {
    return { prefix: prefix, iconName: icon };
  }

  if (typeof icon === 'string') {
    return { prefix: defaultPrefix, iconName: icon };
  }
}

export default class FaIconComponent extends Component {
  get content() {
    const children = this.abstractIcon?.children ?? [];
    const html = children.reduce((acc, cur) => {
      return `${acc}${toHtml(cur)}`;
    }, '');

    return htmlSafe(html);
  }

  get safeStyle() {
    return this.iconAttributes.style
      ? htmlSafe(`${this.iconAttributes.style}`)
      : undefined;
  }

  get iconExists() {
    return Boolean(this.abstractIcon);
  }

  get flipHorizontal() {
    return this.args.flip === 'horizontal' || this.args.flip === 'both';
  }

  get flipVertical() {
    return this.args.flip === 'vertical' || this.args.flip === 'both';
  }

  get classList() {
    let classes = {
      'fa-spin': this.args.spin,
      'fa-pulse': this.args.pulse,
      'fa-fw': this.args.fixedWidth,
      'fa-border': this.args.border,
      'fa-li': this.args.listItem,
      'fa-flip-horizontal': this.flipHorizontal,
      'fa-flip-vertical': this.flipVertical,
      [`fa-${this.args.size}`]: this.args.size,
      [`fa-rotate-${this.args.rotation}`]: this.args.rotation,
      [`fa-pull-${this.args.pull}`]: this.args.pull,
    };

    return Object.keys(classes).filter((key) => classes[key]);
  }

  get abstractIcon() {
    const iconLookup = normalizeIconArgs(this.args.prefix, this.args.icon);
    const classes = objectWithKey('classes', this.classList);
    const transform = objectWithKey(
      'transform',
      typeof this.args.transform === 'string'
        ? parse.transform(this.args.transform)
        : this.args.transform
    );
    const mask = objectWithKey('mask', normalizeIconArgs(null, this.args.mask));
    const symbol = this.args.symbol ?? false;
    let title = this.args.title ? `${this.args.title}` : null;

    const o = Object.assign({}, classes, transform, mask, { symbol, title });

    const renderedIcon = icon(iconLookup, o);
    if (!renderedIcon) {
      console.warn(
        `Could not find icon: iconName=${iconLookup.iconName}, prefix=${iconLookup.prefix}. You may need to add it to your icons.js.`
      );
      return null;
    }

    return renderedIcon.abstract[0];
  }

  get iconAttributes() {
    return this.abstractIcon?.attributes ?? {};
  }

  get dataPrefix() {
    return this.iconAttributes['data-prefix'];
  }

  get dataIcon() {
    return this.iconAttributes['data-icon'];
  }

  get dataFaTransform() {
    return this.iconAttributes['data-fa-transform'];
  }

  get dataFaMask() {
    return this.iconAttributes['data-fa-mask'];
  }

  get dataFaProcessed() {
    return this.iconAttributes['data-fa-processed'];
  }

  get ariaHidden() {
    return this.iconAttributes['aria-hidden'];
  }

  get ariaLabelledBy() {
    return this.iconAttributes['aria-labelledby'];
  }

  get viewBox() {
    return this.abstractIcon?.attributes?.viewBox ?? '0 0 448 512';
  }
}

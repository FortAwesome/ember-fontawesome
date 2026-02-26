import Component from '@glimmer/component';
import { toHtml, parse, icon } from '@fortawesome/fontawesome-svg-core';
import { htmlSafe } from '@ember/template';
import { getOwner } from '@ember/application';
import { get } from '@ember/helper';
import { macroCondition, dependencySatisfies } from '@embroider/macros';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

function objectWithKey(key, value) {
  return Array.isArray(value) && value.length > 0 || !Array.isArray(value) && value ? {
    [key]: value
  } : {};
}
class FaIconComponent extends Component {
  get content() {
    const children = this.abstractIcon?.children ?? [];
    const html = children.reduce((acc, cur) => {
      return `${acc}${toHtml(cur)}`;
    }, '');
    return htmlSafe(html);
  }
  get safeStyle() {
    return this.iconAttributes['style'] ? htmlSafe(`${this.iconAttributes['style']}`) : undefined;
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
    const classes = {
      'fa-spin': this.args.spin,
      'fa-pulse': this.args.pulse,
      'fa-fw': this.args.fixedWidth,
      'fa-border': this.args.border,
      'fa-li': this.args.listItem,
      'fa-flip-horizontal': this.flipHorizontal,
      'fa-flip-vertical': this.flipVertical,
      [`fa-${this.args.size}`]: this.args.size,
      [`fa-rotate-${this.args.rotation}`]: this.args.rotation,
      [`fa-pull-${this.args.pull}`]: this.args.pull
    };
    return Object.keys(classes).filter(key => classes[key]);
  }
  get abstractIcon() {
    if (macroCondition(dependencySatisfies('@fortawesome/fontawesome-svg-core', '>=7.0.0'))) {
      if (this.args.title !== undefined) {
        throw new Error('@title has no effect in Font Awesome 7+. If you want to keep this behavior, use aria-label instead. For more details, see: https://docs.fontawesome.com/upgrade/whats-changed#simpler-accessibility');
      }
    }
    const iconLookup = this.normalizeIconArgs(this.args.icon, this.args.prefix);
    if (!iconLookup) {
      console.warn('Could not find icon: Icon argument was passed empty, undefined or null!');
      return null;
    }
    const classes = objectWithKey('classes', this.classList);
    const transform = objectWithKey('transform', typeof this.args.transform === 'string' ? parse.transform(this.args.transform) : this.args.transform ?? {});
    const mask = objectWithKey('mask', this.args.mask ? this.normalizeIconArgs(this.args.mask) : null);
    const symbol = this.args.symbol ?? false;
    // Title is only supported for FA 5 + 6... for FA 7+ pass title as aria-label https://docs.fontawesome.com/upgrade/whats-changed#simpler-accessibility
    const title = this.args.title ? `${this.args.title}` : null;
    const o = Object.assign({}, classes, transform, mask, {
      symbol,
      title
    });
    const renderedIcon = icon(iconLookup, o);
    if (!renderedIcon) {
      console.warn(`Could not find icon: iconName=${iconLookup.iconName}, prefix=${iconLookup.prefix}. You may need to add it to your font-awesome.js/ts.`);
      return null;
    }
    return renderedIcon.abstract[0] ?? null;
  }
  get iconAttributes() {
    return this.abstractIcon?.attributes ?? {};
  }
  get dataPrefix() {
    return this.iconAttributes['data-prefix'] ?? '';
  }
  get dataIcon() {
    return this.iconAttributes['data-icon'] ?? '';
  }
  get dataFaTransform() {
    return this.iconAttributes['data-fa-transform'] ?? '';
  }
  get dataFaMask() {
    return this.iconAttributes['data-fa-mask'] ?? '';
  }
  get dataFaProcessed() {
    return this.iconAttributes['data-fa-processed'] ?? '';
  }
  get ariaHidden() {
    return this.iconAttributes['aria-hidden'] ?? '';
  }
  get ariaLabelledBy() {
    return this.iconAttributes['aria-labelledby'] ?? '';
  }
  get viewBox() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return this.abstractIcon?.attributes?.viewBox ?? '0 0 448 512';
  }
  normalizeIconArgs(icon, prefix) {
    // @ts-expect-error Property 'resolveRegistration' does not exist on type 'Owner'.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const appConfig = getOwner(this).resolveRegistration('config:environment');
    const defaultPrefix = appConfig?.fontawesome?.defaultPrefix ?? 'fas';
    if (!icon) {
      return null;
    }
    if (typeof icon === 'object' && icon.prefix && icon.iconName) {
      return icon;
    }
    if (parse.icon) {
      if (typeof prefix === 'string' && typeof icon === 'string') {
        return parse.icon({
          prefix: prefix,
          iconName: icon
        });
      }
      if (typeof icon === 'string') {
        return parse.icon({
          prefix: defaultPrefix,
          iconName: icon
        });
      }
    }
    if (typeof prefix === 'string' && typeof icon === 'string') {
      return {
        prefix: prefix,
        iconName: icon
      };
    }
    if (typeof icon === 'string') {
      return {
        prefix: defaultPrefix,
        iconName: icon
      };
    }
    return null;
  }
  static {
    setComponentTemplate(precompileTemplate("\n    {{~#if this.iconExists~}}\n      <svg style={{this.safeStyle}} class={{get this.iconAttributes \"class\"}} data-prefix={{this.dataPrefix}} data-icon={{this.dataIcon}} data-fa-transform={{this.dataFaTransform}} data-fa-mask={{this.dataFaMask}} data-fa-processed={{this.dataFaProcessed}} aria-hidden={{this.ariaHidden}} aria-labelledby={{this.ariaLabelledBy}} focusable={{get this.iconAttributes \"focusable\"}} role={{get this.iconAttributes \"role\"}} xmlns={{get this.iconAttributes \"xmlns\"}} viewBox={{this.viewBox}} ...attributes>\n        {{this.content}}\n      </svg>\n    {{~/if~}}\n  ", {
      strictMode: true,
      scope: () => ({
        get
      })
    }), this);
  }
}

export { FaIconComponent as default };
//# sourceMappingURL=fa-icon.js.map

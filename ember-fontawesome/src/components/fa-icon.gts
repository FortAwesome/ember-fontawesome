import Component from '@glimmer/component';
import {
  icon,
  parse,
  toHtml,
  type AbstractElement,
  type FaSymbol,
  type FlipProp,
  type IconDefinition,
  type IconLookup,
  type IconName,
  type IconParams,
  type IconPrefix,
  type PullProp,
  type RotateProp,
  type SizeProp,
  type Transform,
} from '@fortawesome/fontawesome-svg-core';
import { htmlSafe, type SafeString } from '@ember/template';
import { getOwner } from '@ember/application';
import { get } from '@ember/helper';

function objectWithKey(
  key: string,
  value: string[] | IconLookup | Transform | null,
): {
  [x: string]: string[] | IconLookup | Transform | null;
} {
  return (Array.isArray(value) && value.length > 0) ||
    (!Array.isArray(value) && value)
    ? { [key]: value }
    : {};
}

interface FaIconSignature {
  Element: SVGElement;
  Args: {
    icon: IconName | IconLookup | IconDefinition;
    prefix?: IconPrefix;
    flip?: FlipProp;
    spin?: boolean;
    pulse?: boolean;
    fixedWidth?: boolean;
    border?: boolean;
    listItem?: boolean;
    size?: SizeProp;
    rotation?: RotateProp;
    pull?: PullProp;
    transform?: Transform | string;
    symbol?: FaSymbol;
    title?: string;
    mask?: IconName | IconLookup | IconDefinition;
  };
}

export default class FaIconComponent extends Component<FaIconSignature> {
  get content(): SafeString {
    const children = this.abstractIcon?.children ?? [];
    const html = children.reduce((acc, cur) => {
      return `${acc}${toHtml(cur)}`;
    }, '');

    return htmlSafe(html);
  }

  get safeStyle(): SafeString | undefined {
    return this.iconAttributes['style']
      ? htmlSafe(`${this.iconAttributes['style']}`)
      : undefined;
  }

  get iconExists(): boolean {
    return Boolean(this.abstractIcon);
  }

  get flipHorizontal(): boolean {
    return this.args.flip === 'horizontal' || this.args.flip === 'both';
  }

  get flipVertical(): boolean {
    return this.args.flip === 'vertical' || this.args.flip === 'both';
  }

  get classList(): string[] {
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
      [`fa-pull-${this.args.pull}`]: this.args.pull,
    };

    return Object.keys(classes).filter((key) => classes[key]);
  }

  get abstractIcon(): AbstractElement | null {
    const iconLookup = this.normalizeIconArgs(this.args.icon, this.args.prefix);
    if (!iconLookup) {
      console.warn(
        'Could not find icon: Icon argument was passed empty, undefined or null!',
      );
      return null;
    }
    const classes = objectWithKey('classes', this.classList);
    const transform = objectWithKey(
      'transform',
      typeof this.args.transform === 'string'
        ? parse.transform(this.args.transform)
        : (this.args.transform ?? {}),
    );
    const mask = objectWithKey(
      'mask',
      this.args.mask ? this.normalizeIconArgs(this.args.mask) : null,
    );
    const symbol = this.args.symbol ?? false;
    const title = this.args.title ? `${this.args.title}` : null;

    const o = Object.assign({}, classes, transform, mask, {
      symbol,
      title,
    }) as IconParams;

    const renderedIcon = icon(iconLookup, o);
    if (!renderedIcon) {
      console.warn(
        `Could not find icon: iconName=${iconLookup.iconName}, prefix=${iconLookup.prefix}. You may need to add it to your font-awesome.js/ts.`,
      );
      return null;
    }

    return renderedIcon.abstract[0] ?? null;
  }

  get iconAttributes(): Record<string, string> {
    return (this.abstractIcon?.attributes as Record<string, string>) ?? {};
  }

  get dataPrefix(): string {
    return this.iconAttributes['data-prefix'] ?? '';
  }

  get dataIcon(): string {
    return this.iconAttributes['data-icon'] ?? '';
  }

  get dataFaTransform(): string {
    return this.iconAttributes['data-fa-transform'] ?? '';
  }

  get dataFaMask(): string {
    return this.iconAttributes['data-fa-mask'] ?? '';
  }

  get dataFaProcessed(): string {
    return this.iconAttributes['data-fa-processed'] ?? '';
  }

  get ariaHidden(): string {
    return this.iconAttributes['aria-hidden'] ?? '';
  }

  get ariaLabelledBy(): string {
    return this.iconAttributes['aria-labelledby'] ?? '';
  }

  get viewBox(): string {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return (this.abstractIcon?.attributes?.viewBox as string) ?? '0 0 448 512';
  }

  private normalizeIconArgs(
    icon: IconName | IconLookup | IconDefinition,
    prefix?: IconPrefix,
  ): IconLookup | null {
    // @ts-expect-error Property 'resolveRegistration' does not exist on type 'Owner'.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const appConfig = getOwner(this).resolveRegistration(
      'config:environment',
    ) as {
      fontawesome?: {
        defaultPrefix?: IconPrefix;
      };
    };

    const defaultPrefix: IconPrefix =
      appConfig?.fontawesome?.defaultPrefix ?? 'fas';

    if (!icon) {
      return null;
    }

    if (typeof icon === 'object' && icon.prefix && icon.iconName) {
      return icon;
    }

    if (parse.icon) {
      if (typeof prefix === 'string' && typeof icon === 'string') {
        // Issue https://github.com/FortAwesome/Font-Awesome/issues/20231
        // @ts-expect-error Argument of type '{ prefix: IconPrefix; iconName: IconName; }' is not assignable to parameter of type 'string'.
        return parse.icon({ prefix: prefix, iconName: icon });
      }

      if (typeof icon === 'string') {
        // Issue https://github.com/FortAwesome/Font-Awesome/issues/20231
        // @ts-expect-error Argument of type '{ prefix: IconPrefix; iconName: IconName; }' is not assignable to parameter of type 'string'.
        return parse.icon({ prefix: defaultPrefix, iconName: icon });
      }
    }

    if (typeof prefix === 'string' && typeof icon === 'string') {
      return { prefix: prefix, iconName: icon };
    }

    if (typeof icon === 'string') {
      return { prefix: defaultPrefix, iconName: icon };
    }

    return null;
  }

  <template>
    {{~#if this.iconExists~}}
      <svg
        style={{this.safeStyle}}
        class={{get this.iconAttributes "class"}}
        data-prefix={{this.dataPrefix}}
        data-icon={{this.dataIcon}}
        data-fa-transform={{this.dataFaTransform}}
        data-fa-mask={{this.dataFaMask}}
        data-fa-processed={{this.dataFaProcessed}}
        aria-hidden={{this.ariaHidden}}
        aria-labelledby={{this.ariaLabelledBy}}
        focusable={{get this.iconAttributes "focusable"}}
        role={{get this.iconAttributes "role"}}
        xmlns={{get this.iconAttributes "xmlns"}}
        viewBox={{this.viewBox}}
        ...attributes
      >
        {{this.content}}
      </svg>
    {{~/if~}}
  </template>
}

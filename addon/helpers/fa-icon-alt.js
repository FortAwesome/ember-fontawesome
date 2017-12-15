import { helper } from '@ember/component/helper';
import fontawesome from '@fortawesome/fontawesome';
// @TODO: can we avoid importing the whole Ember framework by importing
// Only what we need here?
import Ember from 'ember';

function objectWithKey (key, value) {
  return ((Array.isArray(value) && value.length > 0) || (!Array.isArray(value) && value)) ? {[key]: value} : {}
}

function classList (options) {
  let classes = {
    'fa-spin': options.spin,
    'fa-pulse': options.pulse,
    'fa-fw': options.fixedWidth,
    'fa-border': options.border,
    'fa-li': options.listItem,
    'fa-flip-horizontal': options.flip === 'horizontal' || options.flip === 'both',
    'fa-flip-vertical': options.flip === 'vertical' || options.flip === 'both',
    [`fa-${options.size}`]: typeof options.size !== 'undefined',
    [`fa-rotate-${options.rotation}`]: typeof options.rotation !== 'undefined',
    [`fa-pull-${options.pull}`]: typeof options.pull !== 'undefined'
  }

  return Object.keys(classes)
    .map(key => classes[key] ? key : null)
    .filter(key => key)
}

function normalizeIconArgs (icon) {
  if (icon === null) {
    return null
  }

  if (typeof icon === 'object' && icon.prefix && icon.iconName) {
    return icon
  }

  if (Array.isArray(icon) && icon.length === 2) {
    return { prefix: icon[0], iconName: icon[1] }
  }

  if (typeof icon === 'string') {
    return { prefix: 'fas', iconName: icon }
  }
}

export function faIconAlt(params, options) {
  const icon = normalizeIconArgs(options.icon)
  const classes = objectWithKey('classes', [...classList(options), ...(options.class || '').split(' ')])
  const transform = objectWithKey('transform', (typeof options.transform === 'string') ? fontawesome.parse.transform(options.transform) : options.transform)
  const mask = objectWithKey('mask', normalizeIconArgs(options.mask))
  const symbol = typeof options.symbol !== 'undefined'

  // @TODO: consider the equivalent of extraProps
  const renderedIcon = fontawesome.icon(icon, Object.assign({},
    classes,
    transform,
    mask,
    {symbol: symbol}
  ))

  if (!renderedIcon) {
    Ember.Logger.warn('Could not find icon', icon)
    return null
  }
  return Ember.String.htmlSafe(renderedIcon.html)
}

export default helper(faIconAlt);

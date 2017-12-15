import Component from '@ember/component'
import layout from '../templates/components/fa-icon'
import Ember from 'ember'
import fontawesome from '@fortawesome/fontawesome' // eslint-disable-line no-unused-vars

function objectWithKey (key, value) {
  return ((Array.isArray(value) && value.length > 0) || (!Array.isArray(value) && value)) ? {[key]: value} : {}
}

function classList () {
  let classes = {
    'fa-spin': this.get('spin'),
    'fa-pulse': this.get('pulse'),
    'fa-fw': this.get('fixedWidth'),
    'fa-border': this.get('border'),
    'fa-li': this.get('listItem'),
    'fa-flip-horizontal': this.get('flip') === 'horizontal' || this.get('flip') === 'both',
    'fa-flip-vertical': this.get('flip') === 'vertical' || this.get('flip') === 'both',
    [`fa-${this.get('size')}`]: this.getWithDefault('size', null) !== null,
    [`fa-rotate-${this.get('rotation')}`]: this.getWithDefault('rotation', null) !== null,
    [`fa-pull-${this.get('pull')}`]: this.getWithDefault('pull', null) !== null
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

export default Component.extend({
  layout,

  // @TODO: make this less hacky—shouldn't be a copy-paste from the -node component
  attributeBindings: [
    'aria-hidden',
    'aria-labelledby',
    'data-fa-processed',
    'data-fa-transform',
    'data-fa-mask',
    'data-icon',
    'data-prefix',
    'role',
    'viewBox',
    'xmlns',
    'd',
    'fill',
    'x',
    'y',
    'width',
    'height',
    'mask',
    'maskUnits',
    'maskContentUnits',
    'transform',
    'clip-path',
    'id'
  ],
  didReceiveAttrs(){
    this._super(...arguments)

    const icon = normalizeIconArgs(this.get('icon'))
    const classes = objectWithKey('classes', [...classList.bind(this)(), ...this.getWithDefault('class', '').split(' ')])
    const transformProp = this.get('transform')
    const transform = objectWithKey('transform', (typeof transformProp === 'string') ? fontawesome.parse.transform(transformProp) : transformProp)
    const mask = objectWithKey('mask', normalizeIconArgs(this.get('mask')))
    const symbol = this.getWithDefault('symbol', false)

    const o = Object.assign({},
      classes,
      transform,
      mask,
      {symbol: symbol}
    )

    // @TODO: consider the equivalent of extraProps
    const renderedIcon = fontawesome.icon(icon, o)

    if (!renderedIcon){
      Ember.Logger.warn('Could not find icon', icon)
      return null
    }

    const {abstract} = renderedIcon
    abstract.attributes && Object.keys(abstract.attributes).forEach((attr) => this.set(attr,abstract.attributes[attr]))
    this.set('abstract', abstract[0])
  }
})

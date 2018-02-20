import Component from '@ember/component'
import layout from '../templates/components/fa-icon'
import Ember from 'ember'
import { icon, parse, toHtml } from '@fortawesome/fontawesome'
import { htmlSafe } from '@ember/string'
import { computed } from '@ember/object' 

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

function normalizeIconArgs (prefix, icon) {
  if (icon === null) {
    return null
  }

  if (typeof icon === 'object' && icon.prefix && icon.iconName) {
    return icon
  }

  if(typeof prefix === 'string' && typeof icon === 'string'){
    return { prefix: prefix, iconName: icon }
  }

  if (typeof icon === 'string') {
    return { prefix: 'fas', iconName: icon }
  }
}

export default Component.extend({
  layout,
  tagName: 'svg',
  classNameBindings: ['class'],
  attributeBindings: [
    // attributes watched for mutation
    'data-prefix',
    'data-icon',
    'data-fa-transform',
    'data-fa-mask',
    'data-fa-processed',
    // accessibility attributes
    'aria-hidden',
    'aria-labelledby',
    // svg attributes
    'role',
    'xmlns',
    'viewBox',
    'safeStyle:style',
  ],
  html: computed('children', function() {
    const children = this.get('children')
    let newHtml
    if(!children){
      newHtml = htmlSafe('')
    } else {
      newHtml = htmlSafe(children.reduce((acc,cur) => {
        return `${acc}${toHtml(cur)}`
      },''))
    }
    return newHtml
  }),
  safeStyle: computed('_frameworkStyle', function() {
    const frameworkStyle = this.get('_frameworkStyle')
    return frameworkStyle ? htmlSafe(`${this.get('_frameworkStyle')}`) : undefined
  }),
  didReceiveAttrs(){
    this._super(...arguments)
    if('_frameworkStyle' in this.attrs) throw new Error('_frameworkStyle attribute is reserved for internal use and may not be set from a template')
    const iconLookup = normalizeIconArgs(this.get('prefix'), this.get('icon'))
    const classes = objectWithKey('classes', [...classList.bind(this)(), ...this.getWithDefault('class', '').split(' ')])
    const transformProp = this.get('transform')
    const transform = objectWithKey('transform', (typeof transformProp === 'string') ? parse.transform(transformProp) : transformProp)
    const mask = objectWithKey('mask', normalizeIconArgs(null, this.get('mask')))
    const symbol = this.getWithDefault('symbol', false)

    const o = Object.assign({},
      classes,
      transform,
      mask,
      {symbol: symbol}
    )

    // @TODO: consider the equivalent of extraProps
    const renderedIcon = icon(iconLookup, o)

    if (!renderedIcon) {
      Ember.Logger.warn('Could not find icon', iconLookup)
      return null
    }
    
    const abstract = renderedIcon.abstract[0]
    this.set('children', abstract.children)
    abstract.attributes && Object.keys(abstract.attributes).forEach(attr => {
      if ( attr === 'style' ) {
        this.set('_frameworkStyle', abstract.attributes[attr])
      } else {
        this.set(attr, abstract.attributes[attr]) 
      }
    })
  }
})

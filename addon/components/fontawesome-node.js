import Component from '@ember/component';
import layout from '../templates/components/fontawesome-node';

export default Component.extend({
  layout,
  classNameBindings: ['class'],
  // @TODO: How can this be derived dynamically from the abstract?
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
    const abstract = this.get('abstract')
    if(abstract) {
      abstract.attributes && Object.keys(abstract.attributes).forEach((attr) => this.set(attr, abstract.attributes[attr]))
      this.set('children', abstract.children)
    }
  }
});

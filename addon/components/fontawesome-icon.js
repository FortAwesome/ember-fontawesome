import Component from '@ember/component'
import layout from '../templates/components/fontawesome-icon'
import fontawesome from '@fortawesome/fontawesome' // eslint-disable-line no-unused-vars

// @TODO: do something real with a call into .icon(). For now, it just demonstrates that
// module loading has worked correctly.
fontawesome.icon()
export default Component.extend({
  layout
})

import Controller from '@ember/controller'
import { faCoffee, faSquare } from '@fortawesome/free-solid-svg-icons'

export default Controller.extend({
  faCoffee,
  faSquare,
  init() {
    this._super(...arguments)
    this.set('magic', 0)
  }
});

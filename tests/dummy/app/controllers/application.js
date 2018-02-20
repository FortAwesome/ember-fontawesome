import Controller from '@ember/controller'
import { faCoffee, faSquare } from '@fortawesome/fontawesome-free-solid'

export default Controller.extend({
  faCoffee,
  faSquare,
  init() {
    this.set('magic', 0)
  }
});

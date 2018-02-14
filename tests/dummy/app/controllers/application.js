import Controller from '@ember/controller'
import { faCoffee } from '@fortawesome/fontawesome-free-solid'

export default Controller.extend({
  faCoffee,
  init(){
    this.set('magic',0)
  },
  actions: {
    updateMagic(val){
      this.set('magic',val)
    }
  }
});

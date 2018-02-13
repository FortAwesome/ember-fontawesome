import Controller from '@ember/controller';
import { faCoffee } from '@fortawesome/ember-fontawesome/icons';
import { library } from '@fortawesome/fontawesome';

library.add(faCoffee)

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

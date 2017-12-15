import Controller from '@ember/controller';
import fontawesome from '@fortawesome/fontawesome'
import fas from '@fortawesome/fontawesome-free-solid'

// Make some of our icons available by their names as strings by adding them to the library
fontawesome.library.add(fas.faCog, fas.faCircle, fas.faSquare)

export default Controller.extend({
  // Make a couple of icons available via object reference in our templates
  faCoffee: fas.faCoffee,
  faSquare: fas.faSquare
});

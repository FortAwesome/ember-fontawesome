import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'test-app/config/environment';
import { library, config as faConfig } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import {
  faCoffee,
  faMagic,
  faCircle,
  faCheck,
  faSquare,
  faHome,
  faInfo,
  faBook,
  faPencilAlt,
  faCog,
  faSpinner,
  faCheckSquare,
  faFax,
  faSync,
  faStopwatch20,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import * as freeRegularSvgIcons from '@fortawesome/free-regular-svg-icons';
import * as freeBrandSvgIcons from '@fortawesome/free-brands-svg-icons';

library.add(
  faCoffee,
  faMagic,
  faCircle,
  faCheck,
  faSquare,
  faHome,
  faInfo,
  faBook,
  faPencilAlt,
  faCog,
  faSpinner,
  faCheckSquare,
  faFax,
  faSync,
  faStopwatch20,
  faTrashAlt,
);

library.add(freeBrandSvgIcons['fab']);
library.add(freeRegularSvgIcons['far']);

faConfig.autoAddCss = false;

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);

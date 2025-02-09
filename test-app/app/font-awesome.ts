import { library, config } from '@fortawesome/fontawesome-svg-core';
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

config.autoAddCss = false;

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

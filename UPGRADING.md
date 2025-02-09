# Upgrading Guide

See the [CHANGELOG.md](./CHANGELOG.md) for detailed information about what has changed between versions.

This guide is useful to figure out what you need to do between breaking changes.

As always, [submit issues](https://github.com/FortAwesome/ember-fontawesome/issues/new) that you run into with this guide or with these upgrades to us.

## 2.0.0 to 3.0.0

The package has been migrated to an [Ember Addon v2](https://rfcs.emberjs.com/id/0507-embroider-v2-package-format/). This is an important and necessary step to ensure compatibility with future Ember versions.
As part of this transition, outdated and unsupported dependencies have been removed, reducing the number of required dependencies to a minimum.


### Icons

Previously, icons were defined as strings inside `config/icons.js`. During the build process, the specified icons were searched for in Font Awesome icon packages and imported automatically.

```ts
module.exports = function () {
  return {
    'free-solid-svg-icons': [
      'coffee',
      'magic',
      'trash-alt',
    ],
    'free-regular-svg-icons': 'all',
    'free-brands-svg-icons': 'all',
  };
};
```

The icon import must be added now into the file `app/font-awesome.js/ts` like in this example:

```ts
// app/font-awesome.ts
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCoffee,
  faMagic,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import * as freeRegularSvgIcons from '@fortawesome/free-regular-svg-icons';
import * as freeBrandSvgIcons from '@fortawesome/free-brands-svg-icons';

library.add(
  faCoffee,
  faMagic,
  faTrashAlt,
);

library.add(freeBrandSvgIcons['fab']); // option to import all icons of fab
library.add(freeRegularSvgIcons['far']); // option to import all icons of far
```

In your `app.js/ts` file you need to add this import

```ts
// app/app.ts
import './font-awesome';
```

Switching to this approach reduces maintenance costs for the addon while allowing you to use any newly released Font Awesome icon package without requiring updates to this addon.
Additionally, you no longer need to restart your Ember when adding new icons.

### Style

Previously, the addon automatically included the basic Font Awesome CSS styles.
With the v2 addon format, this behavior has been removed, meaning you must now manually import the styles into your project.

To do so, add the following lines to your `app.js/ts`:

```ts
// app/font-awesome.ts
import { config as faConfig } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

faConfig.autoAddCss = false;
```

You might wonder why we manually import the CSS and disable `faConfig.autoAddCss`.
1. The default value (`faConfig.autoAddCss = true`) does not work properly with [Fastboot](https://github.com/ember-fastboot/ember-cli-fastboot).
2. When using `autoAddCss`, styles are loaded too late, causing icons to appear incorrectly at app startup.


In previous versions (<3.0), this configuration was handled automatically within the addon. To avoid unwanted behavior, we recommend adding these lines explicitly to your project.


After making these changes, your `app/font-awesome.js/ts` and `app/app.js/ts` file should match the structure described in the [installation guide](https://github.com/FortAwesome/ember-fontawesome/tree/3.x?tab=readme-ov-file#installation)


### Glint support

If you are using [glint](https://typed-ember.gitbook.io/glint), you can set it up as described [here](https://github.com/FortAwesome/ember-fontawesome/tree/3.x?tab=readme-ov-file#glint)
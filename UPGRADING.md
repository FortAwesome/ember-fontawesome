# Upgrading Guide

See the [CHANGELOG.md](./CHANGELOG.md) for detailed information about what has changed between versions.

This guide is useful to figure out what you need to do between breaking changes.

As always, [submit issues](https://github.com/FortAwesome/ember-fontawesome/issues/new) that you run into with this guide or with these upgrades to us.

## 0.0.x to 0.1.0

### Renamed packages

The following packages have been renamed as part of 5.1.0 of Font Awesome.

_All packages are in the [@fortawesome NPM scope](https://www.npmjs.com/search?q=scope:fortawesome&page=1&ranking=optimal)_

| Old package(1)           | New package            |
|--------------------------|------------------------|
| fontawesome              | fontawesome-svg-core   |
| fontawesome-free-solid   | free-solid-svg-icons   |
| fontawesome-free-regular | free-regular-svg-icons |
| fontawesome-free-brands  | free-brands-svg-icons  |
| fontawesome-pro-solid    | pro-solid-svg-icons    |
| fontawesome-pro-regular  | pro-regular-svg-icons  |
| fontawesome-pro-light    | pro-light-svg-icons    |

(1) Old packages have now been deprecated. They are still available but will only receive high priority patch release fixes.

**You'll need to update your package.json file with the renamed packages and new versions.**

### Update your Ember CLI build script config

~~Old `ember-cli-build.js`:~~

```javascript
// ...
let app = new EmberApp(defaults, {
  // Add options here
  fontawesome: {
    icons: {
      'fontawesome-free-solid': 'all'
      'fontawesome-pro-light': [
        'faAdjust',
        'faAmbulance'
       ]
    }
})
```

New `ember-cli-build.js`:

```javascript
let app = new EmberApp(defaults, {
  // Add options here
  fontawesome: {
    icons: {
      'free-solid-svg-icons': 'all'
      'pro-light-svg-icons': [
        'faAdjust',
        'faAmbulance'
       ]
    }
})
```

### Mixed modes with automatic replacement of `<i>` tags to `<svg>`

If you were previously relying on Font Awesome to replace any `<i>` tags in
your page or app with `<svg>` you'll need to explicitly control that now.

```javascript
import Component from '@ember/component';
import { dom } from '@fortawesome/fontawesome-svg-core';
import { next } from '@ember/runloop';

export default Component.extend({
  /**
   * Convert `<i>` into SVG icons
   * Uses: https://fontawesome.com/how-to-use/with-the-api/methods/dom-i2svg
   */
  didRender() {
    this._super(...arguments);

    next(() => {
      if (this.element) {
        dom.i2svg({ node: this.element });
      }
    });
  }
});
```

<a href="https://fontawesome.com">
  <img align="right" width="100" height="100" alt="Official Javascript Component" src="https://img.fortawesome.com/349cfdf6/official-javascript-component.svg">
</a>

# ember-fontawesome (2.x)

[![npm](https://img.shields.io/npm/v/@fortawesome/ember-fontawesome.svg?style=flat-square)](https://www.npmjs.com/package/@fortawesome/ember-fontawesome)

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.28 or above
- Embroider or ember-auto-import v2

If you are using an older version of Ember, see [our 1.x branch](https://github.com/FortAwesome/ember-fontawesome/tree/1.x).

------------------------------------------------------------------------------

> Font Awesome Ember component using SVG with JS

<!-- toc -->

- [Introduction](#introduction)
  * [Upgrading Font Awesome?](#upgrading-font-awesome)
  * [Get started](#get-started)
  * [Learn about our new SVG implementation](#learn-about-our-new-svg-implementation)
  * [Upgrading From Previous Versions](#upgrading-from-previous-versions)
- [Installation](#installation)
  * [Add more styles or Pro icons](#add-more-styles-or-pro-icons)
  * [Subsetting icons](#subsetting-icons)
  * [Using within an addon](#using-within-an-addon)
- [Usage](#usage)
  * [Configuration](#configuration)
  * [Template](#template)
- [Features](#features)
  * [Basic](#basic)
  * [Advanced](#advanced)
- [How to Help](#how-to-help)
- [Contributors](#contributors)
- [Releasing this project (only project owners can do this)](#releasing-this-project-only-project-owners-can-do-this)
- [Contributing](#contributing)
- [License](#license)

<!-- tocstop -->

## Introduction

Hey there! We're glad you're here...

### Upgrading Font Awesome?

If you've used Font Awesome in the past (version 5 or older) there are some
things that you should learn before you dive in.

> https://docs.fontawesome.com/web/setup/upgrade

### Get started

This package is for integrating with Ember.js. If you aren't using Ember then it's
not going to help you. Head over to our "Get Started" page for some guidance.

> https://docs.fontawesome.com/web/setup/get-started

### Learn about our new SVG implementation

This package, under the hood, uses SVG with JS and the `@fortawesome/fontawesome-svg-core` library. This implementation differs drastically from
the web fonts implementation that was used in version 4 and older of Font Awesome. You might head over there to learn about how it works.

> https://docs.fontawesome.com/web/dig-deeper/svg-core

### Upgrading From Previous Versions

See [UPGRADING.md](./UPGRADING.md).

You might also be interested in the larger umbrella project [UPGRADING.md](https://github.com/FortAwesome/Font-Awesome/blob/master/UPGRADING.md)

## Installation

This project is an Ember addon. So we'll add that first:

```
$ ember install @fortawesome/ember-fontawesome @fortawesome/fontawesome-svg-core
```

We need at least one style. Let's start with the free version of Solid.

```
$ npm i --save-dev @fortawesome/free-solid-svg-icons
```

or with pnpm 

```
$ pnpm add -D @fortawesome/free-solid-svg-icons
```

or with Yarn

```
$ yarn add --dev @fortawesome/free-solid-svg-icons
```

After installation you need to setup Font Awesome in your `app.js/ts` by adding the setup section part like bellow.
After these changes your app file should look something like:

```ts
import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'app-name/config/environment';

// Start - Font Awesome setup
import { library, config as faConfig } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'; // This adds the basic icon styles into your app
import * as freeSolidIcons from '@fortawesome/free-solid-svg-icons';

// Disable auto CSS import into head. It solved the side effect for jumping icon size.
// This is required to for Fastboot apps, otherwise build failes
// It's the recommended way for setup Font Awesome in your app
faConfig.autoAddCss = false;

// option to import all icons from solid pack.
// If you want to import only a subset of icons from pack, see section "Subsetting icons"
library.add(freeSolidIcons['fas']);
// End - Font Awesome setup

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);
```

### Add more styles or Pro icons

Brands are separated into their own style and for customers upgrading from
version 4 to 5 we have a limited number of Regular icons available.

**Visit [fontawesome.com/icons](https://fontawesome.com/icons) to search for free and Pro icons**

```
$ npm i --save-dev @fortawesome/free-brands-svg-icons
$ npm i --save-dev @fortawesome/free-regular-svg-icons
```

Do this for each icon pack you'll use in your app. By default, all installed
icon packs will be bundled into `vendor.js`.

If you are a [Font Awesome Pro](https://fontawesome.com/pro) subscriber you can install Pro packages.

```
$ npm i --save-dev @fortawesome/pro-solid-svg-icons
$ npm i --save-dev @fortawesome/pro-regular-svg-icons
$ npm i --save-dev @fortawesome/pro-light-svg-icons
$ npm i --save-dev @fortawesome/pro-duotone-svg-icons
```

Using the Pro packages requires [additional configuration](https://fontawesome.com/docs/web/setup/packages).

### Subsetting icons

If you want to include only a subset of icons from an icon pack, you must import only the specific icons from pack and register them by using `libary.add()`.

The following example declares that all icons in
`free-solid-svg-icons` should be included in build,
and, only `adjust`, `ambulance`, and `pencil-alt` from `pro-light-svg-icons`
are to be included.

```ts
import * as freeSolidIcons from '@fortawesome/free-solid-svg-icons';
import {
  faAdjust,
  faAmbulance,
  faPencilAlt,
} from '@fortawesome/pro-light-svg-icons';

library.add(freeSolidIcons['fas']);

library.add(
  faAdjust,
  faAmbulance,
  faPencilAlt,
);
```

### Using within an addon

If you want to use icons in your addon there are a few steps to take.

First ensure `@fortawesome/ember-fontawesome`, `@fortawesome/fontawesome-svg-core` and any icon packs are in
the `peerDependency` section of your `package.json`. This requires the consumer app to install the necessary packages.

Second you need to declare in your setup documentation what icons you are using, so apps that subset icons
will know what to include. You can do this like bringing import example as explained in section "Subsetting icons"

You should avoid listing any Font Awesome Pro packages as dependencies unless you are confident that whoever is using your addon has access to those.

## Usage

### Configuration

Out of the box, icons will use the Solid style unless a prefix is manually specified.
To change the default to Regular or Light, add a `fontawesome` configuration object
to your application's `environment.js` and set the `defaultPrefix` option.

```js
module.exports = function(environment) {
  let ENV = {
    // Add options here
    fontawesome: {
      defaultPrefix: 'fal' // light icons
    }
  };
  // ...
  return ENV;
};
```

As a reminder, the free version of Font Awesome does not include a complete set of icons
for any style other than Solid, so this setting is recommended only for Pro subscribers.

### Template

This is what it would look like in your template:

```hbs
<FaIcon @icon="coffee" />
```

Without a prefix specified, the default specified in `environment.js` (or `fas`, if none set) is assumed:

```hbs
<FaIcon @icon="square" />
```

If you want to use an icon from any style other than the default, use `prefix=`.

```hbs
<FaIcon @icon="square" @prefix="far" />
```

## Features

The following features are available as part of Font Awesome. Note that the syntax is different from our general web-use documentation.

### Basic

[Size](https://fontawesome.com/v6/docs/web/style/size):

```hbs
<FaIcon @icon="coffee" @size="4x" />
```

[Fixed width](https://fontawesome.com/v6/docs/web/style/fixed-width):

```hbs
<FaIcon @icon="coffee" @fixedWidth={{true}} />
```

[Rotate](https://fontawesome.com/v6/docs/web/style/rotate):

```hbs
<FaIcon @icon="coffee" @rotation={{90}} />
<FaIcon @icon="coffee" @rotation={{180}} />
<FaIcon @icon="coffee" @rotation={{270}} />
```

Flip horizontally, vertically, or both:

```hbs
<FaIcon @icon="coffee" @flip="horizontal" />
<FaIcon @icon="coffee" @flip="vertical" />
<FaIcon @icon="coffee" @flip="both" />
```

Spin and pulse [animation](https://fontawesome.com/v6/docs/web/style/animate):

```hbs
<FaIcon @icon="coffee" @spin={{true}} />
```

[Border](https://fontawesome.com/v6/docs/web/style/pull#bordered-and-pulled-classes):

```hbs
<FaIcon @icon="coffee" @border={{true}} />
```

[Pull left or right](https://fontawesome.com/v6/docs/web/style/pull):

```hbs
<FaIcon @icon="coffee" @pull="left" />
<FaIcon @icon="coffee" @pull="right" />
```

### Advanced

[Power Transforms](https://fontawesome.com/v6/docs/web/style/power-transform):

```hbs
<FaIcon @icon="coffee" @transform="shrink-6 rotate-30" />
```

[Masking](https://fontawesome.com/v6/docs/web/style/mask):

```hbs
<FaIcon @icon="coffee" @transform="shrink-6"  @mask="circle" />
```

[Symbols](https://fontawesome.com/v6/docs/web/add-icons/svg-symbols):

```hbs
<FaIcon @icon="coffee" @symbol={{true}} />
```

[Layers](https://fontawesome.com/v6/docs/web/style/layer):

```html
<span class="fa-layers fa-lg">
  <FaIcon @icon="circle" />
  <FaIcon @icon="check" class="fa-inverse" @transform="shrink-6" />
</span>
```

[Layers text](https://fontawesome.com/v6/docs/web/style/layer):

```html
<span class="fa-layers fa-lg">
  <FaIcon @icon="circle" />
  <span class="fa-layers-text">8</span>
</span>
```

## How to Help

Review the following docs before diving in:

* [CONTRIBUTING.md](CONTRIBUTING.md)
* [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

And then:

1. Check the existing issue and see if you can help!

## Contributors

The following contributors have either helped to start this project, have contributed
code, are actively maintaining it (including documentation), or in other ways
being awesome contributors to this project. **We'd like to take a moment to recognize them.**

| Name              | GitHub                                                     |
| ----------------- | ---------------------------------------------------------- |
| Ilya Radchenko    | [@knownasilya](https://github.com/knownasilya)             |
| Jonathan Johnson  | [@jrjohnson](https://github.com/jrjohnson)                 |
| ember-tomster     | [@ember-tomster](https://github.com/ember-tomster)         |
| Julien Guimont    | [@juggy](https://github.com/juggy)                         |
| Xaser Acheron     | [@XaserAcheron](https://github.com/XaserAcheron)           |
| samcic            | [@samcic](https://github.com/samcic)                       |
| Josemar Luedke    | [@josemarluedke](https://github.com/josemarluedke)         |
| Robert Clancy     | [@robclancy](https://github.com/robclancy)                 |
| maxwondercorn     | [@maxwondercorn](https://github.com/maxwondercorn)         |
| Denis Toledo      | [@dnstld](https://github.com/dnstld)                       |
| mkszepp           | [@mkszepp](https://github.com/mkszepp)                     |
| davideferre       | [@davideferre](https://github.com/davideferre)             |
| st-h              | [@st-h](https://github.com/st-h)                           |
| stopfstedt        | [@st-h](https://github.com/stopfstedt)                     |
| Michael Rykov     | [@rykov](https://github.com/rykov)                         |
| Chris Manson      | [@mansona](https://github.com/mansona)                     |
| François de Metz  | [@francois2metz](https://github.com/francois2metz)         |
| NullVoxPopuli     | [@NullVoxPopuli](https://github.com/NullVoxPopuli)         |
| Font Awesome Team | [@FortAwesome](https://github.com/orgs/FortAwesome/people) |

If we've missed someone (which is quite likely) submit a Pull Request to us and we'll get it resolved.

## Releasing this project (only project owners can do this)

See [DEVELOPMENT.md](DEVELOPMENT.md#release)

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).

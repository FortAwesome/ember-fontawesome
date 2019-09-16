<a href="https://fontawesome.com">
  <img align="right" width="100" height="100" alt="Official Javascript Component" src="https://img.fortawesome.com/349cfdf6/official-javascript-component.svg">
</a>

# ember-fontawesome

[![npm](https://img.shields.io/npm/v/@fortawesome/ember-fontawesome.svg?style=flat-square)](https://www.npmjs.com/package/@fortawesome/ember-fontawesome)

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.4 or above
* Ember CLI v2.13 or above
* Node.js v8 or above

> Font Awesome 5 Ember component using SVG with JS

<!-- toc -->

- [Introduction](#introduction)
  * [Upgrading Font Awesome?](#upgrading-font-awesome)
  * [Get started](#get-started)
  * [Learn about our new SVG implementation](#learn-about-our-new-svg-implementation)
  * [Going from 0.0.x to 0.1.0](#going-from-00x-to-010)
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

If you've used Font Awesome in the past (version 4 or older) there are some
things that you should learn before you dive in.

> https://fontawesome.com/how-to-use/on-the-web/setup/upgrading-from-version-4

### Get started

This package is for integrating with Ember.js. If you aren't using Ember then it's
not going to help you. Head over to our "Get Started" page for some guidance.

> https://fontawesome.com/how-to-use/on-the-web/setup/getting-started

### Learn about our new SVG implementation

This package, under the hood, uses SVG with JS and the `@fortawesome/fontawesome-svg-core` library. This implementation differs drastically from
the web fonts implementation that was used in version 4 and older of Font Awesome. You might head over there to learn about how it works.

> https://fontawesome.com/how-to-use/on-the-web/advanced/svg-javascript-core

### Going from 0.0.x to 0.1.0

See [UPGRADING.md](./UPGRADING.md).

You might also be interested in the larger umbrella project [UPGRADING.md](https://github.com/FortAwesome/Font-Awesome/blob/master/UPGRADING.md)

## Installation

This project is an Ember addon. So we'll add that first:

```
$ ember install @fortawesome/ember-fontawesome
```

We need at least one style. Let's start with the free version of Solid.

```
$ npm i --save-dev @fortawesome/free-solid-svg-icons
```

or with Yarn

```
$ yarn add --dev @fortawesome/free-solid-svg-icons
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
icon packs will be bundled into `vendor.js` and also added to the Font Awesome
library (i.e. `library.add()`)

If you are a [Font Awesome Pro](https://fontawesome.com/pro) subscriber you can install Pro packages.

```
$ npm i --save-dev @fortawesome/pro-solid-svg-icons
$ npm i --save-dev @fortawesome/pro-regular-svg-icons
$ npm i --save-dev @fortawesome/pro-light-svg-icons
```
**Duotone icons are currently in pre-release and are coming soon to this component.**

Using the Pro packages requires [additional configuration](https://fontawesome.com/how-to-use/on-the-web/setup/using-package-managers).

### Subsetting icons

If you want to include only a subset of icons from an icon pack, add a
`fontawesome` configuration object to your applications options in
`environment.js`. The following example declares that all icons in
`free-solid-svg-icons` should be included in the `vendor.js` bundle and
added to the library, and for `pro-light-svg-icons`, only `adjust`,
`ambulance`, and `pencil-alt` are to be included in the bundle and added to the library.

```js
module.exports = function(environment) {
  let ENV = {
    // Add options here
    fontawesome: {
      icons: {
        'free-solid-svg-icons': 'all',
        'pro-light-svg-icons': [
          'adjust',
          'ambulance',
          'pencil-alt'
        ]
      }
    }
  };
  // ...
  return ENV;
};
```

By default, `ember-fontawesome` will warn if no icons are being included
in the build. To disable this behavior (e.g. if icons are being added by
some other means), set `warnIfNoIconsIncluded` to `false`.


```js
let ENV = {
  fontawesome: {
    warnIfNoIconsIncluded: false,
    // ...
  }
};
```

### Using within an addon

If you want to use icons in your addon there are a few steps to take.

First ensure `@fortawesome/ember-fontawesome` and any icon packs are in
the `dependencies` section of your `package.json`. This makes them available
to the apps that use your addon.

Second you need to declare what icons you are using so apps that subset icons
will know what to include. You do this in `config/icons.js`. The format is:

```js
module.exports = function() {
  return {
    'free-solid-svg-icons': ['bacon', 'pencil'],
    'free-brands-svg-icons': ['font-awesome-flag'],
  };
};
```

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
All examples use angle bracket invocation available in Ember 3.4+. Using Ember's classic component invocation the example above would be:

```hbs
{{fa-icon "coffee"}}
```
For details see [Angle Bracket Syntax](https://guides.emberjs.com/release/reference/syntax-conversion-guide/#toc_angle-bracket-syntax) in the Ember documentation.

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

[Size](https://fontawesome.com/how-to-use/on-the-web/styling/sizing-icons):

```hbs
<FaIcon @icon="coffee" @size="4x" />
```

[Fixed width](https://fontawesome.com/how-to-use/on-the-web/styling/fixed-width-icons):

```hbs
<FaIcon @icon="coffee" @fixedWidth={{true}} />
```

[Rotate](https://fontawesome.com/how-to-use/on-the-web/styling/rotating-icons):

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

Spin and pulse [animation](https://fontawesome.com/how-to-use/on-the-web/styling/animating-icons):

```hbs
<FaIcon @icon="coffee" @spin={{true}} />
```

[Border](https://fontawesome.com/how-to-use/on-the-web/styling/bordered-pulled-icons):

```hbs
<FaIcon @icon="coffee" @border={{true}} />
```

[Pull left or right](https://fontawesome.com/how-to-use/on-the-web/styling/bordered-pulled-icons):

```hbs
<FaIcon @icon="coffee" @pull="left" />
<FaIcon @icon="coffee" @pull="right" />
```

### Advanced

[Power Transforms]((https://fontawesome.com/how-to-use/on-the-web/styling/power-transforms)):

```hbs
<FaIcon @icon="coffee" @transform="shrink-6 rotate-30" />
```

[Masking](https://fontawesome.com/how-to-use/on-the-web/styling/masking):

```hbs
<FaIcon @icon="coffee" @transform="shrink-6"  @mask="circle" />
```

[Symbols](https://fontawesome.com/how-to-use/on-the-web/advanced/svg-symbols):

```hbs
<FaIcon @icon="coffee" @symbol={{true}} />
```

[Layers](https://fontawesome.com/how-to-use/on-the-web/styling/layering):

```html
<span class="fa-layers fa-lg">
  <FaIcon @icon="circle" />
  <FaIcon @icon="check" class="fa-inverse" @transform="shrink-6" />
</span>
```

[Layers text](https://fontawesome.com/how-to-use/on-the-web/styling/layering):

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

|                                                            | Name             | GitHub                                             |
| :--------------------------------------------------------: | ---------------- | -------------------------------------------------- |
| <img src="https://github.com/knownasilya.png?size=72" />   | Ilya Radchenko   | [@knownasilya](https://github.com/knownasilya)     |
| <img src="https://github.com/jrjohnson.png?size=72" />     | Jonathan Johnson | [@jrjohnson](https://github.com/jrjohnson)         |
| <img src="https://github.com/ember-tomster.png?size=72" /> | ember-tomster    | [@ember-tomster](https://github.com/ember-tomster) |
| <img src="https://github.com/juggy.png?size=72" />         | Julien Guimont   | [@juggy](https://github.com/juggy)                 |
| <img src="https://github.com/XaserAcheron.png?size=72" />  | Xaser Acheron    | [@XaserAcheron](https://github.com/XaserAcheron)   |
|                                                            | samcic           | [@samcic](https://github.com/samcic)               |
| <img src="https://github.com/josemarluedke.png?size=72" /> | Josemar Luedke   | [@josemarluedke](https://github.com/josemarluedke) |
| <img src="https://github.com/robclancy.png?size=72" />     | Robert Clancy    | [@robclancy](https://github.com/robclancy)         |
| <img src="https://github.com/maxwondercorn.png?size=72" /> | maxwondercorn    | [@maxwondercorn](https://github.com/maxwondercorn)         |
| <img src="https://github.com/dnstld.png?size=72" />        | Denis Toledo     | [@dnstld](https://github.com/dnstld)         |

If we've missed someone (which is quite likely) submit a Pull Request to us and we'll get it resolved.

The Font Awesome team:

|                                                            | Name           | GitHub                                             |
| :--------------------------------------------------------: | -------------- | -------------------------------------------------- |
| <img src="https://github.com/supercodepoet.png?size=72" /> | Travis Chase   | [@supercodepoet](https://github.com/supercodepoet) |
| <img src="https://github.com/robmadole.png?size=72" />     | Rob Madole     | [@robmadole](https://github.com/robmadole)         |
| <img src="https://github.com/mlwilkerson.png?size=72" />   | Mike Wilkerson | [@mlwilkerson](https://github.com/mlwilkerson)     |
| <img src="https://github.com/talbs.png?size=72" />         | Brian Talbot   | [@talbs](https://github.com/talbs)                 |

## Releasing this project (only project owners can do this)

See [DEVELOPMENT.md](DEVELOPMENT.md#release)

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).

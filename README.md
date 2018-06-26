<a href="https://fontawesome.com">
  <img align="right" width="100" height="100" alt="Official Javascript Component" src="https://img.fortawesome.com/349cfdf6/official-javascript-component.svg">
</a>

# ember-fontawesome

[![npm](https://img.shields.io/npm/v/@fortawesome/ember-fontawesome.svg?style=flat-square)](https://www.npmjs.com/package/@fortawesome/ember-fontawesome)

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
- [Usage](#usage)
  * [Template](#template)
  * [Icon objects](#icon-objects)
- [Features](#features)
  * [Basic](#basic)
  * [Advanced](#advanced)
- [Contributing to Development](#contributing-to-development)
  * [Running](#running)
  * [Running Tests](#running-tests)
  * [Building](#building)

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

Using the Pro packages requires [additional configuration](https://fontawesome.com/how-to-use/on-the-web/setup/using-package-managers).

### Subsetting icons

If you want to include only a subset of icons from an icon pack, add a
`fontawesome` configuration object to your applications options in
`ember-cli-build.js`. The following example declares that all icons in
`free-solid-svg-icons` should be included in the `vendor.js` bundle add
added to the library, and for `pro-light-svg-icons`, only `adjust`,
`ambulance`, and `pencil-alt` are to be included in the bundle and added to the library.

```
// ...
let app = new EmberApp(defaults, {
  // Add options here
  fontawesome: {
    icons: {
      'free-solid-svg-icons': 'all'
      'pro-light-svg-icons': [
        'adjust',
        'ambulance',
        'pencil-alt'
       ]
    }
})
```

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

This is what it can look like in your template:

```hbs
{{fa-icon 'coffee'}}
```

Without a prefix specified, the default specified in `environment.js` (or `fas`, if none set) is assumed:

```hbs
{{fa-icon 'square'}}
```

If you want to use an icon from any style other than the default, use `prefix=`.

```hbs
{{fa-icon 'square' prefix='far'}}
```

## Features

The following features are available as part of Font Awesome. Note that the syntax is different from our general web-use documentation.

### Basic

[Size](https://fontawesome.com/how-to-use/on-the-web/styling/sizing-icons):

```hbs
{{fa-icon 'coffee' size='4x'}}
```

[Fixed width](https://fontawesome.com/how-to-use/on-the-web/styling/fixed-width-icons):

```hbs
{{fa-icon 'coffee' fixedWidth=true}}
```

[Rotate](https://fontawesome.com/how-to-use/on-the-web/styling/rotating-icons):

```hbs
{{fa-icon 'coffee' rotation=90}}
{{fa-icon 'coffee' rotation=180}}
{{fa-icon 'coffee' rotation=270}}
```

Flip horizontally, vertically, or both:

```hbs
{{fa-icon 'coffee' flip='horizontal'}}
{{fa-icon 'coffee' flip='vertical'}}
{{fa-icon 'coffee' flip='both'}}
```

Spin and pulse [animation](https://fontawesome.com/how-to-use/on-the-web/styling/animating-icons):

```hbs
{{fa-icon 'coffee' spin=true}}
```

[Border](https://fontawesome.com/how-to-use/on-the-web/styling/bordered-pulled-icons):

```hbs
{{fa-icon 'coffee' border=true}}
```

[Pull left or right](https://fontawesome.com/how-to-use/on-the-web/styling/bordered-pulled-icons):

```hbs
{{fa-icon 'coffee' pull='left'}}
{{fa-icon 'coffee' pull='right'}}
```

### Advanced

[Power Transforms]((https://fontawesome.com/how-to-use/on-the-web/styling/power-transforms)):

```hbs
{{fa-icon 'coffee' transform='shrink-6 rotate-30'}}
```

[Masking](https://fontawesome.com/how-to-use/on-the-web/styling/masking):

```hbs
{{fa-icon 'coffee' transform='shrink-6' mask='circle'}}
```

[Symbols](https://fontawesome.com/how-to-use/on-the-web/advanced/svg-symbols):

```hbs
{{fa-icon 'coffee' symbol=true}}
```

[Layers](https://fontawesome.com/how-to-use/on-the-web/styling/layering):

```html
<span class="fa-layers fa-lg">
  {{fa-icon 'circle'}}
  {{fa-icon class='fa-inverse' 'check' transform='shrink-6'}}
</span>
```

[Layers text](https://fontawesome.com/how-to-use/on-the-web/styling/layering):

```html
<span class="fa-layers fa-lg">
  {{fa-icon 'circle'}}
  <span class="fa-layers-text">8</span>
</span>
```

## Contributing to Development

* `git clone <repository-url>` this repository
* `cd ember-fontawesome`
* `npm install`

### Running

* `ember serve`
* View the demo app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `npm test` (Runs `ember try:each` to test addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

### Publishing a release

1. Edit `package.json` and update the version number
1. Add new contributors to the `contributors` section
1. Update the `CHANGELOG.md`
1. `npm run build` and `npm test`
1. `npm publish`
1. `git add . && git commit -m 'Release VERSION'`
1. `git push`
1. Create a [new release](https://github.com/FortAwesome/ember-fontawesome/releases/new) with `CHANGELOG` details

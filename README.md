# ember-fontawesome

[![npm](https://img.shields.io/npm/v/@fortawesome/ember-fontawesome.svg?style=flat-square)](https://www.npmjs.com/package/@fortawesome/ember-fontawesome)

> Font Awesome 5 Vue component using SVG with JS

Hey there! We're glad you're here...

#### Upgrading Font Awesome?

If you've used Font Awesome in the past (version 4 or older) there are some
things that you should learn before you dive in.

> https://fontawesome.com/how-to-use/upgrading-from-4

#### Get started

This package is for integrating with Ember.js. If you aren't using Ember then it's
not going to help you. Head over to our "Get Started" page for some guidance.

> https://fontawesome.com/get-started

#### Learn about our new SVG implementation

This package, under the hood, uses SVG with JS and the `@fortawesome/fontawesome-svg-core` library. This implementation differs drastically from
the web fonts implementation that was used in version 4 and older of Font Awesome. You might head over there to learn about how it works.

> https://fontawesome.com/how-to-use/svg-with-js

#### Going from 0.0.x to 0.1.0

See [UPGRADING.md](./UPGRADING.md).

You might also be interested in the larger umbrella project [UPGRADING.md](https://github.com/FortAwesome/Font-Awesome/blob/master/UPGRADING.md)

## Installation

This project is an Ember addon. So we'll add that first:

```
$ ember install @fortawesome/ember-fontawesome
```

We need at least one style. Let's start with the free version of Solid.

```
$ npm i --save @fortawesome/free-solid-svg-icons
```

## Add more styles or Pro icons

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

Using the Pro packages requires [additional configuration](https://fontawesome.com/how-to-use/js-component-packages).

## or with Yarn

```
$ yarn add --dev @fortawesome/fontawesome-svg-core
$ yarn add --dev @fortawesome/free-solid-svg-icons
```

## Subsetting icons

If you want to include only a subset of icons from an icon pack, add a
`fontawesome` configuration object to your applications options in
`ember-cli-build.js`. The following example declares that all icons in
`free-solid-svg-icons` should be included in the `vendor.js` bundle add
added to the library, and for `pro-light-svg-icons`, only `faAdjust` and
`faAmbulance` are to be included in the bundle and added to the library.

```
// ...
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

## Usage

The following features are available as [part of Font Awesome](https://fontawesome.com/how-to-use/svg-with-js).

This is what it can look like in your template:

```hbs
{{fa-icon 'coffee'}}
```

Without a prefix specified, the default `fas` is assumed:

```hbs
{{fa-icon 'square'}}
```

If you need to distinguish styles between two different icons of the same name
that have both been added to the library, use `prefix=`.

```hbs
{{fa-icon 'square' prefix='far'}}
```

You can also import the icon objects from the icon packs and make them
available to your templates.

```js
import Controller from '@ember/controller'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

export default Controller.extend({
  faCoffee,
  // ...
});
```

Then in a template:

```hbs
{{fa-icon faCoffee}}
```

This object knows its own prefix, by the way, so it wouldn't be necessary to
use `prefix=` for disambiguation.

Make it fancier with a mask:

```hbs
{{fa-icon 'circle' transform='shrink-9 right-4' mask=faSquare}}
```

Spin and pulse animation:

```hbs
{{fa-icon 'coffee' spin=true}}
```

Fixed width:

```hbs
{{fa-icon 'coffee' fixedWidth=true}}
```

Border:

```hbs
{{fa-icon 'coffee' border=true}}
```

Flip horizontally, vertically, or both:

```hbs
{{fa-icon 'coffee' flip='horizontal'}}
{{fa-icon 'coffee' flip='vertical'}}
{{fa-icon 'coffee' flip='both'}}
```

Size:

```hbs
{{fa-icon 'coffee' size='4x'}}
```

Rotate:

```hbs
{{fa-icon 'coffee' rotation=90}}
{{fa-icon 'coffee' rotation=180}}
{{fa-icon 'coffee' rotation=270}}
```

Pull left or right:

```hbs
{{fa-icon 'coffee' pull='left'}}
{{fa-icon 'coffee' pull='right'}}
```

Power Transforms:

```hbs
{{fa-icon 'coffee' transform='shrink-6 rotate-30'}}
```

Masking:

```hbs
{{fa-icon 'coffee' transform='shrink-6' mask=faCircle}}
```

Symbols:

```hbs
{{fa-icon 'coffee' symbol=true}}
```

Layers:

```html
<span class="fa-layers fa-lg">
  {{fa-icon 'circle'}}
  {{fa-icon class='fa-inverse' 'check' transform='shrink-6'}}
</span>
```

Layers text:

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

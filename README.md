# ember-fontawesome

## Here Be Dragons

This Ember addon for Font Awesome 5 is currently a work-in-progress, not yet ready for production usage.

We welcome testers and developers help us get it ready for prime time by installing, testing and submitting PRs.

# Usage

This is what it can look like in your template:

```hbs
{{fa-icon 'coffee'}}
```

To support that use, you'd need to:

1. `ember install @fortawesome/ember-fontawesome`

1. `yarn add @fortawesome/free-solid-svg-icons` (or `npm install ...`). 
Do this for each icon pack you'll use in your app. By default, all installed icon packs will be bundled into
`vendor.js` and also added to the Font Awesome library (i.e. `library.add()`)

(NOTE: As of Feb 14, 2018 it's best to use the 5.1 prereleases of the icon packs, since you're already living
on the edge. So, `yarn add @fortawesome/free-solid-svg-icons@5.1.0-4`)

1. If you want to include only a subset of icons from an icon pack, add a `fontawesome` configuration 
object to your applications options in `ember-cli-build.js`. The following example declares that all 
icons in fontawesome-free-solid should be included in the vendor.js bundle add added to the library,
and for fontawesome-pro-light, only faAdjust and faAmbulance are to be included in the bundle and added to the library.

```
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

Without a prefix specified, the default `fas` is assumed:

```hbs
{{fa-icon 'square'}}
```

If you need to distinguish styles between two different icons of the same name that have both
been added to the library, use `prefix=`. 

```hbs
{{fa-icon 'square' prefix='far'}}
```

You can also import the icon objects from the icon packs and make them available to your templates.

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

This object knows its own prefix, by the way, so it wouldn't be necessary to use `prefix=` for disambiguation.

Make it fancier with a mask:

```hbs
{{fa-icon 'circle' transform='shrink-9 right-4' mask=faSquare}}
```

# More Documentation

We'll be filling out this documentation iteratively and incrementally. Hopefully the above gives you a jumpstart.

If you are willing to do some translation between JavaScript frameworks, there's more relevant documentation over on our [React component](https://github.com/FortAwesome/react-fontawesome/blob/master/README.md). The conceptual pattern is similar (such as using the icon library), though the syntax will vary (such as using handlebars syntax in Ember templates instead of JSX in React).

# Contributing to Development

* `git clone <repository-url>` this repository
* `cd ember-fontawesome`
* `npm install`

## Running

* `ember serve`
* View the demo app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

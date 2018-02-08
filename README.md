# ember-fontawesome

## Here Be Dragons

This Ember addon for Font Awesome 5 is currently a work-in-progress, not yet ready for production usage.

We welcome testers and developers help us get it ready for prime time by installing, testing and submitting PRs.

# Usage

This is what it can look like in your template:

```
{{fa-icon icon=faCoffee}}
```

To support that use, you'd need to have made a `faCoffee` object available to your template from a controller. 
Or, you could reference an icon by its name as a string like this...
```
{{fa-icon icon='square'}}
```
...after adding the icon object to the library, such as in a controller like this:
```
import fontawesome from '@fortawesome/fontawesome'
import fas from '@fortawesome/fontawesome-free-solid'

// Make some of our icons available by their names as strings by adding them to the library
fontawesome.library.add(
  fas.faSquare,
  // ..., etc.
)
```

Make it fancier with a mask:
```
{{fa-icon icon='circle' transform="shrink-9 right-4" mask=faSquare}}
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

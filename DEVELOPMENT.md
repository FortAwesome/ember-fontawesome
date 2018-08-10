# Developing Ember Fontawesome

## Tasks

The following commands are available through `npm run`

Command  | Purpose
-------- | -----------------------------------------------------------------
build    | Build this project
lint:js  | Check linting using ESLint
start    | Starts `ember serve`
test     | Test on the latest stable version of Ember
test:all | Test all supported versions as specified in `config/ember-try.js`

## Releasing a new version
<a name="release"></a>

1. Edit `package.json` and update the version number
1. Add new contributors to the `contributors` section
1. Update the `CHANGELOG.md`
1. `npm run build` and `npm run test:all`
1. `npm publish`
1. `git add . && git commit -m 'Release VERSION'`
1. `git push`
1. Create a [new release](https://github.com/FortAwesome/ember-fontawesome/releases/new) with `CHANGELOG` details

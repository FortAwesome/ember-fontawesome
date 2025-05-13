# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

---

## [3.0.1](https://github.com/FortAwesome/ember-fontawesome/releases/tag/3.0.1) - 2025-05-13

### Added
* Note for tree-shaking issue in docs with ember classic

### Fixed
* Remove `ember-source` as peerDependency


## [3.0.0](https://github.com/FortAwesome/ember-fontawesome/releases/tag/3.0.0) - 2025-02-11

### Changed
* Convert addon to an ember v2 addon
* Convert addon to TypeScript & add glint support
* Switch component into strict mode
* Move `@fortawesome/fontawesome-svg-core` to peerDependencies
* Install fastboot package in test-app, so that we are save that it works also inside fastboot apps

### Removed
* Drop support for `enableExperimentalBuildTimeTransform` (it was never documented)
* Option `warnIfNoIconsIncluded` as it was used only in build time code (index.js) which doesn't exists in v2 addons
* Remove `config/icons.js` (you need to setup in app.js/ts, see migration process)

### Fixed
* Re-add support for ember v3.28

---

For upgrading see [here](https://github.com/FortAwesome/ember-fontawesome/blob/3.x/UPGRADING.md)

---

Previous 2.x CHANGELOG is available [here](https://github.com/FortAwesome/ember-fontawesome/blob/2.x/CHANGELOG.md)

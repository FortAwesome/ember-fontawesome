# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

---
## [3.0.0](https://github.com/FortAwesome/ember-fontawesome/releases/tag/3.0.0) - 2025-02-03

### Changed
* Completely re-worked using Ember Addon blueprint
* Move FaIcon component to addon folder and old test-filed into test-app (we don't need anymore the rest)
* Convert addon to TypeScript & glint
* Change icon import logic like it is in angular or vue package of FA
* Install fastboot package in test-app, so that we are save that it works also inside fastboot apps (this was never tested since now)

### Fixed
* Re-add support for ember v3.28

---

Previous 2.x CHANGELOG available https://github.com/FortAwesome/ember-fontawesome/blob/2.x/CHANGELOG.md

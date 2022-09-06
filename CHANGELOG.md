# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

---
## [0.4.1](https://github.com/FortAwesome/ember-fontawesome/releases/tag/0.4.1) - 2022-09-06

### Added
* Support new features for Font Awesome Sharp Solid 6.2.0

### Changed
* Re-worked some of the module loading to support renames of ES modules from *.es.js to *.mjs

---
## [0.4.0](https://github.com/FortAwesome/ember-fontawesome/releases/tag/0.4.0) - 2022-06-24

### Added
* Uses the new @fortawesome/fontawesome-svg-core parse.icon() function to support icon aliases making it easier to upgrade from version 5 to 6 of Font Awesome

### Fixed
* This release bumps the minor version to 4 because we introduced breaking changes that became disruptive in 0.3.3.

---
## [0.3.3](https://github.com/FortAwesome/ember-fontawesome/releases/tag/0.3.3) - 2022-05-20

### Fixed
* Remove surrounding whitespace around icon #204
* Update ember-get-config to version 2

---
## [0.3.2](https://github.com/FortAwesome/ember-fontawesome/releases/tag/0.3.2) - 2022-02-10

### Fixed
* Removes prefixing behaviour before numbers #200

---
## [0.3.1](https://github.com/FortAwesome/ember-fontawesome/releases/tag/0.3.1) - 2022-01-27

### Fixed
* Bug getting the viewBox #197

---
## [0.3.0](https://github.com/FortAwesome/ember-fontawesome/releases/tag/0.3.0) - 2022-01-18

### Added
* Embroider support

### Changed
* Update Ember CLI to 3.28.2
* Update ember-get-config to 1.0.0
* Update to webpack 5
* Octaneify FaIcon Component

### Fixed
* Remove deprecation warning for `assign`

---
## [0.2.3](https://github.com/FortAwesome/ember-fontawesome/releases/tag/0.2.3) - 2021-02-16

### Fixed
* Package dependency upgrades #161 #162 #163
* Fix deprecated htmlSafe #165

---
## [0.2.2](https://github.com/FortAwesome/ember-fontawesome/releases/tag/0.2.2) - 2020-09-10

### Changed
* Dropping support for Node version 8 (version 10 or greater required) #139
* Passing the icon as a position param is deprecated and will be removed in v1.0.0 #130
* Prefer icons.js for subsetting icons #121

### Fixed
* Removed usage of getWithDefault() #155

---
## [0.2.1](https://github.com/FortAwesome/ember-fontawesome/releases/tag/0.2.1) - 2019-09-19

### Fixed
* "Expected identifier" error in Internet Explorer #126

---
## [0.2.0](https://github.com/FortAwesome/ember-fontawesome/releases/tag/0.2.0) - 2019-09-15

### Changed
* Convert docs to Angle bracket examples #109
* Add RFC warning see #117
* [BREAKING] Add focusable attribute which defaults to false #113

### Fixed
* Custom icon classes inserted 3 times #98
* Styles are duplicated #97

---
## [0.1.14](https://github.com/FortAwesome/ember-fontawesome/releases/tag/0.1.14) - 2019-06-28

### Changed
* Update to ember-cli 3.10
* Minimum Node requirement changed to version >= 8

---
## [0.1.13](https://github.com/FortAwesome/ember-fontawesome/releases/tag/0.1.13) - 2019-02-21

### Fixed
* Error when an addon doesn't have a root #95

---
## [0.1.12](https://github.com/FortAwesome/ember-fontawesome/releases/tag/0.1.12) - 2019-02-20

### Added
* Allow Addons to Add Icons to the Build #91

---
## [0.1.11](https://github.com/FortAwesome/ember-fontawesome/releases/tag/0.1.11) - 2019-02-19

### Fixed
* Fix issue with build time transform in nested addons #93

---
## [0.1.10](https://github.com/FortAwesome/ember-fontawesome/releases/tag/0.1.10) - 2019-02-18

### Added
* Improved automatic replacement documentation #88

### Fixed
* Add yarn workspace support #92
* Updated dependencies #89

---
## [0.1.9](https://github.com/FortAwesome/ember-fontawesome/releases/tag/0.1.9) - 2018-12-03

### Added
* Allow users to opt out of the no-icons warning #84

### Fixed
* Remove this.attrs check #78
* Update ember-cli and blueprints to 3.4.3 #83

---
## [0.1.8](https://github.com/FortAwesome/ember-fontawesome/releases/tag/0.1.8) - 2018-10-02

### Fixed
* Removed dev dependencies from regular dependencies #76

---
## [0.1.7](https://github.com/FortAwesome/ember-fontawesome/releases/tag/0.1.7) - 2018-09-17

### Fixed
* Bind string like objects to title #74

## [0.1.6](https://github.com/FortAwesome/ember-fontawesome/releases/tag/0.1.6) - 2018-09-13

### Fixed
* Put title in the right place #72
* Remove old export #73

## [0.1.5](https://github.com/FortAwesome/ember-fontawesome/releases/tag/0.1.5) - 2018-08-23

### Fixed
*  Remove some extra white space #70

### Added
*  Bind the title attribute #71 

---

## [0.1.4](https://github.com/FortAwesome/ember-fontawesome/releases/tag/0.1.4) - 2018-08-22

### Fixed
*  Inconsistency in configuration #57
*  Build time component doesn't use defaultPrefix #65 

---

## [0.1.3](https://github.com/FortAwesome/ember-fontawesome/releases/tag/0.1.3) - 2018-08-10

### Fixed
* Remove deprecated Ember.logger #64

---

## [0.1.2](https://github.com/FortAwesome/ember-fontawesome/releases/tag/0.1.2) - 2018-07-30

### Fixed
* Object.assign not available in IE11 #61

---

## [0.1.1](https://github.com/FortAwesome/ember-fontawesome/releases/tag/0.1.1) - 2018-07-16

### Changed
* Routine deps updates, ember-cli 3.2.0, node v10 support

---

## [0.1.0](https://github.com/FortAwesome/ember-fontawesome/releases/tag/0.1.0) - 2018-06-20

### Added
* Initial stable, production-ready release of angular-fontawesome

---

## [0.1.0-8](https://github.com/FortAwesome/ember-fontawesome/releases/tag/0.1.0-8) - 2018-05-25

### Added
* Ability to specify the default prefix in the configuration #35 #49

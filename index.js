'use strict';
var broccoliSource = require('broccoli-source')
var UnwatchedDir = broccoliSource.UnwatchedDir
var MergeTrees = require('broccoli-merge-trees')
var Rollup = require('broccoli-rollup')
var resolve = require('rollup-plugin-node-resolve')
var FontAwesomePack = require('./vendor/broccoli-fontawesome-pack')
var FontAwesomeAutoLibrary = require('./vendor/broccoli-fontawesome-auto-library')
var glob = require('glob')
var buildAstTransform = require('./lib/ast-transform');
const { discoverConfiguredIcons, combineIconSets } = require('./lib/discover-configured-icons');
var writeFile = require('broccoli-file-creator');
const { config, dom } = require('@fortawesome/fontawesome-svg-core');
const path = require('path');
const findWorkspaceRoot = require('find-yarn-workspace-root');

module.exports = {
  name: require('./package').name,
  fontawesomeConfig: null,
  _nodeModulesPath: null,

  treeForVendor(vendorTree) {
    const iconRollups = []
    const pathToCore = path.join(this._nodeModulesPath, '@fortawesome', 'fontawesome-svg-core');

    Object.keys(this.fontawesomeConfig.icons).forEach(pack => {
      const iconExportsFile = `exports-${pack}.js`
      const iconPackTree = new FontAwesomePack(
        [new UnwatchedDir(pathToCore)],
        {
          pack,
          icons: this.fontawesomeConfig.icons[pack],
          output: iconExportsFile
        }
      )
      const rolledIconPackFile = `${pack}.js`
      const rollupNode = new Rollup(iconPackTree, {
        rollup: {
          input: iconExportsFile,
          output: {
            file: rolledIconPackFile,
            format: 'amd',
            interop: false,
            amd: {
              id:`@fortawesome/${pack}`
            }
          },
          plugins: [
            resolve()
          ]
        },
        nodeModulesPath: this._nodeModulesPath,
        name: `${pack}-rollup`
      })
      iconRollups.push(rollupNode)
    })

    const fontawesomeRollup = new Rollup(new UnwatchedDir(pathToCore), {
      rollup: {
        input: 'index.es.js',
        output: {
          file: 'fontawesome.js',
          exports: 'named',
          format: 'amd',
          amd: {
            id:'@fortawesome/fontawesome-svg-core'
          }
        },
        plugins: [
          resolve()
        ]
      },
      nodeModulesPath: this._nodeModulesPath,
      name: 'fontawesome-svg-core'
    })

    const autoLibraryNode = new FontAwesomeAutoLibrary([], {
      icons: this.fontawesomeConfig.icons,
      output: 'autoLibrary.js'
    })

    const fontawesomeStyles = writeFile('fontawesome.css', dom.css());

    return new MergeTrees([
      vendorTree,
      fontawesomeRollup,
      autoLibraryNode,
      ...iconRollups,
      fontawesomeStyles
    ]);
  },

  /**
   * Read the configuration from `ember-cli-build` and `environment.js`
   * and combine them with defaults to arrive at a complete configuration
   *
   * This work can't be done in the ember-cli `config` hook because it is run
   * after `included` in some cases.
   */
  readConfig() {
    const config = this.app.project.config();
    const appConfig = config['fontawesome'] || {};
    const configDefaults = {
      enableExperimentalBuildTimeTransform: false,
      icons: {},
      defaultPrefix: 'fas',
    };
    let buildConfig = {};

    let addonOptions = (this.parent && this.parent.options) || (this.app && this.app.options) || {};
    if ('fontawesome' in addonOptions) {
      this.ui.writeWarnLine(`fontawesome is no longer configured in 'ember-cli-build.js'.
      All configuration should be moved to 'environment.js'.
      See https://github.com/FortAwesome/ember-fontawesome#subsetting-icons for details.
      `);
      buildConfig = addonOptions.fontawesome;
    }
    const mergedConfig = Object.assign(configDefaults, buildConfig, appConfig);
    const configuredIcons = discoverConfiguredIcons(this.app.project);
    mergedConfig.icons = combineIconSets(mergedConfig.icons, configuredIcons);

    this.fontawesomeConfig = mergedConfig;
  },

  includeIconPackages() {
    // 1. start with the host app configuration
    // 2. If no icons are defined, automatically configure whatever is there under node_modules
    // @TODO: look for any addons contributing config. maybe enumerated in this.app.options.addons
    if (Object.keys(this.fontawesomeConfig.icons).length === 0) {
      const iconPattern = path.join(this._nodeModulesPath, '@fortawesome', '@(free|pro)-*-svg-icons');
      glob.sync(iconPattern)
        .map(i => i.split('/').pop())
        .reduce((acc, cur) => {
          acc.icons[cur] = 'all'
          return acc
        }, this.fontawesomeConfig);
    }

    if(Object.keys(this.fontawesomeConfig.icons).length === 0 && this.fontawesomeConfig.warnIfNoIconsIncluded !== false) {
      this.ui.writeWarnLine(
        'No icons are included in your build configuration.\n'+
        'Any icon packs you install under node_modules will be bundled into vendor.js\n'+
        'and added to the icon library by default.\n\n'+
        "For example, 'npm install --save-dev @fortawesome/free-solid-svg-icons' would add all of the icons in that pack.\n\n"+
        'To declare a subset of icons, after adding some icon packs as shown above,\n'+
        'modify your ember-cli-build.js and add a fontawesome config object.\n'+
        'The following example declares that all icons in free-solid-svg-icons should be\n'+
        'included in the vendor.js bundle add added to the library,\n'+
        'and for pro-light-svg-icons, only faAdjust and faAmbulance are to be included in the\n'+
        'bundle and added to the library.\n'+
        '// ...\n'+
        'let app = new EmberApp(defaults, {\n'+
        '  // Add options here\n'+
        '  fontawesome: {\n'+
        '    icons: {\n'+
        "      'free-solid-svg-icons': 'all'\n"+
        "      'pro-light-svg-icons': [\n"+
        "        'adjust',\n"+
        "        'ambulance'\n"+
        '       ]\n'+
        '    }\n'+
        '});'
      )
    }
  },
  included(app) {
    this._super.included.apply(this, arguments)
    const originalApp = app;
    let current = this;
    // Keep iterating upward until we don't have a grandparent.
    // Has to do this grandparent check because at some point we hit the project.
    do {
      app = current.app || app;
    } while (current.parent.parent && (current = current.parent));

    this.app = app;

    const workspaceRoot = findWorkspaceRoot(this.app.project.root);
    const root = workspaceRoot || this.app.project.root;
    this._nodeModulesPath = path.join(root, 'node_modules');

    this.readConfig();
    this.includeIconPackages();

    this.setupPreprocessorRegistryAfterConfiguration('parent', originalApp.registry);

    app.import('vendor/fontawesome.js')
    Object.keys(this.fontawesomeConfig.icons).forEach(pack => {
      app.import(`vendor/${pack}.js`)
    })
    app.import('vendor/autoLibrary.js')
    app.import('vendor/configure-fontawesome-styles.js')

    config.autoAddCss = false;
    app.import('vendor/fontawesome.css');
  },

  /**
   * setupPreprocessorRegistry is called before included
   * see https://github.com/ember-cli/ember-cli/issues/3701
   * as a workaround we ignore that hook and call this method from included
   */
  setupPreprocessorRegistryAfterConfiguration(type, registry) {
    if (this.fontawesomeConfig.enableExperimentalBuildTimeTransform) {
      this.ui.writeWarnLine(`The "enableExperimentalBuildTimeTransform" option may be removed soon.
      Please see https://github.com/FortAwesome/ember-fontawesome/issues/117 for details and comments.
      `);
      registry.add('htmlbars-ast-plugin', {
        name: 'font-awesome-static-transform',
        plugin: buildAstTransform(this),
        baseDir() {
          return __dirname;
        },
      });
    }
  },

}

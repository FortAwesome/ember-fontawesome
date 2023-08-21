'use strict';

const getChannelURL = require('ember-source-channel-url');
const { embroiderSafe, embroiderOptimized } = require('@embroider/test-setup');

module.exports = async function () {
  return {
    useNpm: true,
    scenarios: [
      {
        name: 'ember-lts-3.20',
        npm: {
          devDependencies: {
            'ember-resolver': '^8.0.0',
            'ember-source': '~3.20.0',
            '@ember/test-helpers': '^2.9.3',
            "ember-page-title": "^7.0.0",
            'ember-qunit': '^6.2.0',
          },
        },
      },
      {
        name: 'ember-lts-3.24',
        npm: {
          devDependencies: {
            'ember-resolver': '^8.0.0',
            'ember-source': '~3.24.0',
            '@ember/test-helpers': '^2.9.3',
            "ember-page-title": "^7.0.0",
            'ember-qunit': '^6.2.0',
          },
        },
      },
      {
        name: 'ember-lts-3.28',
        npm: {
          devDependencies: {
            'ember-resolver': '^8.0.0',
            'ember-source': '~3.28.0',
            '@ember/test-helpers': '^2.9.3',
            "ember-page-title": "^7.0.0",
            'ember-qunit': '^6.2.0',
          },
        },
      },
      {
        name: 'ember-lts-4.4',
        npm: {
          devDependencies: {
            'ember-resolver': '^8.0.0',
            'ember-source': '~4.4.0',
          },
        },
      },
      {
        name: 'ember-lts-4.8',
        npm: {
          devDependencies: {
            'ember-source': '~4.8.0',
          },
        },
      },
      {
        name: 'ember-lts-4.12',
        npm: {
          devDependencies: {
            'ember-source': '~4.12.0',
          },
        },
      },
      {
        name: 'ember-lts-4.12-with-fa5',
        npm: {
          devDependencies: {
            'ember-source': '~4.12.0',
            '@fortawesome/free-brands-svg-icons': '^5.15.4',
            '@fortawesome/pro-light-svg-icons': '^5.15.4',
            '@fortawesome/pro-regular-svg-icons': '^5.15.4',
          },
        },
      },
      {
        name: 'ember-release',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('release'),
          },
        },
      },
      {
        name: 'ember-beta',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('beta'),
          },
        },
      },
      {
        name: 'ember-canary',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('canary'),
          },
        },
      },
      {
        name: 'ember-default-with-jquery',
        env: {
          EMBER_OPTIONAL_FEATURES: JSON.stringify({
            'jquery-integration': true,
          }),
        },
        npm: {
          devDependencies: {
            '@ember/jquery': '^1.1.0',
            'ember-resolver': '^8.0.0',
            'ember-source': '~3.28.0',
            '@ember/test-helpers': '^2.9.3',
            "ember-page-title": "^7.0.0",
            'ember-qunit': '^6.2.0',
          },
        },
      },
      {
        name: 'ember-classic',
        env: {
          EMBER_OPTIONAL_FEATURES: JSON.stringify({
            'application-template-wrapper': true,
            'default-async-observers': false,
            'template-only-glimmer-components': false,
          }),
        },
        npm: {
          devDependencies: {
            'ember-resolver': '^8.0.0',
            'ember-source': '~3.28.0',
            '@ember/test-helpers': '^2.9.3',
            "ember-page-title": "^7.0.0",
            'ember-qunit': '^6.2.0',
          },
          ember: {
            edition: 'classic',
          },
        },
      },
      embroiderSafe(),
      embroiderOptimized(),
    ],
  };
};

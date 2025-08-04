'use strict';

const getChannelURL = require('ember-source-channel-url');
const { embroiderSafe, embroiderOptimized } = require('@embroider/test-setup');

module.exports = async function () {
  return {
    usePnpm: true,
    scenarios: [
      {
        name: 'ember-lts-3.28',
        npm: {
          devDependencies: {
            '@ember/test-helpers': '^2.9.4',
            '@glimmer/component': '^1.1.2',
            'ember-cli': '~4.12.2',
            'ember-load-initializers': '^2.1.2',
            'ember-qunit': '^6.0.0',
            'ember-resolver': '^8.0.0',
            'ember-source': '~3.28.0',
          },
        },
      },
      {
        name: 'ember-lts-4.4',
        npm: {
          devDependencies: {
            '@glimmer/component': '^1.1.2',
            '@ember/test-helpers': '5.1.0',
            '@ember/test-waiters': '^3.1.0',
            'ember-load-initializers': '^2.1.2',
            'ember-resolver': '^8.0.0',
            'ember-source': '~4.4.0',
          },
        },
      },
      {
        name: 'ember-lts-4.8',
        npm: {
          devDependencies: {
            '@glimmer/component': '^1.1.2',
            'ember-load-initializers': '^2.1.2',
            'ember-resolver': '^11.0.0',
            'ember-source': '~4.8.0',
          },
        },
      },
      {
        name: 'ember-lts-4.12',
        npm: {
          devDependencies: {
            'ember-load-initializers': '^2.1.2',
            'ember-source': '~4.12.0',
          },
        },
      },
      {
        name: 'ember-lts-5.4',
        npm: {
          devDependencies: {
            'ember-source': '~5.4.0',
          },
        },
      },
      {
        name: 'ember-lts-5.8',
        npm: {
          devDependencies: {
            'ember-source': '~5.8.0',
          },
        },
      },
      {
        name: 'ember-lts-5.12',
        npm: {
          devDependencies: {
            'ember-source': '~5.12.0',
          },
        },
      },
      {
        name: 'ember-lts-6.4',
        npm: {
          devDependencies: {
            'ember-source': '~6.4.0',
          },
        },
      },
      {
        name: 'ember-lts-6.4-with-fa5',
        npm: {
          devDependencies: {
            'ember-source': '~6.4.0',
            '@fortawesome/fontawesome-svg-core': '^6.6.0',
            '@fortawesome/free-brands-svg-icons': '^5.15.4',
            '@fortawesome/free-regular-svg-icons': '^5.15.4',
            '@fortawesome/free-solid-svg-icons': '^5.15.4',
          },
        },
      },
      {
        name: 'ember-lts-6.4-with-fa6',
        npm: {
          devDependencies: {
            'ember-source': '~6.4.0',
            '@fortawesome/fontawesome-svg-core': '^6.6.0',
            '@fortawesome/free-brands-svg-icons': '^6.7.2',
            '@fortawesome/free-regular-svg-icons': '^6.7.2',
            '@fortawesome/free-solid-svg-icons': '^6.7.2',
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
      embroiderSafe(),
      embroiderOptimized(),
    ],
  };
};

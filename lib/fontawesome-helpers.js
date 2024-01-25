/* eslint-env node */
'use strict';

const {
  icon: faIcon,
  library,
  config,
} = require('@fortawesome/fontawesome-svg-core');

function addIcons(moduleName, prefix) {
  try {
    const pack = require(moduleName)[prefix];
    library.add(pack);
  } catch (e) {
    // if the icon pack doesn't exist just move on
    if (!(e instanceof Error) || e.code !== 'MODULE_NOT_FOUND') {
      throw e;
    }
  }
}

addIcons('@fortawesome/free-brands-svg-icons', 'fab');
addIcons('@fortawesome/free-solid-svg-icons', 'fas');
addIcons('@fortawesome/free-regular-svg-icons', 'far');
addIcons('@fortawesome/pro-solid-svg-icons', 'fas');
addIcons('@fortawesome/pro-regular-svg-icons', 'far');
addIcons('@fortawesome/pro-light-svg-icons', 'fal');
addIcons('@fortawesome/pro-thin-svg-icons', 'fat');
addIcons('@fortawesome/pro-duotone-svg-icons', 'fad');
addIcons('@fortawesoem/sharp-solid-svg-icons', 'fass');
addIcons('@fortawesoem/sharp-regular-svg-icons', 'fasr');
addIcons('@fortawesoem/sharp-light-svg-icons', 'fasl');
addIcons('@fortawesoem/sharp-thin-svg-icons', 'fast');

function getAbstractIcon(iconName, prefix) {
  const icon = faIcon({ prefix, iconName });
  if (icon) {
    return icon.abstract[0];
  }
  return null;
}

function getReplacementClass() {
  return config.replacementClass;
}

module.exports = {
  getAbstractIcon,
  getReplacementClass,
};

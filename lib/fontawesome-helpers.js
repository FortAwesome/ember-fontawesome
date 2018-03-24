/* eslint-env node */
"use strict";

const fontAwesome = require('@fortawesome/fontawesome');

function addIcons(moduleName, prefix) {
  try {
    const pack = require(moduleName)[prefix];
    fontAwesome.library.add(pack);
  }
  catch (e) {
    // if the icon pack doesn't exist just move on
    if (!(e instanceof Error) || e.code !== "MODULE_NOT_FOUND") {
      throw e;
    }
  }
}

addIcons('@fortawesome/fontawesome-free-brands', 'fab');
addIcons('@fortawesome/fontawesome-free-solid', 'fas');
addIcons('@fortawesome/fontawesome-free-regular', 'far');
addIcons('@fortawesome/fontawesome-pro-solid', 'fas');
addIcons('@fortawesome/fontawesome-pro-regular', 'far');
addIcons('@fortawesome/fontawesome-pro-light', 'fal');


function getAbstractIcon(iconName, prefix) {
  const icon = fontAwesome.icon({ prefix, iconName });
  if (icon) {
    return icon.abstract[0];
  }
  return null;
}

function getReplacementClass() {
  return fontAwesome.config.replacementClass;
}

module.exports = {
  getAbstractIcon,
  getReplacementClass
}

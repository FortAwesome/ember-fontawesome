/* eslint-env node */
"use strict";

const fontAwesome = require('@fortawesome/fontawesome');
const { faCoffee, faUser, faSpinner } = require('@fortawesome/fontawesome-free-solid');
fontAwesome.library.add(faCoffee, faUser, faSpinner);


function getAbstractIcon(iconName, prefix) {
  const icon = fontAwesome.icon({ prefix, iconName });
  if (icon) {
    return icon.abstract[0];
  }
  return null;
}

module.exports = {
  getAbstractIcon
}

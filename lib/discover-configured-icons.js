/* eslint-env node */

'use strict';

const fs = require('fs');
const path = require('path');
const unique = require('array-unique');

function discoverConfiguredIcons(project) {
  const projectIcons = path.join(project.root, 'config', 'icons.js');
  const icons = getIcons(project, projectIcons);

  return icons;
}

function processAddons(addons) {
  const allIcons = addons.filter(a => a.root).map(addon => {
    const iconPath = path.join(addon.root, 'config', 'icons.js');
    return getIcons(addon, iconPath);
  });

  return allIcons.reduce((accumulator, obj) => {
    return combineIconSets(accumulator, obj);
  }, {});
}

function getIcons(project, iconPath) {
  let addonIcons = processAddons(project.addons);
  let projectIcons = {};
  if (fs.existsSync(iconPath)) {
    projectIcons = require(iconPath)();
  }

  return combineIconSets(addonIcons, projectIcons);
}

function combineIconSets(set1, set2) {
  for (let key in set2) {
    if (!(key in set1)) {
      set1[key] = [];
    }
    //'all' value trumps any icons in an array
    if (set1[key] === 'all' || set2[key] === 'all') {
      set1[key] = 'all';
    } else {
      set1[key] = unique([...set1[key], ...set2[key]]);
    }
  }

  return set1;
}

module.exports = { discoverConfiguredIcons, combineIconSets };

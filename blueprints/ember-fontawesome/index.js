module.exports = {
  normalizeEntityName() {},

  afterInstall() {
    return this.addPackagesToProject([
      {name: '@fortawesome/fontawesome', target: '1.2.0-2'},
      'broccoli-rollup',
      'broccoli-stew',
      'broccoli-funnel',
      'broccoli-merge-trees',
      'broccoli-plugin'
    ]); // is a promise
  }
};

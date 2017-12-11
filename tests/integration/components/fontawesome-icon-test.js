import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('fontawesome-icon', 'Integration | Component | fontawesome icon', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{fontawesome-icon}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#fontawesome-icon}}
      template block text
    {{/fontawesome-icon}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

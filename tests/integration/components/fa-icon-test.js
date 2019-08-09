import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile'
import { htmlSafe } from '@ember/string';

const faCoffee = {
  prefix: 'fas',
  iconName: 'coffee',
  icon: [
    640,
    512,
    [],
    "f0f4",
    "M192 384h192c53 0 96-43 96-96h32c70.6 0 128-57.4 128-128S582.6 32 512 32H120c-13.3 0-24 10.7-24 24v232c0 53 43 96 96 96zM512 96c35.3 0 64 28.7 64 64s-28.7 64-64 64h-32V96h32zm47.7 384H48.3c-47.6 0-61-64-36-64h583.3c25 0 11.8 64-35.9 64z"
  ]
}

module('Integration | Component | fa icon', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders coffee', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('faCoffee', faCoffee)

    await render(hbs`<FaIcon @icon={{this.faCoffee}} />`)

    assert.dom('*').hasText('')
    assert.dom('svg').hasAttribute('data-icon', 'coffee')
    assert.ok(find('svg').getAttribute('class').split(/\s+/).includes('fa-coffee'))
    assert.dom('svg path').hasAttribute('d', faCoffee.icon[4])
  })

  test('it renders framework style', async function(assert) {
    this.set('faCoffee', faCoffee)
    await render(hbs`<FaIcon @icon={{this.faCoffee}} @transform="rotate-42" />`)
    assert.ok(find('svg').getAttribute('style').split(/:/).includes('transform-origin'))
  })

  test('it renders extra classes', async function(assert) {
    this.set('faCoffee', faCoffee)
    this.set('class', 'foo-xyz')
    await render(hbs`<FaIcon @icon={{this.faCoffee}} class={{this.class}} />`)
    assert.ok(find('svg').getAttribute('class').split(/\s+/).includes('foo-xyz'))
    this.set('class', 'foo-new-class')
    assert.notOk(find('svg').getAttribute('class').split(/\s+/).includes('foo-xyz'))
    assert.ok(find('svg').getAttribute('class').split(/\s+/).includes('foo-new-class'))
  })

  test('it renders coffee positional', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('faCoffee', faCoffee)

    await render(hbs`{{fa-icon faCoffee}}`)

    assert.dom('*').hasText('')
    assert.dom('svg').hasAttribute('data-icon', 'coffee')
    assert.ok(find('svg').getAttribute('class').split(/\s+/).includes('fa-coffee'))
    assert.dom('svg path').hasAttribute('d', faCoffee.icon[4])
  })

  test('it optionally renders fa-spin class', async function(assert) {
    assert.expect(2)
    this.set('faCoffee', faCoffee)
    this.set('isSpinning', false)

    await render(hbs`{{fa-icon icon=faCoffee spin=isSpinning}}`)

    assert.notOk(find('svg').getAttribute('class').split(/\s+/).includes('fa-spin'), 'Should not include fa-spin class')
    this.set('isSpinning', true)
    assert.ok(find('svg').getAttribute('class').split(/\s+/).includes('fa-spin'), 'Should include fa-spin class')
  })

  test('it binds title', async function(assert) {
    assert.expect(2);
    const title = 'awesome is as awesome does';
    this.set('title', title);
    this.set('faCoffee', faCoffee);

    await render(hbs`<FaIcon @icon={{this.faCoffee}} @title={{this.title}} />`);

    assert.dom('svg title').exists({ count: 1 }, 'has title element');
    assert.dom('svg title').hasText(title, 'title is correct');
  });

  test('no title attribute gives no title element', async function(assert) {
    assert.expect(1);
    this.set('faCoffee', faCoffee);

    await render(hbs`<FaIcon @icon={{this.faCoffee}} />`);

    assert.dom('svg title').doesNotExist('has not title element');
  });

  test('title from string like object', async function(assert) {
    assert.expect(2);
    const title = 'awesome is as awesome does';
    this.set('title', htmlSafe(title));
    this.set('faCoffee', faCoffee);

    await render(hbs`<FaIcon @icon={{this.faCoffee}} @title={{this.title}} />`);

    assert.dom('svg title').exists({ count: 1 }, 'has title element');
    assert.dom('svg title').hasText(title, 'title is correct');
  });

  test('it renders with the default focusable attribute as false', async function(assert) {
    assert.expect(1);
    this.set('faCoffee', faCoffee);

    await render(hbs`<FaIcon @icon={{this.faCoffee}} />`);

    assert.dom('svg').hasAttribute('focusable', 'false');
  });

  test('it should change the focusable attribute to true', async function(assert) {
    assert.expect(1);
    this.set('faCoffee', faCoffee);

    await render(hbs`<FaIcon @icon={{this.faCoffee}} @focusable={{'true'}} />`);

    assert.dom('svg').hasAttribute('focusable', 'true');
  });
});

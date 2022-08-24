import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { htmlSafe } from '@ember/template';

const faCoffee = {
  prefix: 'fas',
  iconName: 'coffee',
  icon: [
    640,
    512,
    [],
    'f0f4',
    'M192 384h192c53 0 96-43 96-96h32c70.6 0 128-57.4 128-128S582.6 32 512 32H120c-13.3 0-24 10.7-24 24v232c0 53 43 96 96 96zM512 96c35.3 0 64 28.7 64 64s-28.7 64-64 64h-32V96h32zm47.7 384H48.3c-47.6 0-61-64-36-64h583.3c25 0 11.8 64-35.9 64z',
  ],
};

module('Integration | Component | fa icon', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders coffee', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('faCoffee', faCoffee);

    await render(hbs`<FaIcon @icon={{this.faCoffee}} />`);

    assert.dom('*').hasText('');
    assert.dom('svg').hasAttribute('data-icon', 'coffee');
    assert.ok(
      find('svg').getAttribute('class').split(/\s+/).includes('fa-coffee')
    );
    assert.dom('svg path').hasAttribute('d', faCoffee.icon[4]);
  });

  test('it renders framework style', async function (assert) {
    this.set('faCoffee', faCoffee);
    await render(
      hbs`<FaIcon @icon={{this.faCoffee}} @transform="rotate-42" />`
    );
    assert.ok(
      find('svg').getAttribute('style').split(/:/).includes('transform-origin')
    );
  });

  test('it renders extra classes', async function (assert) {
    this.set('faCoffee', faCoffee);
    this.set('class', 'foo-xyz');
    await render(hbs`<FaIcon @icon={{this.faCoffee}} class={{this.class}} />`);
    assert.dom('svg').hasClass('foo-xyz');
    this.set('class', 'foo-new-class');
    assert.dom('svg').doesNotHaveClass('foo-xyz');
    assert.dom('svg').hasClass('foo-new-class');
  });

  test('it does not render "undefined" classes', async function (assert) {
    this.set('faCoffee', faCoffee);
    await render(hbs`<FaIcon @icon={{this.faCoffee}} class='test' />`);
    assert.dom('svg').hasClass('test');
    const list = find('svg').getAttribute('class').split(' ');
    const instances = list.filter((val) => val === 'undefined');
    assert.equal(instances.length, 0);
  });

  test('it optionally renders fa-spin class', async function (assert) {
    assert.expect(2);
    this.set('faCoffee', faCoffee);
    this.set('isSpinning', false);

    await render(
      hbs`<FaIcon @icon={{this.faCoffee}} @spin={{this.isSpinning}} />`
    );

    assert.notOk(
      find('svg').getAttribute('class').split(/\s+/).includes('fa-spin'),
      'Should not include fa-spin class'
    );
    this.set('isSpinning', true);
    assert.ok(
      find('svg').getAttribute('class').split(/\s+/).includes('fa-spin'),
      'Should include fa-spin class'
    );
  });

  test('it binds title', async function (assert) {
    assert.expect(2);
    const title = 'awesome is as awesome does';
    this.set('title', title);
    this.set('faCoffee', faCoffee);

    await render(hbs`<FaIcon @icon={{this.faCoffee}} @title={{this.title}} />`);

    assert.dom('svg title').exists({ count: 1 }, 'has title element');
    assert.dom('svg title').hasText(title, 'title is correct');
  });

  test('no title attribute gives no title element', async function (assert) {
    assert.expect(1);
    this.set('faCoffee', faCoffee);

    await render(hbs`<FaIcon @icon={{this.faCoffee}} />`);

    assert.dom('svg title').doesNotExist('has not title element');
  });

  test('title from string like object', async function (assert) {
    assert.expect(2);
    const title = 'awesome is as awesome does';
    this.set('title', htmlSafe(title));
    this.set('faCoffee', faCoffee);

    await render(hbs`<FaIcon @icon={{this.faCoffee}} @title={{this.title}} />`);

    assert.dom('svg title').exists({ count: 1 }, 'has title element');
    assert.dom('svg title').hasText(title, 'title is correct');
  });

  test('it renders with the default focusable attribute as false', async function (assert) {
    assert.expect(1);
    this.set('faCoffee', faCoffee);

    await render(hbs`<FaIcon @icon={{this.faCoffee}} />`);

    assert.dom('svg').hasAttribute('focusable', 'false');
  });

  test('it should change the focusable attribute to true', async function (assert) {
    assert.expect(1);
    this.set('faCoffee', faCoffee);

    await render(hbs`<FaIcon @icon={{this.faCoffee}} focusable={{'true'}} />`);

    assert.dom('svg').hasAttribute('focusable', 'true');
  });

  test('it defaults to ariaHidden', async function (assert) {
    this.set('faCoffee', faCoffee);
    await render(hbs`<FaIcon @icon={{this.faCoffee}} />`);
    assert.dom('svg').hasAttribute('aria-hidden', 'true');
  });

  test('it binds ariaHidden', async function (assert) {
    this.set('faCoffee', faCoffee);
    this.set('ariaHidden', 'true');
    await render(
      hbs`<FaIcon @icon={{this.faCoffee}} aria-hidden={{this.ariaHidden}} />`
    );
    assert.dom('svg').hasAttribute('aria-hidden', 'true');
    this.set('ariaHidden', 'false');
    assert.dom('svg').hasAttribute('aria-hidden', 'false');
    this.set('ariaHidden', false);
    assert.dom('svg').doesNotHaveAttribute('aria-hidden');
  });

  test('role defaults to img', async function (assert) {
    this.set('faCoffee', faCoffee);
    await render(hbs`<FaIcon @icon={{this.faCoffee}} />`);
    assert.dom('svg').hasAttribute('role', 'img');
  });

  test('it binds role', async function (assert) {
    this.set('faCoffee', faCoffee);
    this.set('role', 'img');
    await render(hbs`<FaIcon @icon={{this.faCoffee}} role={{this.role}} />`);
    assert.dom('svg').hasAttribute('role', 'img');
    this.set('role', 'presentation');
    assert.dom('svg').hasAttribute('role', 'presentation');
    this.set('role', false);
    assert.dom('svg').doesNotHaveAttribute('role');
  });

  test('it binds attributes', async function (assert) {
    assert.expect(8);
    this.set('height', '5px');
    this.set('width', '6px');
    this.set('x', '19');
    this.set('y', '81');
    this.set('faCoffee', faCoffee);

    await render(hbs`<FaIcon
      @icon={{this.faCoffee}}
      height={{this.height}}
      width={{this.width}}
      x={{this.x}}
      y={{this.y}}
    />`);

    assert.dom('svg').hasAttribute('height', '5px');
    assert.dom('svg').hasAttribute('width', '6px');
    assert.dom('svg').hasAttribute('x', '19');
    assert.dom('svg').hasAttribute('y', '81');
    this.set('height', '10rem');
    this.set('width', '10rem');
    this.set('x', '2');
    this.set('y', '2');
    assert.dom('svg').hasAttribute('height', '10rem');
    assert.dom('svg').hasAttribute('width', '10rem');
    assert.dom('svg').hasAttribute('x', '2');
    assert.dom('svg').hasAttribute('y', '2');
  });

  test('it renders no surrounding whitespace', async function (assert) {
    this.set('faCoffee', faCoffee);
    await render(hbs`<FaIcon @icon={{this.faCoffee}} />`);
    assert.ok(this.element.innerHTML.startsWith('<svg '));
    assert.ok(this.element.innerHTML.endsWith('</svg>'));
  });

  test('it renders trash-alt (alias) ', async function (assert) {
    await render(hbs`<FaIcon @icon="trash-alt" />`);

    assert.dom('*').hasText('');
    assert.dom('svg').hasAttribute('data-icon', 'trash-can');
    assert.ok(
      find('svg').getAttribute('class').split(/\s+/).includes('fa-trash-can')
    );
    assert
      .dom('svg path')
      .hasAttribute(
        'd',
        'M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z'
      );
  });
});

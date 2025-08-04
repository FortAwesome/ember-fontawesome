import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { htmlSafe } from '@ember/template';
import { gte } from 'ember-compatibility-helpers';

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
      find('svg').getAttribute('class').split(/\s+/).includes('fa-coffee'),
    );
    assert.dom('svg path').hasAttribute('d', faCoffee.icon[4]);
  });

  test('it renders calendar with regular style (prefix test)', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    // Fa 7
    let path =
      'M120 0c13.3 0 24 10.7 24 24l0 40 160 0 0-40c0-13.3 10.7-24 24-24s24 10.7 24 24l0 40 32 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 128C0 92.7 28.7 64 64 64l32 0 0-40c0-13.3 10.7-24 24-24zm0 112l-56 0c-8.8 0-16 7.2-16 16l0 48 352 0 0-48c0-8.8-7.2-16-16-16l-264 0zM48 224l0 192c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-192-352 0z';

    // Fa 6
    if (!gte('@fortawesome/free-regular-svg-icons', '7.0.0')) {
      path =
        'M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l352 0 0 256c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256z';
    }

    // Fa 5
    if (!gte('@fortawesome/free-regular-svg-icons', '6.0.0')) {
      path =
        'M400 64h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zm-6 400H54c-3.3 0-6-2.7-6-6V160h352v298c0 3.3-2.7 6-6 6z';
    }

    await render(hbs`<FaIcon @icon="calendar" @prefix="far" />`);

    assert.dom('*').hasText('');
    assert.dom('svg').hasAttribute('data-icon', 'calendar');
    assert.ok(
      find('svg').getAttribute('class').split(/\s+/).includes('fa-calendar'),
    );
    assert.dom('svg path').hasAttribute('d', path);
  });

  test('it renders framework style', async function (assert) {
    this.set('faCoffee', faCoffee);
    await render(
      hbs`<FaIcon @icon={{this.faCoffee}} @transform="rotate-42" />`,
    );
    assert.ok(
      find('svg').getAttribute('style').split(/:/).includes('transform-origin'),
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
    assert.strictEqual(instances.length, 0);
  });

  test('it optionally renders fa-spin class', async function (assert) {
    this.set('faCoffee', faCoffee);
    this.set('isSpinning', false);

    await render(
      hbs`<FaIcon @icon={{this.faCoffee}} @spin={{this.isSpinning}} />`,
    );

    assert.notOk(
      find('svg').getAttribute('class').split(/\s+/).includes('fa-spin'),
      'Should not include fa-spin class',
    );
    this.set('isSpinning', true);
    assert.ok(
      find('svg').getAttribute('class').split(/\s+/).includes('fa-spin'),
      'Should include fa-spin class',
    );
  });

  test('it binds title', async function (assert) {
    const title = 'awesome is as awesome does';
    this.set('title', title);
    this.set('faCoffee', faCoffee);

    await render(hbs`<FaIcon @icon={{this.faCoffee}} @title={{this.title}} />`);

    assert.dom('svg title').exists({ count: 1 }, 'has title element');
    assert.dom('svg title').hasText(title, 'title is correct');
  });

  test('no title attribute gives no title element', async function (assert) {
    this.set('faCoffee', faCoffee);

    await render(hbs`<FaIcon @icon={{this.faCoffee}} />`);

    assert.dom('svg title').doesNotExist('has not title element');
  });

  test('title from string like object', async function (assert) {
    const title = 'awesome is as awesome does';
    this.set('title', htmlSafe(title));
    this.set('faCoffee', faCoffee);

    await render(hbs`<FaIcon @icon={{this.faCoffee}} @title={{this.title}} />`);

    assert.dom('svg title').exists({ count: 1 }, 'has title element');
    assert.dom('svg title').hasText(title, 'title is correct');
  });

  test('it renders with the default focusable attribute as false', async function (assert) {
    this.set('faCoffee', faCoffee);

    await render(hbs`<FaIcon @icon={{this.faCoffee}} />`);

    assert.dom('svg').hasAttribute('focusable', 'false');
  });

  test('it should change the focusable attribute to true', async function (assert) {
    this.set('faCoffee', faCoffee);

    await render(hbs`<FaIcon @icon={{this.faCoffee}} focusable="true" />`);

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
      hbs`<FaIcon @icon={{this.faCoffee}} aria-hidden={{this.ariaHidden}} />`,
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

    let icon = 'trash-can';

    // Fa 7
    let path =
      'M136.7 5.9C141.1-7.2 153.3-16 167.1-16l113.9 0c13.8 0 26 8.8 30.4 21.9L320 32 416 32c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 8.7-26.1zM32 144l384 0 0 304c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-304zm88 64c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24z';

    // Fa 6
    if (!gte('@fortawesome/free-brands-svg-icons', '7.0.0')) {
      icon = 'trash-alt';
      path =
        'M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z';
    }

    // Fa 5
    if (!gte('@fortawesome/free-brands-svg-icons', '6.0.0')) {
      icon = 'trash-alt';
      path =
        'M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z';
    }

    assert.dom('*').hasText('');
    assert.dom('svg').hasAttribute('data-icon', icon);
    assert.ok(
      find('svg').getAttribute('class').split(/\s+/).includes(`fa-${icon}`),
    );
    assert.dom('svg path').hasAttribute('d', path);
  });
});

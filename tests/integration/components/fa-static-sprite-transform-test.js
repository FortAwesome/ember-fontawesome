import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Transform | <FaStaticSprite>', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders solid coffee', async function (assert) {
    await render(hbs`<FaStaticSprite
      @icon="coffee"
      @prefix="fas"
    />`);

    assert.dom('svg').hasAttribute('role', 'img');
    assert.dom('svg').hasAttribute('focusable', 'false');
    assert.dom('svg').hasAttribute('aria-hidden', 'true');
    assert.dom('svg').hasClass('svg-inline--fa');
    assert.dom('svg').hasClass('fa-coffee');
    assert.dom('svg').hasClass('fa-w-20');
    assert.dom('svg use').exists();
    assert.dom('svg use').hasAttribute('xlink:href', 'assets/fa-sprites/solid.svg#coffee');
  });
  test('it renders solid coffee as the default prefix', async function (assert) {
    await render(hbs`<FaStaticSprite
      @icon="coffee"
    />`);

    assert.dom('svg').hasAttribute('role', 'img');
    assert.dom('svg').hasAttribute('focusable', 'false');
    assert.dom('svg').hasAttribute('aria-hidden', 'true');
    assert.dom('svg').hasClass('svg-inline--fa');
    assert.dom('svg').hasClass('fa-coffee');
    assert.dom('svg').hasClass('fa-w-20');
    assert.dom('svg use').exists();
    assert.dom('svg use').hasAttribute('xlink:href', 'assets/fa-sprites/solid.svg#coffee');
  });
  test('it renders solid atom', async function (assert) {
    await render(hbs`<FaStaticSprite
      @icon="atom"
      @prefix="fas"
    />`);

    assert.dom('svg').hasAttribute('role', 'img');
    assert.dom('svg').hasAttribute('focusable', 'false');
    assert.dom('svg').hasAttribute('aria-hidden', 'true');
    assert.dom('svg').hasClass('svg-inline--fa');
    assert.dom('svg').hasClass('fa-atom');
    assert.dom('svg').hasClass('fa-w-14');
    assert.dom('svg use').exists();
    assert.dom('svg use').hasAttribute('xlink:href', 'assets/fa-sprites/solid.svg#atom');
  });
  test('it renders brand fort-awesome', async function (assert) {
    await render(hbs`<FaStaticSprite
      @icon="fort-awesome"
      @prefix="fab"
    />`);

    assert.dom('svg').hasAttribute('role', 'img');
    assert.dom('svg').hasAttribute('focusable', 'false');
    assert.dom('svg').hasAttribute('aria-hidden', 'true');
    assert.dom('svg').hasClass('svg-inline--fa');
    assert.dom('svg').hasClass('fa-fort-awesome');
    assert.dom('svg').hasClass('fa-w-16');
    assert.dom('svg use').exists();
    assert.dom('svg use').hasAttribute('xlink:href', 'assets/fa-sprites/brands.svg#fort-awesome');
  });
  test('it renders with a title', async function (assert) {
    await render(hbs`<FaStaticSprite
      @icon="coffee"
      @prefix="fas"
      @title="some title"
    />`);

    assert.dom('svg').hasAttribute('role', 'img');
    assert.dom('svg').hasAttribute('focusable', 'true');
    assert.dom('svg').hasAttribute('aria-hidden', 'false');
    assert.dom('svg').hasClass('svg-inline--fa');
    assert.dom('svg').hasClass('fa-coffee');
    assert.dom('svg').hasClass('fa-w-20');
    assert.dom('svg use').exists();
    assert.dom('svg use').hasAttribute('xlink:href', 'assets/fa-sprites/solid.svg#coffee');
    assert.dom('svg title').exists();
    assert.dom('svg title').hasText('some title');
  });
  test('it renders with custom classes', async function (assert) {
    await render(hbs`<FaStaticSprite
      @icon="coffee"
      @prefix="fas"
      class="foo bar foo-bar-baz"
    />`);

    assert.dom('svg').hasAttribute('role', 'img');
    assert.dom('svg').hasAttribute('focusable', 'false');
    assert.dom('svg').hasAttribute('aria-hidden', 'true');
    assert.dom('svg').hasClass('svg-inline--fa');
    assert.dom('svg').hasClass('fa-coffee');
    assert.dom('svg').hasClass('fa-w-20');
    assert.dom('svg').hasClass('foo');
    assert.dom('svg').hasClass('bar');
    assert.dom('svg').hasClass('foo-bar-baz');
    assert.dom('svg use').exists();
    assert.dom('svg use').hasAttribute('xlink:href', 'assets/fa-sprites/solid.svg#coffee');
  });
  test('passed attributes override defaults', async function (assert) {
    await render(hbs`<FaStaticSprite
      @icon="coffee"
      @prefix="fas"
      role="button"
      focusable="true"
      aria-hidden="false"
    />`);

    assert.dom('svg').hasAttribute('role', 'button');
    assert.dom('svg').hasAttribute('focusable', 'true');
    assert.dom('svg').hasAttribute('aria-hidden', 'false');
    assert.dom('svg').hasClass('svg-inline--fa');
    assert.dom('svg').hasClass('fa-coffee');
    assert.dom('svg').hasClass('fa-w-20');
    assert.dom('svg use').exists();
    assert.dom('svg use').hasAttribute('xlink:href', 'assets/fa-sprites/solid.svg#coffee');
  });
});

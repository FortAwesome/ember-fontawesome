import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | styles', function (hooks) {
  setupApplicationTest(hooks);

  test('fontawesome styles are not injected into the document', async function (assert) {
    await visit('/');
    assert.strictEqual(currentURL(), '/');
    const styleTags = document.getElementsByTagName('style');
    const faStyles = Array.from(styleTags).filter((el) =>
      el.textContent.includes('.fa'),
    );
    assert.strictEqual(faStyles.length, 0);
  });
});

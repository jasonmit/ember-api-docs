import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { setupQunit as setupPolly } from '@pollyjs/core';
import { visit, click } from '@ember/test-helpers';

module('Acceptance | Class with Polly (Advanced)', function(hooks) {
  setupApplicationTest(hooks);
  setupPolly(hooks);

  hooks.beforeEach(async function() {
    const { server } = this.polly;

    server
      .get('https://ember-api-docs.global.ssl.fastly.net/json-docs/ember/3.0.0/*path')
      .on('beforeResponse', (req, res) => {
        if (req.action === 'record') {
          const body = JSON.parse(res.body);

          body.data.attributes.methods = [];
          res.json(body);
        }
      });

    await visit('/ember/1.0/classes/Container');
    await click('[data-test-checkbox="inherited"]');
    await click('[data-test-checkbox="protected"]');
    await click('[data-test-checkbox="private"]');
    await click('[data-test-checkbox="deprecated"]');
  });

  test('displays empty placeholder text', function(assert) {
    assert.dom('.empty-Methods').exists();
    assert.dom('.empty-Methods').hasText('No documented items');
  });
});

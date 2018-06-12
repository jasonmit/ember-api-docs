import { module, test } from 'qunit';
import { visit, waitUntil } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupQunit as setupPolly } from '@pollyjs/core';

module('Acceptance | Class | Loading Substate', function(hooks) {
  setupApplicationTest(hooks);
  setupPolly(hooks);

  hooks.beforeEach(function() {
    const { server } = this.polly;

    server
      .get(
        'https://ember-api-docs.global.ssl.fastly.net/json-docs/ember/1.0.0/*path'
      )
      .on('beforeResponse', (req, res) => server.timeout(2000));
  });

  test('loads the loading substate', async function(assert) {
    const promise = visit('/ember/1.0/classes/Container');
    await waitUntil(() => document.querySelector('.loading-spinner'))
    assert.dom('.loading-spinner').exists();

    await promise;
  });
});

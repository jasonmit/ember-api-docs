import { module, test } from 'qunit';
import { visit, waitFor } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupQunit as setupPolly } from '@pollyjs/core';

module('Acceptance | Class | Loading Substate', function(hooks) {
  setupPolly(hooks);
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    const { server } = this.polly;

    server
      .get(
        'https://ember-api-docs.global.ssl.fastly.net/json-docs/ember/1.0.0/*path'
      )
      .on('beforeResponse', (req, res) => server.timeout(3000));
  });

  test('loads the loading substate', async function(assert) {
    const promise = visit('/ember/1.0/classes/Container');
    await waitFor('.loading-spinner');
    assert.dom('.loading-spinner').exists();

    await promise;
  });
});

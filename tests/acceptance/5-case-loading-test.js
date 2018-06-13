import { module, test } from 'qunit';
import { visit, waitFor } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupQunit as setupPolly } from '@pollyjs/core';

module('Acceptance | Class | Loading Substate', function(hooks) {
  setupApplicationTest(hooks);
  setupPolly(hooks);

  test('loads the loading substate', async function(assert) {
    assert.expect(1);

    const { server } = this.polly;

    server
      .get(
        'https://ember-api-docs.global.ssl.fastly.net/json-docs/ember/3.0.0/*path'
      )
      .on('beforeResponse', async (req, res) => {
        await server.timeout(100);
        await waitFor('.loading-spinner');
        assert.dom('.loading-spinner').exists();
      });

    await visit('/ember/3.0/classes/Container');
  });
});

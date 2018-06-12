import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupQunit as setupPolly } from '@pollyjs/core';

module('Acceptance | Class | Loading Substate', function(hooks) {
  setupApplicationTest(hooks);
  setupPolly(hooks);

  hooks.beforeEach(async function() {
    const { server } = this.polly;

    server
      .get('https://ember-api-docs.global.ssl.fastly.net/json-docs/ember/1.0.0/*path')
      .on('beforeRequest', (req, res) => server.timeout(2000));

    /* NOTE: do not await here */
    visit('/ember/1.0/classes/Container');
  });

  test('loads the loading substate', function(assert) {
    assert.dom('.loading-spinner').exists();
  });
});

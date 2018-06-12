import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { setupQunit as setupPolly } from '@pollyjs/core';
import { visit, currentURL } from '@ember/test-helpers';

module('Acceptance | Class | Error Substate', function(hooks) {
  setupPolly(hooks);
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    const { server } = this.polly;

    server
      .get('https://ember-api-docs.global.ssl.fastly.net/json-docs/ember/1.0.0/*path')
      .intercept((req, res) => res.sendStatus(404));

    await visit('/ember/1.0/classes/Container');
  });

  test('loads the error substate', function(assert) {
    assert.equal(currentURL(), '/404');
    assert.dom('.whoops__title').exists();
    assert.dom('.whoops__title').hasText(`Ack! 404 friend, you're in the wrong place`);
  });
});

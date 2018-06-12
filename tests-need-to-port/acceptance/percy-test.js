import { test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { percySnapshot } from 'ember-percy';
import moduleForAcceptance from 'ember-api-docs/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | percy');

test('Percy snapshot tests', async function(assert) {
  await visit('/');
  percySnapshot('Landing page');
  assert.ok(true);
});

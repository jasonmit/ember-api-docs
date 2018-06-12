import { module, skip } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | Application Layout', function(hooks) {
  setupApplicationTest(hooks);

  skip('lists the project versions in a select box', async function(assert) {
    await visit('/ember/1.0/classes/Ember.Component');
    /* selectSearch test helper is not registering for some reason */
    await selectSearch('.select-container', '2');

    assert.dom('.ember-power-select-options').exists({ count: 1 });
    assert.ok(find('.ember-power-select-options')[0].children.length > 1);
  });
});

import { moduleForModel, test } from 'ember-qunit';
moduleForModel('sticker', 'Unit | Model | sticker', {
  needs: []
});

test('it exists', function (assert) {
  var model;
  model = this.subject();
  return assert.ok(!!model);
});
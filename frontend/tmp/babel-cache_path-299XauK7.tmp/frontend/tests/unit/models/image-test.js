import { moduleForModel, test } from 'ember-qunit';
moduleForModel('image', 'Unit | Model | image', {
  needs: []
});

test('it exists', function (assert) {
  var model;
  model = this.subject();
  return assert.ok(!!model);
});
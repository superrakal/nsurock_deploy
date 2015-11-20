`import { moduleForModel, test } from 'ember-qunit'`

moduleForModel 'drink-preorder', 'Unit | Serializer | drink preorder',
  # Specify the other units that are required for this test.
  needs: ['serializer:drink-preorder']

# Replace this with your real tests.
test 'it serializes records', (assert) ->
  record = @subject()

  serializedRecord = record.serialize()

  assert.ok serializedRecord

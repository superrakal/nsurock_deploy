`import DS from 'ember-data'`

PreorderSerializer = DS.ActiveModelSerializer.extend DS.EmbeddedRecordsMixin,
  attrs:
    drink_preorders: {serialize: 'ids'}
    food_preorders: {serialize: 'ids'}

`export default PreorderSerializer`

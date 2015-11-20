`import DS from 'ember-data'`

DrinkPreorderSerializer = DS.ActiveModelSerializer.extend DS.EmbeddedRecordsMixin,
  attrs:
    syurups: {serialize: 'ids'}

`export default DrinkPreorderSerializer`

`import DS from 'ember-data'`

Food = DS.Model.extend
  price:       DS.attr 'number'
  name:        DS.attr 'string'
  image:       DS.attr 'string'
  is_available_adds: DS.attr 'boolean'

`export default Food`

`import DS from 'ember-data'`

Food = DS.Model.extend
  price:       DS.attr 'number'
  name:        DS.attr 'string'
  image:       DS.attr 'string'

`export default Food`

`import DS from 'ember-data'`

Sauce = DS.Model.extend
  name:          DS.attr 'string'
  image:         DS.attr 'string'
  is_available:  DS.attr 'boolean'

`export default Sauce`

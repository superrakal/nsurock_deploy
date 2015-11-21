`import DS from 'ember-data'`

Preorder = DS.Model.extend

  status:          DS.attr 'string', defaultValue: 'Создан'
  number:          DS.attr 'number'
  total_price:     DS.attr 'number'
  comments:        DS.attr 'string'
  drink_preorders: DS.hasMany 'drink-preorder', async: true
  food_preorders:  DS.hasMany 'food-preorder', async: true

  new_preorder_message:        DS.attr 'string'

`export default Preorder`

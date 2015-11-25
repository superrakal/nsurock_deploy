`import DS from 'ember-data'`

FoodPreorder = DS.Model.extend

  food:        DS.belongsTo 'food'
  sauce:       DS.belongsTo 'sauce'
  bread_type:  DS.attr 'string', defaultValue: 'Белый'

`export default FoodPreorder`

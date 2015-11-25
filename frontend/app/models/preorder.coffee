`import DS from 'ember-data'`

Preorder = DS.Model.extend

  status:          DS.attr 'string', defaultValue: 'Создан'
  number:          DS.attr 'number'
  total_price:     DS.attr 'number'
  comments:        DS.attr 'string'
  drink_preorders: DS.hasMany 'drink-preorder', async: true
  food_preorders:  DS.hasMany 'food-preorder', async: true
  created_at:      DS.attr 'date'
  user:            DS.belongsTo 'user', async: true
  discount_count:  DS.attr 'number'

  formatted_created_at: (->
    date = @get 'created_at'
    format = "Do MMMM YYYY, h:mm:ss"
    moment(date).locale('ru').format format
  ).property('created_at')

`export default Preorder`

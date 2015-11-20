`import DS from 'ember-data'`

DrinkPreorder = DS.Model.extend
  drink:        DS.belongsTo 'drink'
  syurups:      DS.hasMany 'syurup'

  sumPrice: (->
    sum = @get('drink.price')
    if @get('syurups').length > 1
      sum = sum + 20
    sum
  ).property('syurups.content.length', 'drink')

`export default DrinkPreorder`
